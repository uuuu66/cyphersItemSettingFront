import Span from '../atoms/span'
import Image from 'next/image'
import Link from "next/link"
import Button from '../atoms/button'
export default function Aside(){
    return(
        <aside>
            <details>
                <div>
                    <ul>
                        <li>
                        이름:MINKI LEE
                            <details>
                                <summary>
                                    하고싶은 말
                                </summary>
                                <p>"사퍼야 아프지마"</p>
                            </details>
                        </li>      
                        <li>
                        <h1>버그 제보 :</h1>
                            <ul>
                                <li>메일</li> 
                                <a>leemingi0428@gmail.com</a>
                            </ul>
                        </li>
                        <Span rarity="hidden">난 숨겨져 잇지롱 헤헤</Span>
                    </ul>
                    <div id="s3ImgDiv"><Image layout="fill" loading="eager" src="/s3.gif"  alt="네오플 div"/></div>  
                </div>
                <summary>개발자 정보</summary>
                <Link href="https://velog.io/@madmingi/" replace={true}>
                     <Button>블로그</Button>
                 </Link>
                
            </details>
        </aside>
    )
}