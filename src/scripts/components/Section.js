export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);//вызываю функцию которую описал в index.js
    })}
  
  //принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this._container.prepend(element);
  }
}