import Head from 'next/head'
import React from 'react'




export default function Header(){
        return(
            <>
            <Head>
                <link rel="shortcut icon" href="favicon.ico"/>
                <link rel="icon" href="favicon.ico"/>
                <link rel='stylesheet' href="/css/desktop.css" type="text/css"/>
                <script src="/jsScript/design.js"></script>
                <title>사이퍼즈 아이템 세팅</title>
            </Head>
            <header>
                    <div id="tg2">사이퍼즈 옷장</div>
            </header>
            </>
        )
}