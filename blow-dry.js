export class BlowDry extends HTMLElement {
    #removeInner = '[itemprop]:not([itemscope]]';
    get removeInner() {
        return this.#removeInner;
    }
    #removeOuter = 'tbody>tr:not([aria-index="0"])';
    get removeOuter() {
        return this.#removeOuter;
    }
    #clonedRootNode;
    get clonedRootNode() {
        return this.#clonedRootNode;
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
        this.expandTemplates(clone);
    }
    expandTemplates(node) {
        const templSelector = this.getAttribute('instantiate') || this.instantiate;
        const templs = Array.from(document.querySelectorAll(templSelector));
        for (const templ of templs) {
            const clonedTempl = templ.content.cloneNode(true);
            node.appendChild(clonedTempl);
        }
    }
    connectedCallback() {
        const rn = this.getRootNode();
        if (!(rn instanceof ShadowRoot))
            throw 'NI';
        const clone = rn.cloneNode(true);
        this.doCleanup(clone);
        this.#clonedRootNode = clone;
        this.expandTemplates(rn);
    }
}
if (!customElements.get('blow-dry')) {
    customElements.define('blow-dry', BlowDry);
}
