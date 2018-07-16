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


Array.from(document.querySelectorAll(brickName)).map(target => {
  const props = Array.from(target.attributes).reduce((accumulator, attribute) => {  
    const { name, value } = parseAttribute(attribute.name, attribute.value);
    accumulator[name] = value;
    return accumulator;
  }, {});
  props.children = target.innerHTML;
  render(React.createElement(Component, props), target);
});