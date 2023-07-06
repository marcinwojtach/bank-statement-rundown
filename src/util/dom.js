export function isDomElement(element) { return element instanceof HTMLElement; }

const DOM = (function DOM() {
  const listen = (target, action, fallback) => target.addEventListener(action, fallback);

  const find = (el) => document.querySelector(el);

  const findAll = (el) => document.querySelectorAll(el);

  const toggleClass = (element, className, state = null) => {
    const toggle = (_state) => (_state ? element.classList.add(className) : element.classList.remove(className));

    if (state !== null) {
      toggle(state);
      return;
    }

    toggle(!DOM.isClassPresent(element, className));
  };

  const isClassPresent = (element, className) => element.classList.contains(className);

  const removeClass = (element, className) => element.classList.remove(className);

  const createElement = (tagName, classNames = null, attributes = {}, textContent = '') => {
    const el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }

    Object.keys(attributes).forEach((attrName) => {
      el[attrName] = attributes[attrName];
    });

    el.textContent = textContent;

    return el;
  };

  const addCss = (element, styles) => {
    Object.entries(styles).forEach(([property, value]) => {
      element.style[property] = value;
    });
  };

  const documentFragment = () => document.createDocumentFragment();

  return {
    listen,
    find,
    findAll,
    toggleClass,
    isClassPresent,
    removeClass,
    createElement,
    addCss,
    documentFragment
  };
})();

export function button({ text, html }, classNames, attributes, listener) {
  const button = DOM.createElement('button', classNames, attributes, text);
  button.addEventListener('click', listener);

  if (html) {
    button.innerHTML = html;;
  }

  function render() {
    return button;
  }
  
  return { render };
}

export default DOM;
