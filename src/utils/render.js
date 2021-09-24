import Abstract from '../view/abstract.js';

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const render = (container, element, place) => {
<<<<<<< HEAD

=======
>>>>>>> 051a8c2
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

<<<<<<< HEAD

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

=======
const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
>>>>>>> 051a8c2
  return newElement.firstChild;
};

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
<<<<<<< HEAD
=======

>>>>>>> 051a8c2
  const parent = oldElement.parentElement;
  if (parent === 0) {
    throw new Error('No parent Element');
  }
<<<<<<< HEAD
=======

>>>>>>> 051a8c2
  parent.replaceChild(newElement, oldElement);
};

const removeComponent = (component) => {

  if (!(component instanceof Abstract)) {
    throw new Error(`remove method. Can't remove component: ${component}`);
  }
  component.getElement().remove();
  component.removeElement();
};
export { RenderPosition, createElement, render, removeComponent, replace };
