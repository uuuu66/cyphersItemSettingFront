import fs from 'fs'
import axios from 'axios';

const characterItem={};

fs.readdir("./lib/datas",async(err,files)=>{
    if(err){
       return console.log(err);
    }
    if(files){
   
    return processArray(files,delayed1)
    }
 
})

function delay() {
   return new Promise(resolve => setTimeout(resolve, 100));
 }
 
async function delayed(item,obj) {
   // notice that we can await a function
   // that returns a promise
   await delay();
   const items=item.split(":");
   const name=items[0];
   const code=items[1];

   console.log(name);
   return axios.get(`https://api.neople.co.kr/cy/battleitems/${code}?apikey=dagxFMoUoEfELDjmBOVVO2vkf6aoELx7`)
   .then((response)=>{ 
         const it=new Object;
            it[name]=response.data
          characterItem[obj].push(it);
   }).catch(err=>{
      console.log(err);
   });
 }
 async function delayed1(file){
   const items=fs.readFileSync(`./lib/datas/${file}`);
   const item=items.toString().split(",");
   file=file.split(".")[0];
   characterItem[file]=new Array();
  return await processArray(item,delayed,file);
}
 async function processArray(array,func,obj) {
        if(obj){
            for (const item of array) { 
               await func(item,obj);
            }
            characterItem[obj]=characterItem[obj].map(value=>{
               return value=JSON.stringify(value)+"\n";
            })
            characterItem[obj]="["+characterItem[obj]+"]";
            return fs.writeFileSync(`./lib/datas/${obj}.json`,characterItem[obj].toString());
        }else{
             for (const item of array) { 
               await func(item,obj);
            }
        }
 }
 
