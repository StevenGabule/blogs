import React from "react";
import Link from "next/link";
import {Container, Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";
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
            </Head>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Facebook</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <li className={'nav-item'}>
                            <Link href={'/'}><a className={'nav-link'}>Home</a></Link>
                        </li>

                        {user._id ? (
                            <>
                                <li className={'nav-item'}>
                                    <Link href={'/profile'}><a className={'nav-link'}>Profile</a></Link>
                                </li>

                                <li className={'nav-item'}>
                                    <Link href={'/post/create'}><a className={'nav-link'}>Create</a></Link>
                                </li>

                                <li className={'nav-item'}>
                                    <Link href={''}>
                                        <a className={'nav-link text-capitalize'} onClick={signOutUser}>{user.name} Logout</a>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className={'nav-item'}>
                                    <Link href={'/register'}><a className={'nav-link'}>Register</a></Link>
                                </li>
                                <li className={'nav-item'}>
                                    <Link href={'/login'}><a className={'nav-link'}>Login</a></Link>
                                </li>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
};

export default Header;