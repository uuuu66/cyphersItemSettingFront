import { ComponentProps,memo} from "react";
import List from './list'
import Span from '../atoms/span'
const itemList =(props:ComponentProps<any>)=>{
        const items=Object.values(props.data);
        let keys=Object.keys(props.data);
        keys[1]="공통";
        const Content=keys.map((v,i)=>
            {
                const keysOfKeys=Object.keys(items[i]);
                const valueOfValues=Object.values(items[i]);
                    return(
                        <div key={v}>
                            <h4 >{v}</h4>
                                {keysOfKeys.map((va,ia)=>{
                                    return(
                                        <li key={va}>{va}<details><summary>===================</summary>
                                            <List data={valueOfValues[ia]} slot={va} type="item" onListEvent={function(value,src,info,rarity,slot){
                                                return props.onListEvent(value,src,info,rarity,slot);}}>
                                            </List></details>
                                        </li>
                                    )
                            })}
                        </div>
                    )
            }
        )
    return(
    <div className="itemList">  
        <div className="subtitle"><h2>아이템 목록</h2>
            <Span rarity="언커먼"><Span rarity="레어">터치</Span> : 아이템 착용/해제하기</Span>
            <br></br>
            <Span rarity="언커먼"><Span rarity="레어">길게 터치</Span> : 아이템 상세보기</Span>
        </div>
        <div>
            {Content}
        </div>
    </div>  
    )
}

export default memo(itemList)