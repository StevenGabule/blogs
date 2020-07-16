import React from "react";
import Layout from "../components/_App/Layout";
import '../public/css/styles.css'

function MyApp({ Component, pageProps }) {
    return <Layout {...pageProps}>
        <Component {...pageProps} />
    </Layout>
}

export default MyApp;