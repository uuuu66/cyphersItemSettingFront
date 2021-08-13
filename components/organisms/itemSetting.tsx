import { ComponentProps,memo,useReducer } from "react";
import ItemList from "../molecules/itemList";
import ItemSlot from "../molecules/itemSlot";
const ItemSetting=(props:ComponentProps<any>)=>{
    
    function slotReducer(state,item){
        const slot=item.slotName;
        state.slot=item;
        return state
    }
    const [slot,setSlot]=useReducer(slotReducer,{});
    return(
        <div className="itemSetting">
            <div className="subtitle"><h1>{props.name }{"#"+props.index}</h1></div>
            <div className="subtitle"><h2>결과</h2></div>
          
            <ItemList key={props.name+props.index} data={props.data} onItemEquip={function(value){

            }}></ItemList>
        </div>
    )
}
export default memo(ItemSetting)