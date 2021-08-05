
import axios, { AxiosAdapter, AxiosResponse } from 'axios';

const  getCharList=async()=>{
    
 const res:AxiosResponse<any>=await axios.get('https://api.neople.co.kr/cy/characters?apikey=dagxFMoUoEfELDjmBOVVO2vkf6aoELx7');
 const imgsrc='https://img-api.neople.co.kr/cy/characters/'
 
 const datas=Object.entries<any>(res.data)[0][1];
 datas.map(character=>{
    character.characterId=imgsrc+character.characterId;
 })   


 const result=datas;

    return result
}
const getItemList=async(character:string)=>{
   const res:AxiosResponse<any>=await axios.post('/api/getItemList',{character:character});
   let data=res.data.data;
   const code=res.data.code;
   let result=null;
   if(code!=="error"){
      result=data.split(',');
   }else{
      result=res.data;
   }
   return result;

}
const getItemInfo=async(code:string)=>{
   const res:AxiosResponse<any>=await axios.post('/api/getItemInfo',{code:code});
   console.log(res.data);
}

export {getCharList,getItemList,getItemInfo};