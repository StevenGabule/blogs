import React from "react";
import {Container} from "react-bootstrap";
import Header from "./Header";


const Layout = ({ children, auth}) => {
    const {user = {}} = auth || {};

    return (
        <Container>
            <Header user={user} />
            {children}
        </Container>
    )
}


export default Layout;