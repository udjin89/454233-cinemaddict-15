import Abstract from '../view/abstract.js';

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};
// node.append(...nodes or strings) – добавляет узлы или строки в конец node,
// node.prepend(...nodes or strings) – вставляет узлы или строки в начало node,
// node.before(...nodes or strings) –- вставляет узлы или строки до node,
// node.after(...nodes or strings) –- вставляет узлы или строки после node,
// node.replaceWith(...nodes or strings) –- заменяет node заданными узлами или строками.
//------------------------------------------------------
//+++++++++++++++ render ++++++++++++++++++++++++
//------------------------------------------------------
//container - куда будем вставлять, element - то что вставляем, place - место в container, куда вставляем
const render = (container, element, place) => {
  // console.log("go render->");
  // console.log(element);
  if (container instanceof Abstract) {
    container = container.getElement();
  }
  if (element instanceof Abstract) {
    element = element.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN: container.prepend(element);
      break;
    case RenderPosition.BEFOREEND: container.append(element);
      break;
  }
};
//------------------------------------------------------
// Принцип работы прост:
// 1. создаём пустой div-блок
// 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
// 3. возвращаем этот DOM-элемент
const createElement = (template) => { // принимает разметку
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template; // 2
  // console.log(newElement);
  return newElement.firstChild; // 3
};
// Единственный нюанс, что HTML в строке должен иметь общую обёртку,
// то есть быть чем-то вроде <nav><a>Link 1</a><a>Link 2</a></nav>,
// а не просто <a>Link 1</a><a>Link 2</a>

//------------------------------------------------------
//+++++++++++++++ REPLACE ++++++++++++++++++++++++
//------------------------------------------------------
const replace = (newElement, oldElement) => {
  if (newElement === null || oldElement === null) {
    throw new Error('No element to replace');
  }
  if (oldElement instanceof Abstract) {
    oldElement = oldElement.getElement();
  }
  if (newElement instanceof Abstract) {
    newElement = newElement.getElement();
  }
  //Свойство Node.parentElement только для чтения, возвращает родителя узла DOM Element
  const parent = oldElement.parentElement;
  if (parent === 0) {
    throw new Error('No parent Element');
  }
  // стандартный метод
  parent.replaceChild(newElement, oldElement);
};
//------------------------------------------------------
//+++++++++++++++ REMOVE ++++++++++++++++++++++++
//------------------------------------------------------
const removeComponent = (component) => {

  if (!(component instanceof Abstract)) {
    throw new Error(`remove method. Can't remove component: ${component}`);
  }
  component.getElement().remove(); // Как работает ? Почему удаляет из DOM ?
  component.removeElement();
};
export { RenderPosition, createElement, render, removeComponent, replace };
