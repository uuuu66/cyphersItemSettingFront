const fs=require("fs");
function compare(){
    const res=fs.readFileSync("./lib/datas/까미유.json");
    const res1=fs.readFileSync('./lib/datas/자네트.json');

    const data=JSON.parse(res.toString());
    const data1=JSON.parse(res1.toString());
    const cd=new Map();
    const cd1=new Map();
    
    data.map(value=>{
    
        const splitValue=Object.keys(value)[0].split(" ")
        const key=splitValue[splitValue.length-1];
        if(cd.has(key)){
            let i=cd.get(key);
            i+=1;
            cd.set(key,i);
        }else{
            cd.set(key,1);
        }
    })
    data1.map(value=>{
    
        const splitValue=Object.keys(value)[0].split(" ")
        const key=splitValue[splitValue.length-1];
        if(cd1.has(key)){
            let i=cd.get(key);
            i+=1;
            cd1.set(key,i);
        }else{
            cd1.set(key,1);
        }
    })
   ;
   let sum=0;
    const cd2=new Map();
    for(const [key,value] of cd1){
        if(cd.has(key)){
            
            cd2.set(key,`${cd1.get(key)}-${cd.get(key)}=${cd1.get(key)-cd.get(key)}`);
            sum+=(cd1.get(key)-cd.get(key));
        }else{
            cd2.set(key,"없음");
        }
    }
    console.log(cd2,sum,data.length-data1.length);
}
compare();