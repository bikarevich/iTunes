'use strict';

let eventListeners = new WeakMap();

class EventListenerComponent {
    constructor() {
    }

    addListener(elem, event, func, ctx) {
        if (!eventListeners.get(elem)) {
            eventListeners.set(elem, {});
        }

        if (!(event in eventListeners.get(elem))) {
            eventListeners.get(elem)[event] = [];
        }

        eventListeners.get(elem)[event].push({
            func: func,
            ctx: ctx,
            binded: func.bind(ctx)
        });
        elem.addEventListener(event, eventListeners.get(elem)[event][0].binded, false);
    }

    removeListener(elem, event) {
        elem.removeEventListener(event, eventListeners.get(elem)[event][0].binded);
        eventListeners.get(elem)[event] = [];
    }
}

export {EventListenerComponent};