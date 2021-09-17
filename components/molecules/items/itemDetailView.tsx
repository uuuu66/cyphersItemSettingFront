import { ComponentProps,useState ,useCallback, memo} from "react";
import Icon from "../../atoms/icon"
import Span from "../../atoms/span"
import StatusBar from "../bars/statusBar"
import DivButton from "../../atoms/divButton";
const ItemDetaiView=({target}:ComponentProps<any>)=>{
    const [float,setFloat]=useState(false);
    const src=target.src;
    const name=target.name;
    const info=target.info;
    const part=target.part;
    const rarity=target.rarity;
    const infoStrings=info.split("\n");
    const color=["언커먼","경고","유니크","커먼"];
    const maximizeBtn=useCallback(()=>{
        return(
           <DivButton  
            onBtnClick=        
            {function(){         
                    setFloat(!float);
            }}>{float?'X':'＋'}</DivButton>
        )
    },[float])
    return(<div className={`itemDetailView${float}`} onClick={function(){setFloat(!float)}}>
        <StatusBar current={true} title="상세" >{maximizeBtn()}</StatusBar>
        <div className="view">

            {src!="없음"&&<Icon src={src} name={name}></Icon>}
            <Span rarity={rarity}>{name}</Span>
            <h5>슬롯:{part}</h5>
            <div>
            {infoStrings.map((info,i)=>(
                <div key={name+info+i}>
                    {i>4?<Span  rarity={color[i%4]}>{info}</Span>:<Span rarity="유니크">{info}<br/></Span>}
                </div>
            ))}
            </div>
        </div>
        </div>
    )
}

export default ItemDetaiView;