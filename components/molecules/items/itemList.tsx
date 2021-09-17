import { ComponentProps,memo,useState} from "react";
import BtnList from '../btnList/btnList'
import Span from '../../atoms/span'

const ItemList=(props:ComponentProps<any>)=>{
       

        const itemsObject=Object.values(props.data);
        const keys=Object.keys(props.data);
        

        const  Content= keys.map((v,i)=>
            {
                const keysOfKeys=Object.keys(itemsObject[i]);
                const items=Object.values(itemsObject[i]);
                    return(
                        <div key={v}>
                            <h4 >{v}</h4>
                                {keysOfKeys.map((va,ia)=>{
                                    
                                    return(
                                        <li key={va}>{va}
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
                                            </BtnList>
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
          
        </div>
        <div>
            {Content}
        </div>
    </div>  
    )
}
function areEqual(prevProps:ComponentProps<any>,nextProps:ComponentProps<any>){
    const flag=prevProps.data===nextProps.data?true:false;
    return flag;
}
export default memo(ItemList,areEqual)