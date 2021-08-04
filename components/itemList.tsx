import {ComponentProps} from "react"

export default function ItemList(props:ComponentProps<any>){
  
    return(
        <div className="itemList">
            {props.data.map(value=>{
                   
                const item=value.split(":");
                const name=item[0];
                const imgSrc="https://img-api.neople.co.kr/cy/items/"+item[1];
               return( <div className="item" key={name}>
                    <img src={imgSrc} alt="네오플이 이미지 지원안함 ^^" />
                    <span>{name}</span>
                </div>)
            })}
        </div>
    )
}