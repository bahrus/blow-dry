# blow-dry

[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/blow-dry?style=for-the-badge)](https://bundlephobia.com/result?p=blow-dry)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/blow-dry?compression=gzip">
[![NPM version](https://badge.fury.io/js/blow-dry.png)](http://badge.fury.io/js/blow-dry)

Turn some (server) expanded HTML into the smallest, optimized HTML representation so it can be rapidly cloned (via web components, for example) on the client.

This allows a server rendered web component to serve also as a template for the definition of the web component, without having to package that separately.

```html
<my-ssr-web-component>
    <template shadowrootmode=open>
        <span itemprop>some dynamic data</span>
        <table>
            <thead>
            </thead>
            <tbody>
            </tbody>
        </table>
        <template onload=blow-dry-to-head>
            <script>
                import 'be-bound/be-bound.js';
            </script>
            <link rel=stylesheet href=https://fonts.googleapis.com/css?family=Indie+Flower>
        </template>
        <blow-dry></blow-dry>
    </template>
</my-ssr-web-component>
```

Users can customize what adjustments are made to the ssr rendered web component by a combination of:

1.  Setting attributes "remove-inner", "remove-outer".
2.  Extend this web component, and override getters removeInner, removeOuter, for starters.

The "cleansed" template can be obtained via oBlowDryInstance.canonicalTemplate.

If the component hasn't loaded yet, can listen for event "resolved" to be fired, and then pull in the template.


## Viewing Demos Locally

Any web server that can serve static files will do, but...

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.js.
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:3030/demo/ in a modern browser.

## Running Tests

```
> npm run test
```

## Using from ESM Module:

```JavaScript
import 'blow-dry/blow-dry.js';
```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/blow-dry';
</script>
```

