import {withRouter} from "next/router";
import React from "react";

const ActiveLink  = ({ router, href, children}) => {

    /*(function prefetchPages() {
        if (typeof window !== "undefined") {
            router.push(router.pathname);
        }
    })()*/;

    const handleClick = e => {
        e.preventDefault();
        router.push(href);
    }

    const isCurrentPath = router.pathname === href || router.asPath === href;

    return <>
        <a href={href} onClick={handleClick} style={{
            textDecoration: 'none',
            margin: 0,
            padding: 0,
            fontWeight: isCurrentPath ? "bold" : "normal",
        }}>{children}</a>
    </>
}

export default withRouter(ActiveLink);

