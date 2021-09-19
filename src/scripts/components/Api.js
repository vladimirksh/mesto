export default class Api {
  constructor(options){
    this._url = options.url;
    this._headers = options.headers;
  }
//метод показа ошибки
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }
//запрашиваем карточки
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
        method: 'GET',
        headers: this._headers,
      })
      .then(this._getResponse);
  }
//обновляю на сервере данные name и about
  patchUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._getResponse)
  }
//получаю с сервера данные name и about
  getUserData() {
    return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: this._headers,
      })
      .then(this._getResponse);
  }
//отправляю карточку на сервер
  postCard(data) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(this._getResponse);
  }
//добавляю лайк карточке
  putLike(cardID) {
    return fetch(`${this._url}/cards/likes/${cardID}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._getResponse);
  }
//удаляю лайк карточке
  deleteLike(cardID) {
    return fetch(`${this._url}/cards/likes/${cardID}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._getResponse);
  }
//удаление карточки с сервера
  deleteCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._getResponse);
  }
//обновление аватарки
patchAvatar(data) {
  return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data
      })
    })
    .then(this._getResponse);
}
}

