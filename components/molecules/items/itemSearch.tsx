import { ComponentProps,MutableRefObject,useReducer,useRef,useState} from "react"
import { searchItems } from "../../../lib/data";
import { debouncing } from "../../../lib/util";

import SearchResult from "./searchResult";
interface IsearchReducerAction{
    code:string;
    idx:number;
    data:string;
}
interface IsearchResult{
    word:string;
    data:any
}
export default function ItemSearch({char,onAnnounce,onWatchDetail,onEquip}:ComponentProps<any>){
 
    const inputRef:MutableRefObject<any>=useRef();
    const [search,setSearch]=useReducer(searchReducer,[]);
    function searchReducer(state:Array<any>,action:IsearchReducerAction){
        const newState=[...state];
        if(action.code==="CREATE"){
            newState.splice(action.idx,1);
            searchItems(action.data,char).then(
                data=>{
                    console.log(typeof(data));
                const newResult:IsearchResult={
                    word:action.data,
                    data:data,
                }
                newState.push(newResult);
                }
            )
            
        }
        if(action.code==="DELETE"){
            newState.splice(action.idx,1);
        }
        return newState;
    }
    function onCreate(data:string){
        const action:IsearchReducerAction={
            code:"CREATE",
            idx:null,
            data:data,
        }
        console.log(search.length);
        if(search.length<3)
            return setSearch(action);
        else
            return onAnnounce(`[${data}]검색 결과 생성 실패.3개제한.`,"경고");
    }
    function onDelete(idx:number){
        const action:IsearchReducerAction={
            code:"DELETE",
            idx:idx,
            data:null,
        }
        return setSearch(action);
    }
   
    return(
        <div className="searchResult">
            <h1>아이템 검색</h1>
            <div id="inputDiv">
            <input ref={inputRef} id="charSearch" 
            onClick={async function(){
                if(inputRef.current.value!=""){
                   return onCreate(inputRef.current.value)
                }
                }}
            ></input>
            </div>      
            {search.map(
            (val,idx)=>
                <SearchResult
                        onDelete={()=>onDelete(idx)}
                        search={val.word}
                        data={val.data}
                        onWatchDetail=
                        {
                            function(name,src,info,rarity,slot){
                                onAnnounce(`<${name}> 상세보기.`,"언커먼")
                                onWatchDetail(name,src,info,rarity,slot)
                            }
                        }
                        onListEvent={onEquip}>
                </SearchResult> 
           )}    
        </div> 
    )
}