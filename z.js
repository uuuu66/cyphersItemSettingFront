const fs=require("fs");
const a=require("./lib/datas/item.json");

const keys=Object.keys(a);
console.log(a['린']);
for(const key of keys){
    console.log(key);
    if(key=="로라스")
        continue;
    if(key=="null")
        continue;
    if(a[key]['회복킷']==null){
        a[key]['회복킷']=[]
    }
    if(a[key]['가속킷']==null){
        a[key]['가속킷']=[]
    }
    if(a[key]['공격킷']==null){
        a[key]['공격킷']=[]
    }
    if(a[key]['방어킷']==null){
        a[key]['방어킷']=[]
    }
    for(let i=0;i<3;i++)
    a[key]['회복킷'].push(a['로라스']['회복킷'].pop());
    for(let i=0;i<2;i++)
    a[key]['가속킷'].push(a['로라스']['가속킷'].pop());
    for(let i=0;i<4;i++)
    a[key]['공격킷'].push(a['로라스']['공격킷'].pop());
    for(let i=0;i<5;i++)
    a[key]['방어킷'].push(a['로라스']['방어킷'].pop());
   
}

fs.writeFileSync('./aa.json',JSON.stringify(a));