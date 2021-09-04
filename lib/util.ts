
export function debouncing(fn:Function, delay:number) 
{ let timer; 
  return function(){ 
    clearTimeout(timer); 
    timer = setTimeout(()=>{ fn.apply(this); }, 
    delay); } 
}

