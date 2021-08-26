import { ComponentProps,useRef,MutableRefObject,useState } from "react";
import BtnList from "../molecules/btnList/btnList"
import Span from '../atoms/span';
import Button from '../atoms/button'
export default function characterList({type,data,onListEvent}:ComponentProps<any>){
    const inputRef:MutableRefObject<any>=useRef();
    const [search,setSearch]=useState(null);
    
    return(
        <>
        <h2>캐릭터 검색</h2>
        <Span rarity="레어">영어는 한글로 변환 했을 때 이름의 자음 초성만 됨. <br></br><Span rarity="유니크">사유:귀찮아서</Span> </Span>
        <Button onClick={function(){setSearch(null); inputRef.current.value=" "}}>검색 초기화</Button>
        <div id="inputDiv">
          <input ref={inputRef} id="charSearch" onChange={function(e){setSearch(e.target.value)}}></input>
        </div> 
        <BtnList  
        type={type} 
        search={search}  
        data={data} 
        onListEvent={function(value){
            onListEvent(value);
        }}
        >
           

        </BtnList>
        </>
    )
}