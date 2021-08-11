import { ComponentProps } from "react";
import { getStaticProps } from "../../pages/make";
import List from '../organ/list'

export default  function ItemSetting(props:ComponentProps<any>){
    console.log(props.data);
    return(
        <div>
            <div id="subtitle"><h1>{props.name }{"#"+props.index}</h1></div>
            <div id="subtitle"><h2>아이템 목록</h2></div>
      
        </div>
    )
}