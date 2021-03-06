import React from 'react';
import { render } from 'react-dom';
import {
  toSnakeCase,
  parseAttribute
} from './utils';

import Component from '~brick/index.js';

class InitBrick extends HTMLElement {

  init() {
    const props = Array.from(this.attributes).reduce((accumulator, attribute) => {  
      const { name, value } = parseAttribute(attribute.name, attribute.value);
      accumulator[name] = value;
      return accumulator;
    }, {});

    props.children = this.innerHTML;
    if (!this.shadow) {
      this.shadow = this.attachShadow({
        mode: 'open'
      });
    }

    render(React.createElement(Component, props), this.shadow);     
    this.shadow.querySelectorAll('style').forEach(oldStyle => {
      oldStyle.parentNode.removeChild(oldStyle);
    });    

    document.querySelectorAll('style[data-for="' + this.tagName.toLowerCase() + '"]').forEach(style => {      
      let shadowStyle = document.createElement( 'style' )
      shadowStyle.innerHTML = style.innerText;
      this.shadow.appendChild(shadowStyle);
    });    
  }

  static get observedAttributes() {
    return Component.propTypes ? Object.keys(Component.propTypes).map(toSnakeCase) : [];
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