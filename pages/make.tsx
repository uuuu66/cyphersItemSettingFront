import { GetStaticProps } from "next";
import { getCharList,getItemList } from "../lib/data"
import CharacterList from '../components/organisms/characterList'
import {useState,  useCallback, useReducer} from 'react';
import ItemSetting from "../components/organisms/itemSetting";
import Span from '../components/atoms/span'
import Loading from '../components/molecules/popup/loading'
import Announce from '../components/molecules/popup/announce'
import Wrap from "../components/atoms/wrap";
export interface IactiveSet{
  key:number,
  name:string,
  data:object,
  scrollY:number;
}
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
export default function Make({CharList}){
 
    const initialActiveList:IactiveSet[]=[];
    const [ActiveList,setActiveList]=useReducer(dispatchList,initialActiveList);
    const [isLoading,setLoading]=useState(false);
    const [Announces,setAnnounce]=useState([]);
    
    function forceLoading(boolean:boolean,time:number){
      setLoading(boolean);
      setTimeout(()=>{setLoading(!boolean);},time)
    }
    function announceThings(text,rarity="유니크",basicAnnounce=Announces){
       setAnnounceEmpty();
      let announce=[...basicAnnounce,{text:text,rarity:rarity}];
      setAnnounce(announce);  
    }
    function setAnnounceEmpty(){
      setAnnounce([])
    }
    function dispatchList(state:IactiveSet[],action){
      const idx=action.idx||null;
      const order=action.order||null;
      const list=action.list||null;
      let newState:IactiveSet[]=[];
      if(order==="CREATE"){
        newState= [...state,list];
      }
      return newState;
    }
     async function onCreate(value){
      
      setLoading(true);
       await getItemList(value).then(
        data=>{
          let newActive:IactiveSet={
            key:Date.now(),
            name:value,
            data:data,
            scrollY:null,
          }
          setLoading(false);
         return setActiveList({order:"CREATE",list:newActive})
        } 
      ).catch(err=>console.log(err));
    }
  const itemSettings=useCallback(()=>{  
    return   ActiveList.map((value,index)=>(
     <ItemSetting
         data={value.data} 
         key={value.key} 
         index={index+1} 
         name={value.name}
         onAnnounce={
           function(text,rarity){
            return announceThings(text,rarity)
           }
         }
         onReady={
           function(boolean){
             const result=!boolean||forceLoading(boolean,80); 
             return result;
           }
       }
       ></ItemSetting>
     ))},[ActiveList])
     
    return (
      <div>
        {itemSettings()}
          <Wrap type="announce">
            <div className="announce">
              {Announces.length>0&&Announces.map((value,i)=>(<Announce key={value+i} announces={value} onCancle={function(){setAnnounceEmpty()}}></Announce>))}
            </div>   
          </Wrap>    
           {<Loading on={isLoading}/>}
          <div id='characterTable'>
            <div className="subtitle"><h1>아이템 세트 만들기</h1>
              <Span rarity="언커먼"><Span rarity="레어">터치</Span> : 선택하기</Span>
              <br></br>
            </div>
            {CharList[0]=="error"?<div>error <br/>서버문제이거나 당신이 문제이거나 개발자에게 연락주세용 ~★</div>: 
            <CharacterList 
              type="character"  
              data={CharList} 
              onListEvent={onCreate}>
            </CharacterList>
          }
          </div>
      </div>
    )
}
