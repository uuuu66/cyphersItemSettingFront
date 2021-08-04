import { GetStaticProps ,GetServerSideProps} from "next";
import { getCharList,getItemList } from "../lib/data"
import CharList from '../components/charList';
import CharacterSet from '../components/characterSet';
import React from 'react';


export const getStaticProps:GetStaticProps =async(context)=> {
    const allCharList = await getCharList();
    return {
      props: {
          allCharList
      }
    }
  }
export default function make(allCharList:GetStaticProps){
    const emptyList:Object[]=[];
    const [makeList,setMakeList]=React.useState(emptyList);
    const List=Object.values(allCharList)[0];
    const getItem=getItemList;
   
    
    const Content=<CharacterSet data={makeList}></CharacterSet>
  
    return (
      <div>
      {Content}
        <div id='characterTable'>
         
          <div id="subtitle"><h1>아이템 세트 만들기</h1></div>
          <CharList list={List} onChangeCharacter={function(list:any){
            if(list.code==="error"){
              return alert(`에러가 일어났습니다. 에러코드를 복사해서 개발자에게 문의해주세요. error code:${list.data}`)
            }
            const newMakeList:Object[]=Array.from(makeList);
             newMakeList.push(list);
             setMakeList(newMakeList);
             
          }}></CharList>
        </div>
      </div>
    )
}
