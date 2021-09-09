import { ComponentProps,MutableRefObject,useReducer,useRef,useState} from "react"
import { searchItems } from "../../../lib/data";
import { debouncing } from "../../../lib/util";
import Button from "../../atoms/button"
import SearchResult from "./searchResult";
interface IsearchReducerAction{
    code:string;
    idx:number;
    search:string;
    data:any;
}
interface IsearchResult{
    word:string;
    data:any
}
export default function ItemSearch(props:ComponentProps<any>){

    const inputRef:MutableRefObject<any>=useRef();
    const [search,setSearch]=useReducer(searchReducer,[]);
    function searchReducer(state:Array<IsearchResult>,action:IsearchReducerAction){
        const newState:Array<IsearchResult>=[...state];
        if(action.code==="CREATE"){
            newState.pop();
            const newResult:IsearchResult={
                word:action.search,
                data:action.data,
            }
            newState.push(newResult);
        }   
        if(action.code==="DELETE"){
            newState.splice(action.idx,1);
        }
        return newState;
    }
    async function createSearch(data:string){
        const result=await searchItems(data,props.char);
        return result;
    }
     function onCreate(search:string,data:any){
        const action:IsearchReducerAction={
            code:"CREATE",
            idx:null,
            search:search,
            data:data,
        }     
       return setSearch(action);         
    }
    function onDelete(idx:number){
        const action:IsearchReducerAction={
            code:"DELETE",
            search:null,
            idx:idx,
            data:null,
        }
        return setSearch(action);
    }

   
    return(
        <div className="searchResult">
            <h1>아이템 검색</h1>
            <div className="inputDiv">
            <input ref={inputRef} className="charSearch" placeholder="ex)치명,혼불,파이크 이펙션...."
            ></input>
            <Button onClick={async function(){
                if(inputRef.current.value!=""){
                    props.onReady(true);
                    const res=await createSearch(inputRef.current.value)
                    props.onReady(false);
                   return  onCreate(inputRef.current.value,res);
                }
                }}>검색</Button>
            </div>      
            {search.map(
              (val,idx)=>
                {return <SearchResult
                        key={val.word+idx}
                        onDelete={()=>onDelete(idx)}
                        search={val.word}
                        data={val.data}
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
                </SearchResult>} 
           )}    
        </div> 
    )
}