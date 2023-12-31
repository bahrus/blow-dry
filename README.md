# blow-dry

Turn some expanded HTML into the smallest, optimized HTML representation so it can be rapidly cloned (via web components, for example).

```html
<my-ssr-web-component>
    <template shadowrootmode=open>
        <span itemprop>some dynamic data</span>
        <table>
            <thead>
            </thead>
            <tbody>
        </table>
        <template data-load-when-ready>
            <be-hive></be-hive>
        <template>
        <blow-dry></blow-dry>
    </template>
</my-ssr-web-component>
```