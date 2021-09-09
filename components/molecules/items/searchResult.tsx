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
    
    function howManyResult(){
        const keys=Object.keys(props.data);
        return keys.map(key=>(<p key={key}>
        {key!=="공통"?<h1>{key} 전용 아이템의 결과 </h1>:<h1>{key} 아이템의 결과 </h1>}
            <h3>설명 일치:{props.data[key]["설명 일치"].length}</h3>
            <h3>이름 일치:{props.data[key]["이름 일치"].length}</h3>
        </p>))
    }
    return(
    <div className="itemSearchResult">
        <StatusBar current="true" title={`${props.search} 에 대한 검색결과`} >
                <ToolBarButton title={toolBar.title} buttons={toolBar.buttons}>
                <ImgButton src="/deleteBtn.png" alt="삭제"></ImgButton>
                </ToolBarButton>
        </StatusBar>
        {howManyResult()}
        {props.data&&<ItemList  
                    data={props.data}
                    onWatchDetail={function(name,src,info,rarity,slot)
                                    {
                                        return props.onWatchDetail(name,src,info,rarity,slot);
                                    }
                                }
                    onListEvent={function(value,src,info,rarity,slot,code)
                                    {
                                        return props.onListEvent(value,src,info,rarity,slot,code);
                                    }
                                }>   
        </ItemList>}
        </div>
    )
}