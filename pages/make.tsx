import { GetStaticProps } from "next";
import { getCharList,getItemList } from "../lib/data"
import {debouncing} from "../lib/util"
import CharacterList from '../components/organisms/characterList'
import React, {useState,  useCallback, useReducer, useEffect,useRef} from 'react';
import ItemSetting from "../components/organisms/itemSetting";
import Span from '../components/atoms/span'
import Loading from '../components/molecules/popup/loading'
import Announce from '../components/molecules/popup/announce'
import Wrap from "../components/atoms/wrap";
export interface IactiveSet{
  key:number;
  name:string;
  char:string;
  data:object;
  scrollY:number;
  active:boolean;
}
interface IactionOfdispatchList{
  key:number;
  order:string;
  list:IactiveSet;
  data:any;
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
    const scrollRef=useRef<HTMLDivElement>();
    function scrollEvent() {
      setAnnounceEmpty();
      for(let i=0;i<scrollRef.current.children.length;i++){
        let currentTop=scrollRef.current.children.item(i).getBoundingClientRect().top+window.pageYOffset;
        let nextTop=currentTop+scrollRef.current.children.item(i).getBoundingClientRect().height;
        if(scrollY>currentTop&&scrollY<=nextTop){
          onActive(i);
        }
      }     
    }
    const debouncedScrollEvent=debouncing(scrollEvent,200)
    useEffect(()=>{
    window.addEventListener("scroll",debouncedScrollEvent);
    return()=>{ window.removeEventListener("scroll",debouncedScrollEvent)
    console.log("리턴됨")
    }},[])
    function forceLoading(boolean:boolean,time:number){
      setLoading(boolean);
      setTimeout(()=>{setLoading(!boolean);},time)
    }
    function announceThings(text,rarity="유니크"){
      setAnnounceEmpty();
      let announce=[{text:text,rarity:rarity}];
      setAnnounce(announce);  
    }
    function setAnnounceEmpty(){
      setAnnounce([])
    }
    function dispatchList(state:IactiveSet[],action:IactionOfdispatchList){
    
      const key=action.key??null;
      
      const order=action.order??null;
      const list=action.list??null;
      const data=action.data??null;
      let newState:IactiveSet[]=[]
      if(order==="CREATE"){
        newState= [...state,list];
      }
      if(order==="DELETE"){
        newState=deleteSet(state,key);
      }
      if(order==="RENAME"){
        newState=renameSet(state,key,data)
      }
      if(order==="ACTIVE"){
       
        newState=activeSet(state,key);
      }
      state=newState;
      return state;
    }
    function onActive(idx:number){
      return setActiveList({key:idx,order:"ACTIVE",list:null,data:null})
    }
    function onDelete(key:number){
      forceLoading(true,1000)
      return setActiveList({key:key,order:"DELETE",list:null,data:null})
    
    }
    function onRename(key:number,name:String){
      return setActiveList({key:key,order:"RENAME",list:null,data:name})
    }
    function onCreate(value){
      setLoading(true);
       getItemList(value).then(
        data=>{
          let newActive:IactiveSet={
            key:Date.now(),
            name:null,
            char:value,
            data:data,
            scrollY:null,
            active:false,
          }
          setLoading(false);
         return setActiveList({key:null,order:"CREATE",list:newActive,data:null})
        } 
      ).catch(err=>console.log(err));
    }
    function deleteSet(state:IactiveSet[],key:number){
      state=state.filter(set=>{return set.key!==key});
      return state;
    }
    function renameSet(state:IactiveSet[],key:number,name:string){
      state=state.map(set=>{if(set.key===key)set.name=name; return set})
      return state
    }
    function activeSet(state:IactiveSet[],key:number){
  
      state=state.map((set,i)=>{ 
        
        set.active=i===key?true:false; 
        return set});
      
      return state
    }
    const itemSettings=useCallback(()=>{  
    return   ActiveList.map((value,index)=>(
     <ItemSetting
         data={value.data} 
         key={value.key} 
         index={index+1} 
         name={value.name}
         char={value.char}
         active={value.active}
         onAnnounce={
           function(text,rarity){
            return announceThings(text,rarity)
           }
         }
         onReady={
           function(boolean){
             const result=setLoading(boolean);
             return result;
           }
       }
       onDelete={function(){onDelete(value.key)}}
       onRename={function(newName:string){onRename(value.key,newName)}}
       ></ItemSetting>
     ))},[ActiveList])
    return (
      <div>
        <div id="itemSettingScroll" ref={scrollRef}>
        {itemSettings()}
        </div>
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
              onCreate={onCreate}
              >
            </CharacterList>
          }
          </div>
      </div>
    )
}
