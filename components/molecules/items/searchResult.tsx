import { ComponentProps } from "react"
import ItemList from "./itemList"
import ToolBarButton from "../toolBarButton/toolBarButton";
import ImgButton from "../../atoms/imgButton";
import DivButton from "../../atoms/divButton";
import StatusBar from "../bars/statusBar"
export default  function SearchResult(props:ComponentProps<any>){
    const toolBar={
        title:"슬롯 생성",
        buttons:[
        <DivButton key="create" onBtnClick={props.onDelete}>삭제</DivButton>,
        <DivButton key="code" onBtnClick={function(){}}>취소</DivButton> ,
        ]
    }  
    return(
    <div className="itemSearchResult">
        <StatusBar current="true" title={`${props.search} 에 대한 검색결과`} >
                <ToolBarButton title={toolBar.title} buttons={toolBar.buttons}>
                <ImgButton src="/deleteBtn.png" alt="삭제"></ImgButton>
                </ToolBarButton>
        </StatusBar>
        {props.data&&<ItemList  
                    data={props.data}
                    onWatchDetail=
                    {
                        function(name,src,info,rarity,slot){
                            props.onAnnounce(`<${name}> 상세보기.`,"언커먼")
                            props.onWatchDetail(name,src,info,rarity,slot)
                        }
                    }
                    onListEvent={props.onEquip}>
        </ItemList>}
        </div>
    )
}