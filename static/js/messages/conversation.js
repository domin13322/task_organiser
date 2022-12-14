import AppUserApi from "../api/appUserApi.js";
import { displayMessage } from "../functions.js";
export default class Conversation{
    constructor(currentUserId,otherUserId, messages){
        this.api = new AppUserApi();
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
    friendRequestToYou = async (id) => {
        const appUser = await this.api.readDetail(this._userId);
        let popupMessage = "You have successfully added a new friend";
        if(appUser.friends.includes(id)){
            popupMessage = "You have already added this friend";
            displayMessage(popupMessage);
            return;
        }
        appUser.friends.push(id);
        this.api.update({friends: appUser.friends},this._userId);
        displayMessage(popupMessage);
        
    }
    friendRequestFromYou = () => {
        displayMessage("You sent the friend request so you cannot accept it");
    }
    handleFriendRequest = () => {
        const requestButton = document.querySelector(".currentMessages .btn-accept");
        if(requestButton === null)
            return;
        requestButton.addEventListener('click', async () => {
            const id = Number(requestButton.id.slice(10));

            id === this._userId ? this.friendRequestFromYou() : await this.friendRequestToYou(id);
        })
    }
    messageDiv = (message, cssClass) =>{
        return `<div class="${this.MESSAGE_CLASS} ${cssClass}">
    ${message.content}
</div>`
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