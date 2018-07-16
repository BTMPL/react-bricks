import React from 'react';
import { render } from 'react-dom';

import Component from '~brick/index.js';

const toCamelCase = function(str) {
  const find = /(\-\w)/g;
  const convert =  function(matches){
      return matches[1].toUpperCase();
  };  

  return str.replace(
    find,
    convert
  );
}

const toSnakeCase = function(str) {
  let name = str.substr(0, 1).toLowerCase() + str.substr(1);
  return name.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

const parseAttribute = function (name, value) {
  if (name === 'class') return {
    name: 'className',
    value
  };

  if (name.substr(0, 3) === 'on-') {
    return {
      name: toCamelCase(name),
      value: eval(value)
    }
  }
  return {
    name,
    value
  };
}

class InitBrick extends HTMLElement {

  init() {
    const props = Array.from(this.attributes).reduce((accumulator, attribute) => {  
      const { name, value } = parseAttribute(attribute.name, attribute.value);
      accumulator[name] = value;
      return accumulator;
    }, {});
    props.children = this.innerHTML;
    render(React.createElement(Component, props), this);     
  }

  static get observedAttributes() {
    /**
     * TODO: Need to create a map that both this and `parseAttribute` can use to track changes.
     */
    return Component.propTypes ? Object.keys(Component.propTypes) : [];
  }  

  connectedCallback() {    
    /**
     * Need to delay the execution for components that do have children in them.
     * Otherwise we might end up with the callback called before the children are rendered
     * and will not have any content in the component.
     */
    setTimeout(() => this.init());
  }

  attributeChangedCallback(attrName, oldValue, newVal) {
    this.init.call(this);
  }

};

window.customElements.define(toSnakeCase(brickName), InitBrick);