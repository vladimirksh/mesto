export default class  UserInfo{
constructor({userName, userJob}){
  this._nameElement = userName;
  this._jobElement = userJob;
}
getUserInfo() {
  return{
    userName: this._nameElement.textContent,
    userJob:  this._jobElement.textContent
  }
  
}
setUserInfo(data) {
  this._nameElement.textContent = data.name;
  this._jobElement.textContent = data.about;
}
}