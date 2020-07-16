import React from "react";
import Link from "next/link";
import {Navbar, Nav} from "react-bootstrap";
import {signOutUser} from "../../lib/auth";
import NProgress from "nprogress";
import Router, {useRouter} from 'next/router'
import Head from "next/head";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Header = ({user}) => {
    const router = useRouter();
    return (
        <div>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                    crossOrigin="anonymous"
                />
                <title>
                    Profile Page
                </title>
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
                        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
                        crossOrigin="anonymous" />
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
    crossOrigin="anonymous"/>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
    integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
    crossOrigin="anonymous"/>
            </Head>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Facebook</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <li className={'nav-item'}>
                            <Link href={'/'}><a className={'nav-link'}>Home</a></Link>
                        </li>
                    </Nav>
                    {user._id ? (
                        <ul className={"navbar-nav my-2 my-lg-0"}>
                            <li className={'nav-item'}>
                                <Link href={'/post/create'}><a className={'nav-link'}>Create</a></Link>
                            </li>

                            <li className={'nav-item dropdown'}>
                                <a href={"#"}
                                   id={"navbarDropdown"}
                                   data-toggle="dropdown"
                                   aria-haspopup="true"
                                   aria-expanded="false"
                                   role={"button"}
                                   className={'nav-link dropdown-toggle text-capitalize'}>
                                    {user.name}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link href={'/profile'}><a className={'dropdown-item'}>Profile</a></Link>
                                    <a className="dropdown-item" onClick={signOutUser} href="#">Logout</a>
                                </div>
                            </li>
                        </ul>
                    ) : (
                        <ul className={"navbar-nav my-2 my-lg-0"}>
                            <li className={'nav-item'}>
                                <Link href={'/register'}><a className={'nav-link'}>Register</a></Link>
                            </li>
                            <li className={'nav-item'}>
                                <Link href={'/login'}><a className={'nav-link'}>Login</a></Link>
                            </li>
                        </ul>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
};

export default Header;