
import axios, { AxiosAdapter, AxiosResponse } from 'axios';

const  getCharList=async()=>{
   let res:AxiosResponse<any>=null;
   try{
  res=await axios.get('https://api.neople.co.kr/cy/characters?apikey=dagxFMoUoEfELDjmBOVVO2vkf6aoELx7');
   }catch(err){
      return ("error");
   }
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
const searchStrProcess=(word:string,value:string)=>{
  
      if(word.length==1){
         if(cho(word)===cho(value)){
            return true;
         
         }else if(cho(value[0]).startsWith(cho(word[0])))
            return true;   
      }
      if(word.length>1){
         if(cho(word)===cho(value)){
            return true;
         
         }else if(cho(value).startsWith(cho(word)))
            return true;   
      }
   
   return false;
}
function cho(word :string){
   const unicode=44032
   var check_num = /[0-9]/; // 숫자 
   var check_eng = /[a-zA-Z]/; // 문자 
   var check_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자 
   var check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
   let result:string="";
   for(let char of word){
      if(check_eng.test(char)){
         char=char.toLowerCase();
         var toKor={"a":"ㅇ","b":"ㅂ","c":"ㄲ","d":"ㄷ","e":"ㅇ","f":"ㅍ","g":"ㄱ","h":"ㅎ","i":"ㅇ","j":"ㅈ","k":"ㅋ","l":"ㄹ","m":"ㅁ","n":"ㄴ","o":"ㅇ","p":"ㅍ","q":"ㅋ","r":"ㄹ","s":"ㅅ","t":"ㅌ","u":"ㅇ","v":"ㅂ","w":"ㅇ","x":"ㅅ","y":"ㅇ","z":"ㅈ"}
         result+=toKor[char];    
      }else {
         var chos = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
         if(char=='ㄱ')
            char="ㄲ"
         result+=chos[Math.floor((char.charCodeAt(0)-unicode)/588)]?chos[Math.floor((char.charCodeAt(0)-unicode)/588)]:char;
      }  
   }
   return result;  
}
export {getCharList,getItemList,searchStrProcess};