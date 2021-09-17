
import axios, {AxiosResponse } from 'axios';
import Result from '../components/molecules/items/itemResult';
import { CslotParts } from '../components/organisms/itemSetting';
import ItemJson from './datas/items.json'
const  getCharList=async()=>{
   let res:AxiosResponse<any>=null;
   try{
  res=await axios.get('https://api.neople.co.kr/cy/characters?apikey=dagxFMoUoEfELDjmBOVVO2vkf6aoELx7',{withCredentials:true});
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
const getSlotCode=async(code:string,char:string)=>{
   try{
      const res:AxiosResponse<any>=await axios.post('/api/getSlotCode',{code:code,char:char},{withCredentials:true});
      const data=res.data.data;
      const makedParts=new CslotParts();
      if(data==="charErr"){
         return {code:"err",data:"charErr"};
      }
      if(data==="codeErr"){
         return  {code:"err",data:"codeErr"};
      }
      if(data==="invalidCode"){
         return  {code:"err",data:"invalidCode"};
      }
   
      const parts=Object.keys(makedParts);
      parts.map((part,index)=>{
         makedParts[part]=data[index]==="null"?null:data[index];
         if(makedParts[part]!==null){
            data[index].part=part;
         }
      });
      
      return {code:"done",data:makedParts};;
   }catch(err){
      console.log(err);
      return null;
   }
}
const getItemList=async(character:string)=>{
   try{
      
      const res:AxiosResponse<any>=await axios.post('/api/getItemList',{character:character},{withCredentials:true});
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
const searchItems=async (searchWord:string,char:string)=>{
   const result=await processSearchItem(searchWord,char);
   console.log(result);
   return result;
}
const searchChars=(searchWord:string,compareTarget:string)=>{
   let result=false;   
   searchWord=searchWord.trim();
   result=processSearchCharacter(searchWord,compareTarget)   
   return result;
}
function processSearchCharacter(searchWord:string,compareTarget:string){
   if(searchWord.length>=1){
      if(compareTarget.startsWith(searchWord))
            return true;
      if(extractChosung(searchWord)===extractChosung(compareTarget))
            return true;
      if(extractChosung(compareTarget).startsWith(extractChosung(searchWord)))
            return true;   
         }
   return false;
}
async function processSearchItem(searchWord:string,char:string){
   searchWord=searchWord.trim();
   const res=await getItemList(char);
   const keys=Object.keys(res);
   const result={};
   result[char]={"설명 일치":[],"이름 일치":[]};
   result["공통"]={"설명 일치":[],"이름 일치":[]};
   keys.map(key=>{
      const itemList=res[key];
      const parts=Object.keys(res[key]);
      res[key]=parts.map(part=>{
         const items=itemList[part];
         items.map(val=>{
            if(val.explainDetail.includes(searchWord)){
               result[key]["설명 일치"].push(val);  
            }
            if(val.itemName.includes(searchWord)){
               result[key]["이름 일치"].push(val);     
            }      
         });
      })
   })
   
  return result;
}
function extractChosung(word :string){
   const unicode=44032
   var check_eng = /[a-zA-Z]/; // 문자 
   let result:string="";
   for(let char of word){
      if(check_eng.test(char)){
         char=char.toLowerCase();
         var toKor={"a":"ㅇ","b":"ㅂ","c":"ㅋ","d":"ㄷ","e":"ㅇ","f":"ㅍ","g":"ㄱ","h":"ㅎ","i":"ㅇ","j":"ㅈ","k":"ㅋ","l":"ㄹ","m":"ㅁ","n":"ㄴ","o":"ㅇ","p":"ㅍ","q":"ㅋ","r":"ㄹ","s":"ㅅ","t":"ㅌ","u":"ㅇ","v":"ㅂ","w":"ㅇ","x":"ㅅ","y":"ㅇ","z":"ㅈ"}
         
         result+=toKor[char];    
      }else {
         var chos = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
            if(char=='ㄲ')
               char="ㅋ"
            if(char=="까")
               char="ㅋ"
              
         result+=chos[Math.floor((char.charCodeAt(0)-unicode)/588)]?chos[Math.floor((char.charCodeAt(0)-unicode)/588)]:char;
         
      }  
   }
   return result;  
}
export {getSlotCode,getCharList,getItemList,searchChars,searchItems};