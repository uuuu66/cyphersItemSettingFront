import Head from 'next/head'
import Span from '../atoms/span'




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
                        <Span>
                            version: {process.env.version}
                        </Span>
                    </div>
            </header>
            </>
        )
}