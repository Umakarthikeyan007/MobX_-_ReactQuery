import { action, makeObservable, observable } from "mobx";

export class CounterStore{
  count:number = 0;

  constructor(){
    makeObservable(this,{
        count:observable,
        incBy1:action,
        incBy10:action,
        decBy1:action,
        decBy10:action,
        incByValue:action,
        reset:action,
    })
  }

  incBy1 =(count:number):number =>{
     return count+1;
  }
  incBy10 =(count:number):number =>{
    return count+10;
 }
 decBy1 =(count:number):number =>{
    return count-1;
 }
 decBy10 =(count:number):number =>{
    return count-10;
 }
 incByValue =(count:number,value:number):number =>{
    if(value >=0){
        return count+value;
    }
     return count;  
 }
 decByValue =(count:number,value:number):number =>{
    if(value >=0){
        return count-value;
    }
     return count;  
 }
 reset =():number =>{
    return 0;
 }
}
export const counterstore = new CounterStore();