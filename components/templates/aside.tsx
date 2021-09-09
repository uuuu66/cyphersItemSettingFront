import Span from '../atoms/span'
import Image from 'next/image'
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
                                <a>leeminki0428@gmail.com</a>
                            </ul>
                        </li>
                        <Span rarity="hidden">난 숨겨져 잇지롱 헤헤</Span>
                    </ul>
                    <div id="s3ImgDiv"><Image layout="fill" loading="eager" src="/s3.gif"  alt="네오플 div"/></div>  
                </div>
                <summary>개발자 정보</summary>
            </details>
        </aside>
    )
}