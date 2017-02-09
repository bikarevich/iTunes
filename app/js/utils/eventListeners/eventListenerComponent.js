'use strict';

let eventListeners = new WeakMap();

class EventListenerComponent {
    constructor() {
        eventListeners.set(this, {});
    }

    addListener(elem, event, func, ctx) {
        let eventsList = eventListeners.get(this);
        if(!(elem in eventsList)) {
            eventsList[elem] = {};
        }
        if (!(event in eventsList[elem])) {
            eventsList[elem][event] = [];
        }
        eventsList[elem][event].push([func, ctx]);
        elem.addEventListener(event, func.bind(ctx), false);
    }

    removeListener(elem, event) {
        let eventsList = eventListeners.get(this);
        if (elem in eventsList) {
            let handlers = eventsList[elem];
            if (event in handlers) {
                let eventHandlers = handlers[event];
                for (let i = eventHandlers.length; i--;) {
                    let handler = eventHandlers[i];
                    console.log(handler[0]);
                    elem.removeEventListener(event, handler[0]);
                }
            }
        }
    }
}

export {EventListenerComponent};