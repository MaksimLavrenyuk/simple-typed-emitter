interface Listener<Payload> {
    (payload?: Payload): void;
}
export declare type EventsMap = Record<string, Listener<any>[]>;
declare type HandleDeregister = {
    deregister: () => boolean;
};
export default class EventEmitter<Listeners extends EventsMap> {
    protected listeners: Listeners | null;
    constructor();
    private getListenerHandle;
    /**
     * Register an event listener.
     * @param event
     * @param listener
     *
     * @return HandleDeregister
     */
    registerListener<Event extends keyof Listeners>(event: Event, listener: Listeners[Event][number]): HandleDeregister;
    /**
     * Remove the listener from the registered.
     * @param event
     * @param listener
     *
     * @return boolean - Flag of Successful Cancellation.
     */
    deregisterListener<Event extends keyof Listeners>(event: Event, listener: Listeners[Event][number]): boolean;
    /**
     * To emit an event.
     * @param event
     * @param payload - Together with the event it is possible to transfer the payload.
     */
    emit<Event extends keyof Listeners>(event: Event, payload?: Parameters<Listeners[Event][number]>[number]): void;
}
export {};
