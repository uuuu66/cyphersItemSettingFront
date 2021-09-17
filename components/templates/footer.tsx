import Image from 'next/image'
import ImgButton from '../atoms/imgButton'
export default function Footer(){
    return(<footer>
        <div id="footerImg" >
            <Image layout="fill" src="/cypherslog.png" onClick={function(){window.open('http://developers.neople.co.kr',"_blank")}}  alt="Neople 오픈 API" ></Image> 
        </div>
        
        </footer>
    )
}