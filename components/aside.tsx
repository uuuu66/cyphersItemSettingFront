

export default function aside(){
   
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
                                <p>" 사퍼야 아프지마. "</p>
                            </details>
                        
                        </li>
                        
                        <li>
                        버그 제보 :
                            <ul>
                                <li>메일</li> 
                                <a >leeminki0428@gmail.com</a>
                                <li>개인 블로그</li> 
                                <a href="https://mlog.cf" target='_blank'>https://mlog.cf</a>
                            </ul>
                        </li>
                        <span id="hiddenword">난 숨겨져 잇지롱 헤헤</span>
                    </ul>
                    <div id="s3ImgDiv"><img src="s3.gif" id="s3" alt=" "/> </div>  
                </div>
                <summary>개발자 정보</summary>
            </details>
        </aside>
        
    )
}