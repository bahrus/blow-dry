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
    #instantiate = 'template[data-load-when-ready]';
    get instantiate() {
        return this.#instantiate;
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
    expandTemplates(node, del = false) {
        const templSelector = this.getAttribute('instantiate') || this.instantiate;
        const templs = Array.from(node.querySelectorAll(templSelector));
        for (const templ of templs) {
            const clonedTempl = templ.content.cloneNode(true);
            node.appendChild(clonedTempl);
            if (del)
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
        this.expandTemplates(templ.content, true);
        this.#canonicalTemplate = templ;
        this.expandTemplates(rn);
        this.resolved = true;
        this.dispatchEvent(new Event('resolved'));
    }
}
if (!customElements.get('blow-dry')) {
    customElements.define('blow-dry', BlowDry);
}
