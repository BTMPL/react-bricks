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
src/bricks/YourComponentName/index.js
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

To test it, ran the folder via a http server and make sure to add the JavaScript bundle and target element to your HTML.

### Why ...

#### `on-click` not `onClick`?

HTML attributes are all transformed to lower-case, React needs `camelCase`, this is a workaround.

#### `my-button` and not `Button` or `MyButton`?

Using custom components, according to the spec:

> The name of a custom element must contain a dash (-). So <x-tags>, <my-element>, and <my-awesome-app> are all valid names, while <tabs> and <foo_bar> are not. This requirement is so the HTML parser can distinguish custom elements from regular elements. It also ensures forward compatibility when new tags are added to HTML.

> Custom elements cannot be self-closing because HTML only allows a few elements to be self-closing. Always write a closing tag (<app-drawer></app-drawer>).

#### My function passed as prop does not work.

Right now only `on*` props are evaluated as functions

#### Do I have to declare `propTypes`?

Only if you want your components to react to attribute changes.