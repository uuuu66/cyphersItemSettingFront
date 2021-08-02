import { GetStaticProps ,GetServerSideProps} from "next";
import { getCharList,getItemList } from "../lib/data"

function CharListComp(props:any){
  const getItem= getItemList;
 return(
  <>   
  {props.list.map((value)=>(
     
      <div className="charImg" key={value.characterName} onClick={()=>getItem(value.characterName)} >
          <img src={value.characterId}alt={value.characterName}/>
      </div>
  ))}
  </>
  );
}

export const getStaticProps:GetStaticProps =async(context)=> {
    const allCharList = await getCharList();
    return {
      props: {
          allCharList
      }
    }
  }
export default function make(allCharList:GetStaticProps){
    const List=Object.values(allCharList)[0];
    const getItem=getItemList;
    const CharList=CharListComp;
    return (
        <div id='characterTable'>
          <div id="subtitle"><h1>아이템 세트 만들기</h1></div>
          <CharList list={List}></CharList>
        </div>
    )
}
