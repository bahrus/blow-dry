export class BlowDry extends HTMLElement {
    #removeInner = '[itemprop]:not([itemscope])';
    get removeInner() {
        return this.#removeInner;
    }
    #removeOuter = 'tbody>tr:not([aria-index="0"])';
    get removeOuter() {
        return this.#removeOuter;
    }
    #canonicalTemplate;
    get canonicalTemplate() {
        return this.#canonicalTemplate;
    }
    // #instantiate = 'template[data-load-when-ready]';
    // get instantiate(){
    //     return this.#instantiate;
    // }
    #blowDryToHeadSelector = 'template[onload="blow-dry-to-head"]';
    get blowDryToHeadSelector() {
        return this.#blowDryToHeadSelector;
    }
    doCleanup(clone) {
        const removeInner = this.getAttribute('remove-inner') || this.removeInner;
        clone.querySelectorAll(removeInner).forEach(nd => {
            nd.innerHTML = '';
        });
        const removeOuter = this.getAttribute('remove-outer') || this.removeOuter;
        clone.querySelectorAll(removeOuter).forEach(nd => {
            nd.remove();
        });
        clone.querySelector(this.localName)?.remove();
    }
    // expandTemplatesWithinScope(node: DocumentFragment, del=false){
    //     const templSelector = this.getAttribute('instantiate') || this.instantiate;
    //     const templs = Array.from(node.querySelectorAll(templSelector)) as Array<HTMLTemplateElement>;
    //     for(const templ of templs){
    //         const clonedTempl = templ.content.cloneNode(true);
    //         node.appendChild(clonedTempl);
    //         if(del) templ.remove();
    //     }
    // }
    blowDryToHead(node) {
        const templs = Array.from(node.querySelectorAll(this.blowDryToHeadSelector));
        const { head } = document;
        for (const templ of templs) {
            const clonedTempl = templ.content.cloneNode(true);
            const children = Array.from(clonedTempl.children);
            for (const child of children) {
                if (child instanceof HTMLScriptElement) {
                    const scriptEl = document.createElement('script');
                    scriptEl.type = child.type;
                    scriptEl.innerHTML = child.innerHTML;
                    //scriptEl.src = child.src;
                    head.appendChild(scriptEl);
                }
                else {
                    head.appendChild(child);
                }
            }
            templ.remove();
        }
    }
    connectedCallback() {
        const rn = this.parentElement || this.getRootNode();
        if (!rn)
            throw 404;
        const templ = document.createElement('template');
        templ.innerHTML = rn.innerHTML;
        //const clone = rn.cloneNode(true) as DocumentFragment;
        this.doCleanup(templ.content);
        this.blowDryToHead(templ.content);
        // this.expandTemplatesWithinScope(templ.content, true);
        this.#canonicalTemplate = templ;
        // this.expandTemplatesWithinScope(rn as DocumentFragment);
        this.resolved = true;
        this.dispatchEvent(new Event('resolved'));
    }
}
if (!customElements.get('blow-dry')) {
    customElements.define('blow-dry', BlowDry);
}
