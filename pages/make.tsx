import { GetStaticProps } from "next";
import { getCharList,getItemList } from "../lib/data"
import List from '../components/molecules/list'
import  {useState, MutableRefObject,useRef,useReducer } from 'react';
import ItemSetting from "../components/organisms/itemSetting";
import Span from '../components/atoms/span'
import Button from '../components/atoms/button'
import Loading from '../components/molecules/loading'

export const getStaticProps:GetStaticProps =async()=> {
    const allCharList = await getCharList();
    const CharList=[];
    if(allCharList=="error")
    {
      CharList.push("error");
    }else{
      allCharList.map(value=>{
        const obj={
          code:value.characterId,
          name:value.characterName,
        }
        return CharList.push(obj);
      })
    }
    return {
      props: {
          CharList
      }
    }
  }
export default function make({CharList}){
    const initialActiveList=[];
    const [charList,setCharList]=useState(CharList);
    const [ActiveList,setActiveList]=useState(initialActiveList);
    const [search,setSearch]=useState(null);
    const [isLoading,setLoading]=useState(false);
   
    const inputRef:MutableRefObject<any>=useRef();
    const Content=charList[0]=="error"?<div>error</div>: <List type="character" search={search}  data={charList} onListEvent={async function(value){ 
        
        setLoading(true);
        await getItemList(value).then(
          data=>{
            let newActive={
              key:Date.now(),
              name:value,
              data:null,
            }
            setLoading(false);
          
            newActive.data=data;
            return setActiveList([...ActiveList, newActive]); 
          }
        ).catch(err=>{

        })
    }}></List>
    function forceLoading(boolean:boolean,time:number){
      setLoading(boolean);
      setTimeout(()=>{setLoading(!boolean);},time)
    }
    return (
      <div >
        {ActiveList.map((value,index)=>(
          <ItemSetting
          data={value.data} 
          key={value.key} 
          index={index+1} 
          name={value.name}
          onReady={function(boolean){
              if(boolean==true){
                forceLoading(boolean,80);
              }
            }
          }
          ></ItemSetting>
        ))}
           {isLoading&&<Loading/>}
          <div id='characterTable'>
            <div className="subtitle"><h1>아이템 세트 만들기</h1>
              <Span rarity="언커먼"><Span rarity="레어">터치</Span> :설명 보기</Span>
              <br></br>
              <Span rarity="언커먼"><Span rarity="레어">길게 터치</Span> : 선택하기</Span>
            </div>
            <h2>캐릭터 검색</h2>
            <Span rarity="레어">영어는 초성만 됨.사유:귀찮아서 </Span>
            <Button onClick={function(){setSearch(null); inputRef.current.value=" "}}>검색 초기화</Button>
            <div id="inputDiv">
              <input ref={inputRef} id="charSearch" onChange={function(e){setSearch(e.target.value)}}></input>
            </div> 
            {Content}
          </div>
      </div>
    )
}
