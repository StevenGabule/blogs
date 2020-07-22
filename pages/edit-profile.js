import React, {useState} from "react";
import {authInitialProps} from "../lib/auth";
import {getAuthUser, updateUser} from "../lib/api";
import Head from "next/head";
import Router from "next/router";

const INITIAL_VALUE = {
    _id: "",
    name: "",
    email: "",
    about: "",
    avatar: "",
    avatarPreview: "",
    isLoading: true,
    openSuccess: false,
    openError: false,
    error: "",
    updatedUser: null,
    isSaving: false,
};

function EditProfile({auth}) {
    const [user, setUser] = useState(INITIAL_VALUE);

    React.useEffect(() => {
        getAuthUser(auth.user._id).then((user) => {
            setUser(user);
        });
    }, []);

    const createPreviewImage = file => URL.createObjectURL(file);

    function handleChange(e) {
        const {name, value} = e.target;
        if (name === "avatar") {
            let inputValue = e.target.files[0];
            setUser(prevState => ({...prevState, avatarPreview: createPreviewImage(inputValue)}))
        }
        setUser(prevState => ({...prevState, [name]: value}))
    }

    function handleSubmit(e) {
        e.preventDefault();
        setUser(prevState => ({...prevState, isSaving: true}));
        const formData = new FormData();
        formData.append("avatar", user.avatarPreview || user.avatar);
        formData.append("email", user.email);
        formData.append("name", user.name);
        formData.append("about", user.about);
        updateUser(user._id, formData).then(updatedUser => {
            console.log(updatedUser);
            setUser(prevState => ({...prevState, isSaving: false, openSuccess: true}));
            setTimeout(() => Router.push(`/profile/${user._id}`), 6000);
        }).catch(showError)
    }

    function showError(err) {
        const error = (err.response && err.response.data) || err.message;
        setUser(prevState => ({...prevState, error, openError: true, isSaving: false}))
    }

    return (
        <div>
            <Head>
                <title>EditProfile</title>
            </Head>
            <div>
                <h4 className={"text-white mt-4"}>Edit Profile</h4>
                <div className="card mb-3">
                    <img
                        src={user.avatarPreview || user.avatar}
                        className="card-img-top"
                        style={{width: 200, height: 200}}
                        alt="..."
                    />
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="file"
                                name="avatar"
                                id="avatar"
                                accept="image/*"
                                onChange={handleChange}
                            />
                            <div className="form-group">
                                <label htmlFor="inputName">Name</label>
                                <input
                                    type="text"
                                    name={'name'}
                                    value={user.name}
                                    className="form-control"
                                    id="inputName"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputAbout">About</label>
                                <textarea
                                    name={'about'}
                                    className="form-control"
                                    id="inputAbout"
                                    value={user.about}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputEmail">Email address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    id="inputEmail"
                                    onChange={handleChange}
                                    value={user.email}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                {user.isSaving ? 'Please wait..' : 'Submit'}
                            </button>
                        </form>
                        {user.openSuccess && (
                            <div className="alert alert-success mt-3" role="alert">
                                You successfully updated your profile.
                            </div>
                        )}
                        {user.error && (
                            <div className="alert alert-danger">
                                {user.error}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

EditProfile.getInitialProps = authInitialProps(true);
export default EditProfile;
