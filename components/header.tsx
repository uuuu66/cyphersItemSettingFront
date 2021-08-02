import Head from 'next/head'





export default function Header(){
        return(
            <>
            <Head>
                <link rel="shortcut icon" href="favicon.ico"/>
                <link rel="icon" href="favicon.ico"/>
                <title>사이퍼즈 아이템 세팅</title>
            </Head>
            <header>
                    <h1>사이퍼즈 아이템 세팅</h1>
                    <div id="version">
                        <span>
                            version: {process.env.version}
                        </span>
                    </div>
            </header>
            </>
        )
}