import { ComponentProps } from "react";
import List from './list'
import Span from '../atoms/span'
export default function itemList(props:ComponentProps<any>){
    
    const items=Object.values(props.data);
    let keys=Object.keys(props.data);
    keys[1]="공통";
    const Content=keys.map((v,i)=>{
        const keysOfKeys=Object.keys(items[i]);
        const valueOfValues=Object.values(items[i]);
        return(<div key={v}  >
        <h4 >{v}</h4>
          {keysOfKeys.map((va,ia)=>{
              return(<li key={va}>{va}<details><summary>===================</summary>
              <List data={valueOfValues[ia]} type="item">
            </List></details></li>)
          })}
        </div>)
    })
    
    return(
    <div className="itemList">  
        <div className="subtitle"><h2>아이템 목록</h2>
        <Span rarity="언커먼"><Span rarity="레어">클릭</Span> : 아이템 상세보기</Span>
        <br></br>
        <Span rarity="언커먼"><Span rarity="레어">더블 클릭</Span> : 아이템 착용하기</Span></div>
        
            <div>
                {Content}
            </div>
    </div>  
    )
}