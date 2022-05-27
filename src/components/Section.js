export class Section {
  constructor(renderer, cardsContainerSelector) {
    this._renderer = renderer;
    this._cardsContainer = document.querySelector(cardsContainerSelector);
  }

  setItems(items) {
    this._items = items;
  }

  renderCards() {
    this._cardsContainer.innerHTML = '';
    this._cardsContainer.append(
      ...this._items.map(item => {
      return this._renderer(item);
      })
    );
  }

  addItem(domElement) {
    this._cardsContainer
      .prepend(domElement);
  }
}
