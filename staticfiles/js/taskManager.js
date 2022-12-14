import Task from './task.js';
import DateManager from './dateManager.js';
export default class TaskManager{
    constructor(){
        this.dm = new DateManager();
    }
    createTaskArray = (length) =>{
        let tasks = [];
        const names = document.getElementsByClassName('name');
        const descriptions = document.getElementsByClassName('description');
        const deadlines = document.getElementsByClassName('deadline');  
        const dates = document.getElementsByClassName('date');
        const statuses = document.getElementsByClassName('status');
        const importancies = document.getElementsByClassName('importancy');
        const users = document.getElementsByClassName('users');
        let i;
        for(i=0; i<length; i++) {
            tasks.push(new Task(names[i].innerText, descriptions[i].innerText,
                statuses[i].innerText, 
                this.dm.stringToDate(deadlines[i].innerText), 
                this.dm.stringToDate(dates[i].innerText), 
                importancies[i].innerText,
                users[i].innerText.split(',')
            ));  
        }
        return tasks; 
    }
}