import React from "react";

export default function aside(){
    return(
        <aside>
                <div>
                    <ul>
                        <li>
                        개발자 정보 :<br/>
                        MINKI LEE
                        
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
                                <a href="malito:leeminki0428@gmail.com">leeminki0428@gmail.com</a>
                                <li>개인 블로그</li> 
                                <a href="https://mlog.cf">https://mlog.cf</a>
                            </ul>
                        </li>
                        <span id="hiddenword">난 숨겨져 잇지롱 헤헤</span>
                    </ul>
                    <img src="s3.gif" alt=" "/>   
                </div>
        </aside>
    )
}