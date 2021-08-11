
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
   try{
      
      const res:AxiosResponse<any>=await axios.post('/api/getItemList',{character:character});
      const data=res.data.data;
      const code=res.data.code;
      let result={};
      if(code!=="error"){
         const charData=data[0];
         const commonData=data[1];
     
         result[character]=charData;
         result["공통"]=commonData;
      }else{
         result=res.data;
      }
      return result;
   }catch(err){
      console.log(err);
      return;
   }
}

export {getCharList,getItemList};