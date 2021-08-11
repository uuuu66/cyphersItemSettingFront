import { GetStaticProps } from "next";
import { getCharList,getItemList } from "../lib/data"
import List from '../components/organ/list'
import React from 'react';
import ItemSetting from "../components/system/itemSetting";
interface ActiveCharacter{
  key:number;
  name:string;
  data:Object[];
}

export const getStaticProps:GetStaticProps =async()=> {
    const allCharList = await getCharList();
    const CharList=[];
    allCharList.map(value=>{
      const obj={
        code:value.characterId,
        name:value.characterName,
      }
      return CharList.push(obj);
    })
   
    return {
      props: {
          CharList
         
      }
    }
  }
export default function make({CharList}){
    const initialActiveList=[];
    const [charList,setCharList]=React.useState(CharList);
    const [ActiveList,setActiveList]=React.useState(initialActiveList);

    return (
      <div>
        {ActiveList.map(value=>(
          <ItemSetting data={value.data} key={value.key} index={value.key} name={value.name}></ItemSetting>
        ))}
        <div id='characterTable'>
          <div id="subtitle"><h1>아이템 세트 만들기</h1></div>
            <List type="character" data={charList} onListEvent={async function(value){ 
                const data=await getItemList(value);
                const newActive={
                  key:Date.now(),
                  name:value,
                  data:data,
                }
                 return setActiveList([...ActiveList, newActive]); 
            }}></List>
        </div>
      </div>
    )
}
