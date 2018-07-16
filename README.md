## react-brick

Bundle your components as standalone widgets!

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

#### `MyButton` and not `Button`?

Can't reuse HTML tag names. Also, `Image` will render just fine in browser (at least Chrome) so can't do that.

#### My function passed as prop does not work.

Right now only `on*` props are evaluated as functions