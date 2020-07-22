import React from "react";
import Link from "next/link";
import {Navbar, Nav} from "react-bootstrap";
import {signOutUser} from "../../lib/auth";
import NProgress from "nprogress";
import Router from 'next/router'
import Head from "next/head";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Header = ({user}) => {
    return (
        <div>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                    crossOrigin="anonymous"
                />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
                      integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
                      crossOrigin="anonymous"/>
               
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
                        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
                        crossOrigin="anonymous"/>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
                        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
                        crossOrigin="anonymous"/>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
                        integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
                        crossOrigin="anonymous"/>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/js/all.min.js"
                        integrity="sha512-YSdqvJoZr83hj76AIVdOcvLWYMWzy6sJyIMic2aQz5kh2bPTd9dzY3NtdeEAzPp/PhgZqr4aJObB3ym/vsItMg=="
                        crossOrigin="anonymous"/>
            </Head>
            <Navbar className={'bg-custom'} expand="lg">
                <Navbar.Brand href="/" className="text-white">Facebook</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <li className={'nav-item'}>
                            <Link href={'/'}><a className={'nav-link text-white'}>Home</a></Link>
                        </li>
                    </Nav>
                    {user._id ? (
                        <ul className={"navbar-nav my-2 my-lg-0"}>
                            <li className={'nav-item dropdown'}>
                                <a href={"#"}
                                   id={"navbarDropdown"}
                                   data-toggle="dropdown"
                                   aria-haspopup="true"
                                   aria-expanded="false"
                                   role={"button"}
                                   className={'nav-link dropdown-toggle text-capitalize'}>
                                    <img
                                        src={user.avatar}
                                        style={{
                                            height: '30px',
                                            width: '30px',
                                            marginRight: '10px',
                                            borderRadius: '25px'
                                        }} alt=""/>
                                    <span style={{
                                            fontSize: '13px', 
                                            fontWeight: 'bold',
                                            color: 'white'
                                        }}>{user.name}</span>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link href={`/profile/${user._id}`}>
                                        <a className={'dropdown-item'}>Profile</a>
                                    </Link>
                                    <a className="dropdown-item" onClick={signOutUser} href="#">Logout</a>
                                </div>
                            </li>
                        </ul>
                    ) : (
                        <ul className={"navbar-nav my-2 my-lg-0 "}>
                            <li className={'nav-item'}>
                                <Link href={'/register'}><a className={'nav-link text-white'}>Register</a></Link>
                            </li>
                            <li className={'nav-item'}>
                                <Link href={'/login'}><a className={'nav-link text-white'}>Login</a></Link>
                            </li>
                        </ul>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
};

export default Header;