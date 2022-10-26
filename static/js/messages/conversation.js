import { fetchApi } from "../functions.js";
import {csrftoken as token} from "./token.js"
export default class Conversation{
    constructor(currentUserId,otherUserId, messages){
        this._userId = currentUserId;
        this._otherUserId = otherUserId;
        this._messages = messages;
        this.currentMessages = document.getElementsByClassName('currentMessages')[0];
        this.MESSAGE_CLASS = "messageBig";
        this.infoDiv = document.getElementsByClassName('info')[0];
        this.h4 = document.querySelector(".commonTasks h4");
        this.currentMessages.scrollTop = this.currentMessages.scrollHeight;
    }
    get otherUserId(){
        return this._otherUserId
    }
    get messages(){
        return this._messages;
    }
    handleFriendRequest = () => {
        const requestButton = document.querySelector(".currentMessages .btn-accept");
        if(requestButton === null)
            return;
        requestButton.addEventListener('click', async () => {
            const id = Number(requestButton.id[requestButton.id.length - 1]);
            const urlUpdate = `http://127.0.0.1:8000/task_api/update_app_user/${this._userId}`;
            const urlDetail = `http://127.0.0.1:8000/task_api/app_user_detail/${this._userId}`;
            const appUser = await fetchApi(urlDetail);
            appUser.friends.push(id);
            console.log(JSON.stringify({friends: appUser.friends}))
            const options = {
				method:'POST',
				headers:{
					'Content-type':'application/json',
					'X-CSRFToken':token,
				},
				body:JSON.stringify({friends: appUser.friends})
			};
            const send = await fetch(urlUpdate, options);
        })
    }
    messageDiv = (message, cssClass) =>{
        return `<div class="${this.MESSAGE_CLASS} ${cssClass}">
    ${message.content}
</div>`
    }
    disableButtons = () =>{
        const buttons = document.querySelectorAll("currentMessages button");
        for(let btn of buttons){
            btn.disabled = true;
        }
    }
    fillInfoDiv = (user) =>{
        this.infoDiv.innerHTML = `<img src="static/img${user.profile_pic}" alt="" class="profileImg">
${user.username}`
    }
    createConversationDiv = () =>{
        this.currentMessages.innerHTML = '';
        let css_class = null;
        this.messages.forEach(message => {
            css_class = "fromYou";
            if(message.sender === this.otherUserId)
                css_class = "toYou";
            
            this.currentMessages.innerHTML += this.messageDiv(message, 
                css_class);
        });
    }
    setMessages = () => {
        this._messages = this._messages.filter(message => {
            return (message.sender === this.otherUserId ||
                message.reciever === this.otherUserId)
        })
    }
    displayUserInfo = (currentFriendId, users) =>{      
        const currentUser = users.find
            (user => user.user === currentFriendId);     
        this.fillInfoDiv(currentUser);
        this.h4.innerHTML = `Tasks for You and ${currentUser.username}`;
    }
}
