# react-brick

Bundle your components as standalone widgets!

## Demo

http://react-brick.surge.sh/

If all goes well, you should see 2 (clickable) buttons and an image that loads after 1 second.

## Status

This is a proof of concept and as such is not meant for serious usage!

## How to use

1. Create your component like a normal React component and save it as

```
examples/bricks/YourComponentName/index.js
```

2. Build the dll bundle

```
yarn run build:dll
```

3. Build your brick

```
set BRICK=YourComponentName && yarn run build:brick
```

> Temp solution because `yarn run build:brick YourComponentName` passes the last word as another `webpack` entry point :( Might need to alter this command on UNIX platforms. I'm a Windows guy ;)

4. Done!

Your brick is now built in the `dist` folder. 

To test it, run the folder via a http server and make sure to add the JavaScript bundle and target element to your HTML.

### Developing locally

When developing it's useful to run webpack in watch mode and serve the app. Start one terminal window with:

```bash
set BRICK=MyButton && yarn run watch
```

and server the app in another:

```bash
yarn start
```

### Why ...

#### `my-button` and not `Button` or `MyButton`?

Using custom components, according to the spec:

> The name of a custom element must contain a dash (-). So &lt;x-tags&gt;, &lt;my-element&gt;, and &lt;my-awesome-app&gt; are all valid names, while &lt;tabs&gt; and &lt;foo_bar&gt; are not. This requirement is so the HTML parser can distinguish custom elements from regular elements. It also ensures forward compatibility when new tags are added to HTML.

> Custom elements cannot be self-closing because HTML only allows a few elements to be self-closing. Always write a closing tag (&lt;app-drawer&gt;&lt;/app-drawer&gt;).

#### `on-click` not `onClick`, `class-name` not `class`?

The component attributes are passed to React component. React uses [specific names for HTML attributes](https://reactjs.org/docs/dom-elements.html).

#### `data-for` on style?

The `data-for` is currently used to make sure the style is pulled into the shadow DOM and applied to the component.

#### My function passed as prop does not work.

Right now only `on-` attributes are evaluated as functions. Also, make sure to actually pass a function, like you would do with React components:

```html
// GOOD:
<my-button on-click="(e) => alert(e.target.innerHTML)">

// BAD
<my-button on-click="alert(this.innerHTML)">
```

#### Do I have to declare `propTypes`?

Only if you want your components to react to attribute changes.

#### What's the browser support?

I've added a polyfill for WebComponents support in Edge. There's also a small adapter that makes the babel-transpiled classes work as components registration.

#### I've tried to pass the function but it breaks my component in Internet Explorer (IE 11)

This is because IE lacks the support for arrow function. You can get around that by passing a normal function. Please note the extra set of parenthesis.

```html
// GOOD:
<my-button on-click="(function (e) { alert(e.target.innerHTML); })">
```