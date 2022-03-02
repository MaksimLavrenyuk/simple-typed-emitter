interface Listener<Payload> {
    (payload?: Payload): void
}

// TODO: change type
/* eslint-disable @typescript-eslint/no-explicit-any */
export type EventsMap = Record<string, Listener<any>[]>;

export default class EventEmitter<Listeners extends EventsMap> {
    protected listeners: Listeners | null;

    constructor() {
        this.listeners = null;
    }

    private getListenerHandle<Event extends keyof Listeners>(
        event: Event,
        listener: Listeners[Event][number],
    ) {
        if (this.listeners) {
            for (let i = 0; i < this.listeners[event].length; i++) {
                if (this.listeners[event][i] === listener) {
                    return {
                        deregister: () => {
                            if (this.listeners) this.listeners[event].splice(i, 1);
                        },
                    };
                }
            }
        }

        return undefined;
    }

    public registerListener<Event extends keyof Listeners>(event: Event, listener: Listeners[Event][number]) {
        if (this.listeners !== null) {
            if (this.listeners[event]) {
                this.listeners[event].push(listener);
            } else {
                // TODO: get rid of it, because it violates typing
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.listeners[event] = [listener];
            }
        } else {
            this.listeners = {
                [event]: [listener],
            } as Listeners; // TODO: get rid of it, because it violates typing
        }

        return {
            deregister: () => {
                if (this.listeners && this.listeners[event]) {
                    for (let i = 0; i < this.listeners[event].length; i++) {
                        if (this.listeners[event][i] === listener) {
                            this.listeners[event].splice(i, 1);
                            break;
                        }
                    }
                }
            },
        };
    }

    public deregisterListener<Event extends keyof Listeners>(
        event: Event,
        listener: Listeners[Event][number],
    ) {
        const handle = this.getListenerHandle(event, listener);

        if (handle) {
            handle.deregister();
            return true;
        }
        return false;
    }

    public emit<Event extends keyof Listeners>(
        event: Event,
        payload?: Parameters<Listeners[Event][number]>[number],
    ) {
        const { listeners } = this;

        if (listeners) {
            Object.keys(listeners).forEach((ev) => {
                if (ev === event && listeners[event]) {
                    listeners[event].forEach((listener) => {
                        listener(payload);
                    });
                }
            });
        }
    }
}
