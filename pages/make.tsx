import { GetStaticProps } from "next";
import { getCharList,getItemList } from "../lib/data"
import BtnList from '../components/molecules/btnList/btnList'
import  {useState, MutableRefObject,useRef,useReducer, useEffect } from 'react';
import ItemSetting from "../components/organisms/itemSetting";
import Span from '../components/atoms/span'
import Button from '../components/atoms/button'
import Loading from '../components/molecules/popup/loading'
import Announce from '../components/molecules/popup/announce'
import Wrap from "../components/atoms/wrap";
interface IactiveSet{
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
export default function make({CharList}){
    const initialActiveList:IactiveSet[]=[];
    const [charList,setCharList]=useState(CharList);
    const [ActiveList,setActiveList]=useState(initialActiveList);
    const [search,setSearch]=useState(null);
    const [isLoading,setLoading]=useState(false);
    const [Announces,setAnnounce]=useState([]);
    const [TimeOut,setTimeOut]=useState(null);
    const inputRef:MutableRefObject<any>=useRef();
    function makeList(){
      return(
        <BtnList type="character" search={search}  data={charList} onListEvent={async function(value){     
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
              return setActiveList([...ActiveList, newActive]); 
            }
          ).catch(err=>{

          })
      }}></BtnList>
      )}
    function forceLoading(boolean:boolean,time:number){
      setLoading(boolean);
      setTimeout(()=>{setLoading(!boolean);},time)
    }
   
    async function announceThings(text,rarity="유니크",basicAnnounce=Announces){
      let announce=[...basicAnnounce,{text:text,rarity:rarity}];
        setAnnounce(announce);
      if(announce.length<=1){
        return setAnnounceSplice(announce)
      }else if(announce.length<3){
        return setAnnounceEmpty()
      }else{
        announce=[];
        setAnnounce([...announce])
        return announceThings(text,rarity,announce);
      }
    }
    function setAnnounceSplice(announce){
    setTimeOut(setTimeout(()=>{setAnnounce(announce.splice(0,0))},2000));
    }
    function setAnnounceEmpty(){
      setTimeOut(clearTimeout(TimeOut));
      setTimeOut(setTimeout(()=>{setAnnounce([])},2000));
    }

    const Content=charList[0]=="error"?<div>error</div>: makeList();
    return (
      <div>
        {ActiveList.map((value,index)=>(
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
        ))}
          <Wrap type="announce">
            <div className="announce">
              {Announces.length>0&&Announces.map((value,i)=>(<Announce key={value+i} announces={value}></Announce>))}
            </div>   
          </Wrap>    
           {isLoading&&<Loading/>}
          <div id='characterTable'>
            <div className="subtitle"><h1>아이템 세트 만들기</h1>
              <Span rarity="언커먼"><Span rarity="레어">터치</Span> : 선택하기</Span>
              <br></br>
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
