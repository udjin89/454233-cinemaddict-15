import Abstract from "../view/abstract";

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

export { RenderPosition, createElement, render };
