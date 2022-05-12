export class Section {
  constructor(
    {items, renderer},
    cardsContainerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._cardsContainer = document.querySelector(cardsContainerSelector);
  }
  renderCards() {
    this._cardsContainer.innerHTML = '';
    this._cardsContainer.append(...this._items.map(item => {
      return this._renderer(item);
      }));
  }
  addItem(domElement) {
    this._cardsContainer
      .prepend(domElement);
  }
}
