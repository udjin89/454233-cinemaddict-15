export default class AbstractObserver {
  constructor() {
    // тут хранятся колбеки, которые мы установим
    this._observers = new Set(); // класс???
    // Объект Set – это особый вид коллекции: «множество» значений (без ключей),
    // где каждое значение может появляться только один раз.
  }

  addObserver(observer) { //добавление наблюдателя и передача ему коллбека
    this._observers.add(observer);
  }

  removeObserver(observer) {
    this._observers.delete(observer);
  }

  _notify(event, payload) {
    // вызываем все установленные колбеки
    // сообщаем тип события и передаем данные
    // данные(payload) - за них отвечает модель
    this._observers.forEach((observer) => observer(event, payload));
  }
}
