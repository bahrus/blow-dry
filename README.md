# blow-dry

Turn some expanded HTML into the smallest, optimized HTML representation so it can be rapidly cloned (via web components, for example).

This allows a server rendered web component to serve also as a template for a web component.

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
        <template data-load-when-ready>
            <be-hive></be-hive>
        <template>
        <blow-dry></blow-dry>
    </template>
</my-ssr-web-component>
```

Users can customize what adjustments are made to the ssr rendered web component by a combination of:

1.  Setting attributes "remove-inner", "remove-outer".
2.  Extend this web component, and override methods removeInner, removeOuter.

The "cleansed" template can be obtained via oBlowDryInstance.canonicalTemplate.

If the component hasn't loaded yet, can listen for event "resolved" to be fired, and then pull in the template.