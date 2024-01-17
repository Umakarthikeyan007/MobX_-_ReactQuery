import { action, makeObservable, observable} from "mobx";

type Task = {
   id:string,
   task:string,
   isCompleted:boolean
}

export class TodoStore{
  tasklist :Task[] = [];

  constructor(){
    makeObservable(this,{
      tasklist:observable, 
      addTask:action,
      deleteTask:action,
      setStatus:action
    })
  }

  findIdIndex =(id:string) :number=>{
    return this.tasklist.findIndex((obj)=>obj.id === id);
  }

  addTask = (task:string) :void=>{
     const newTask:Task ={
        id:Math.random().toString(16).slice(2),
        task:task,
        isCompleted:false
     } 
     this.tasklist.push(newTask);
  }

  deleteTask = (id:string):void =>{
    this.tasklist.splice(this.findIdIndex(id),1);
  }

  setStatus = (task:Task):void =>{
    task.isCompleted = !task.isCompleted;
  }
  
}
export const todostore = new TodoStore();