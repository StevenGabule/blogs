import React from "react";
import {Container} from "react-bootstrap";
import Header from "./Header";


const Layout = ({children, auth}) => {
    const {user = {}} = auth || {};

    return (
        <>
            <Header user={user}/>
            <Container>
                {children}
            </Container>
        </>
    )
}


export default Layout;