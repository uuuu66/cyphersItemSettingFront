import Image from 'next/image'
function Help1(){
    return (<>
        <ul>
            <li>
               좌측 상단 메뉴에서 <b>아이템 세트 만들기</b>를 클릭합니다.
            </li>
            <li>
                캐릭터를 선택합니다.
            </li>
            <h3>아이템 세팅창 </h3>
            <div className="infoImage">
               <Image layout="responsive" loading="eager" width="96%" height="54%" src="/info1.png" alt="설명 1" />
            </div>
            <li>
                캐릭터를 선택하면 선택한 캐릭터의 아이템 세팅 창이 나타납니다. 
                <br/>
                아이템 세팅창은 여러개 불러올 수 있습니다. 하지만 성능이 떨어질 수 있습니다.   
            </li>
            
            <li>
                <h3>아이템 슬롯창 </h3>
                <ul>
                    <li>
                       
                        선택 되지 않은 슬롯
                        <div className="infoImage">
                        <Image layout="responsive"  loading="eager" width="100%" height="50%" src="/info7.png" alt="설명 2" />
                        </div>
                    </li> 
                    <li>
                        
                        선택된 슬롯
                        <div className="infoImage">
                        <Image layout="responsive"  loading="eager" width="100%" height="50%" src="/info2.png" alt="설명 2" />
                        </div>
                    </li>
                </ul>
                V표시는 아이템을 장착시킬 슬롯을 고르는 버튼입니다. 
                <br/><br/>그 슬롯을 이제부터 선택슬롯이라 칭하겠습니다.
                <br/><br/>표시줄이 파란색인 슬롯은 선택슬롯이란 표시입니다.
                <br/><br/>
                ∧표시는 선택슬롯을 해제하는 버튼입니다. 
                <br/><br/>＋는 왼쪽 상단에 슬롯을 고정합니다. 고정된 슬롯은 크기를 최대화시키거나 최소화 시킬 수 있습니다.
            </li>  
            <li> 
                <h3>아이템 슬롯 저장/불러오기</h3>
            <div className="infoImage">
               <Image layout="responsive"  loading="eager" width="100%" height="50%" src="/info3.png" alt="설명 3" />
            </div>

                플로피 디스크 버튼을 누르면 슬롯 창을 저장 할 수 있습니다. 
                <div className="infoImage">
               <Image layout="responsive"  loading="eager" width="100%" height="50%" src="/info4.png" alt="설명 4" />
            </div>
             txt 파일로 제공됩니다.
            </li>
            <div className="infoImage">
               <Image layout="responsive" loading="eager" width="100%" height="6%" src="/info5.png" alt="설명 5" />
            </div>  
            <li>
                파일 맨 밑줄은 슬롯 창의 코드입니다. 이 코드를 복사 붙여넣기 해서 슬롯창을 불러올 수 있습니다.
            </li>
            <li>
                만약 불러와 지지 않는다면 코드가 잘못되었거나 캐릭터가 다른 것이니 확인해주세요
            </li>
            <li>
            <h3>아이템 상세보기</h3>
            <div className="infoImage">
               <Image layout="responsive" loading="eager" width="96%" height="54%" src="/info6.png" alt="설명 6" />
            </div>
            오른쪽 상단에 고정된 창은 상세보기 입니다. 
            <br/>
            아이템을 선택시 상세 버튼을 클릭하면 상세보기 창에서 상세정보를 볼 수 있습니다.
            </li>
        </ul>
    </>);
}

export default function Info(){
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
                        {Help1()}
                    </ul>
            </details>
        </aside>
    )
}
