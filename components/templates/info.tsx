
function Help1(){
    return (<>
        <ol>
            <li>
               좌측 상단 메뉴에서 <b>아이템 세트 만들기/불러오기</b>를 클릭합니다.
            </li>
            <li>
                캐릭터를 선택합니다. 
            </li>
            <li>
                아이템 목록이 다 로딩되면 아이템 버튼을 눌러서 아이템을 착용합니다. 
            </li>
            <li>
                <b>결과</b>창에서 능력치를 확인할 수 있습니다. 
            </li>
            <li>
                아이템 세트를 저장하려면 코드만들기를 누릅니다.
            </li>
            <li>
                만들어진 코드를 복사하여서 어딘가(ex:메모장...)에 저장합니다.
            </li>
        </ol>
    </>);
}
function Help3(){
    return (<>
        <ol>
            <li>
                좌측 상단 메뉴에서 <b>아이템 검색하기</b>를 클릭합니다.
            </li>
            <li>
                찾고 싶은 아이템을 검색합니다. 
            </li>       
        </ol>
    </>);
}
function Help2(){
    return (<>
        <ol>
            <li>
               좌측 상단 메뉴에서 <b>아이템 세트 만들기/불러오기</b>를 클릭합니다.
            </li>
            <li>
                아이템 코드 입력 창에 아이템 코드를 입력합니다.  
            </li>
            <li>
                기다리시면 아이템 세트가 생성됩니다.
            </li>
        </ol>
    </>);
}

export default function info(){
    return (
        <aside>
            <details>
                <summary>Info</summary>
                <h1>Info</h1>
                    <div>
                    사이퍼즈 아이템 세팅을 미리 해볼 수 있는 페이지입니다
                    </div>
                    <h3>사용법</h3>
                    <ul id="help">
                        <li>아이템 세트 만들기<Help1></Help1></li>
                        <li>아이템 세트 불러오기<Help2></Help2></li>
                        <li>아이템 세트 비교하기<Help3></Help3></li>
                     </ul>
                    
            </details>
        </aside>
    )
}
