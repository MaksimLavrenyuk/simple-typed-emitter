interface Listener<Payload> {
    (payload?: Payload): void;
}
export declare type EventsMap = Record<string, Listener<any>[]>;
export default class EventEmitter<Listeners extends EventsMap> {
    protected listeners: Listeners | null;
    constructor();
    private getListenerHandle;
    registerListener<Event extends keyof Listeners>(event: Event, listener: Listeners[Event][number]): {
        deregister: () => void;
    };
    deregisterListener<Event extends keyof Listeners>(event: Event, listener: Listeners[Event][number]): boolean;
    emit<Event extends keyof Listeners>(event: Event, payload?: Parameters<Listeners[Event][number]>[number]): void;
}
export {};
