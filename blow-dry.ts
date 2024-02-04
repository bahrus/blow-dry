import {BlowDryProps} from './types';
export class BlowDry extends HTMLElement{
    #removeInner = '[itemprop]:not([itemscope])';
    get removeInner(){
        return this.#removeInner;
    }

    #removeOuter = 'tbody>tr:not([aria-index="0"]),[blow-dry-remove]';
    get removeOuter(){
        return this.#removeOuter;
    }

    #canonicalTemplate: HTMLTemplateElement | undefined;
    get canonicalTemplate(){
        return this.#canonicalTemplate;
    }

    // #instantiate = 'template[data-load-when-ready]';
    // get instantiate(){
    //     return this.#instantiate;
    // }

    #blowDryToHeadSelector = 'template[onload="blow-dry-to-head"]';
    get blowDryToHeadSelector(){
        return this.#blowDryToHeadSelector;
    }

    #blowDrySelector = 'template[blow-dry],template[data-blow-dry]';
    get blowDrySelector(){
        return this.#blowDrySelector;
    }

    doCleanup(clone: DocumentFragment){
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

    blowDry(node: DocumentFragment){
        const templs = Array.from(node.querySelectorAll(this.blowDrySelector)) as Array<HTMLTemplateElement>;
        const head = document.head;
        let currentCnt = Number(head.dataset.blowDryCnt) || 0;
        for(const templ of templs){
            const id = 'blow-dry-src-' + currentCnt;
            const sourceTempl = document.createElement('template');
            sourceTempl.id = id;
            templ.dataset.blowDryTemplRef = id;
            sourceTempl.content.appendChild(templ.content);
            head.append(sourceTempl);
            currentCnt++;
        }
        head.dataset.blowDryCnt = currentCnt.toString();
    }
    blowDryToHead(node: DocumentFragment){
        const templs = Array.from(node.querySelectorAll(this.blowDryToHeadSelector)) as Array<HTMLTemplateElement>;
        const {head} = document;
        for(const templ of templs){
            const clonedTempl = templ.content.cloneNode(true) as DocumentFragment;
            const children = Array.from(clonedTempl.children); 
            for(const child of children){
                if(child instanceof HTMLScriptElement){
                    const scriptEl = document.createElement('script');
                    scriptEl.type = child.type;
                    scriptEl.innerHTML = child.innerHTML;
                    //scriptEl.src = child.src;
                    head.appendChild(scriptEl);
                }else{
                    head.appendChild(child);
                }
            }
            templ.remove();
        }
    }

    connectedCallback(){
        const rn = this.parentElement || this.getRootNode() as Element | ShadowRoot;
        if(!rn) throw 404;
        this.blowDryToHead(rn as DocumentFragment);
        this.blowDry(rn as DocumentFragment);
        const templ = document.createElement('template');
        templ.innerHTML = rn.innerHTML;
        //const clone = rn.cloneNode(true) as DocumentFragment;
        this.doCleanup(templ.content);
        // this.expandTemplatesWithinScope(templ.content, true);
        this.#canonicalTemplate = templ;
        // this.expandTemplatesWithinScope(rn as DocumentFragment);
        this.resolved = true;
        this.dispatchEvent(new Event('resolved'));
        
    }
}

export interface BlowDry extends BlowDryProps{}

if(!customElements.get('blow-dry')){
    customElements.define('blow-dry', BlowDry);
}