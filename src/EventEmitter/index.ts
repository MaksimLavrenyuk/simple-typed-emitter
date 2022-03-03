interface Listener<Payload> {
    (payload?: Payload): void
}

// TODO: change type
/* eslint-disable @typescript-eslint/no-explicit-any */
export type EventsMap = Record<string, Listener<any>[]>;

type HandleDeregister = {
    deregister:() => boolean
};

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
                            if (this.listeners) {
                                this.listeners[event].splice(i, 1);
                                return true;
                            }

                            return false;
                        },
                    };
                }
            }
        }

        return undefined;
    }

    /**
     * Register an event listener.
     * @param event
     * @param listener
     *
     * @return HandleDeregister
     */
    public registerListener<Event extends keyof Listeners>(
        event: Event,
        listener: Listeners[Event][number],
    ): HandleDeregister {
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
                            return true;
                        }
                    }
                }

                return false;
            },
        };
    }

    /**
     * Remove the listener from the registered.
     * @param event
     * @param listener
     *
     * @return boolean - Flag of Successful Cancellation.
     */
    public deregisterListener<Event extends keyof Listeners>(
        event: Event,
        listener: Listeners[Event][number],
    ) {
        const handle = this.getListenerHandle(event, listener);

        if (handle) {
            return handle.deregister();
        }
        return false;
    }

    /**
     * To emit an event.
     * @param event
     * @param payload - Together with the event it is possible to transfer the payload.
     */
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
