import { ComponentProps,memo,useCallback} from "react";
import BtnList from '../btnList/btnList'
import Span from '../../atoms/span'

export default function ItemList(props:ComponentProps<any>){
        
        const itemsObject=Object.values(props.data);
        let keys=Object.keys(props.data);
        keys[1]="공통";
        const  Content= keys.map((v,i)=>
            {
                const keysOfKeys=Object.keys(itemsObject[i]);
                const items=Object.values(itemsObject[i]);
                    return(
                        <div key={v}>
                            <h4 >{v}</h4>
                                {keysOfKeys.map((va,ia)=>{
                                    
                                    return(
                                        <li key={va}>{va}<details><summary>===================</summary>
                                            <BtnList 
                                            data={items[ia]} 
                                            slot={va} 
                                            type="item" 
                                            onWatchDetail=
                                            {function(name,src,info,rarity,slot)
                                                {
                                                return props.onWatchDetail(name,src,info,rarity,slot);
                                                }
                                            }
                                            onListEvent=
                                            {function(value,src,info,rarity,slot,code)
                                                {
                                                return props.onListEvent(value,src,info,rarity,slot,code);
                                                }
                                            }>
                                                
                                            </BtnList></details>
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

