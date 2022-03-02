import EventEmitter from './index';

describe('Observer', () => {
    it('Register listener.', () => {
        type Events = {
            change: ((payload: string) => void)[],
            cancel: (() => void)[]
        };

        const eventEmitter = new EventEmitter<Events>();
        const handle = {
            deregister: expect.any(Function),
        };

        function listenerChangeFirst(payload: string) {
            expect(payload).toBe('test');
        }
        function listenerChangeSecond(payload: string) {
            expect(payload).toBe('test');
        }
        function listenerCancelFirst(payload?: undefined) {
            expect(payload).toBeUndefined();
        }
        function listenerCancelSecond(payload?: undefined) {
            expect(payload).toBeUndefined();
        }

        const mockListenerChangeFirst = jest.fn(listenerChangeFirst);
        const mockListenerChangeSecond = jest.fn(listenerChangeSecond);
        const mockListenerCancelFirst = jest.fn(listenerCancelFirst);
        const mockListenerCancelSecond = jest.fn(listenerCancelSecond);

        expect(eventEmitter.registerListener('change', mockListenerChangeFirst)).toEqual(handle);
        expect(eventEmitter.registerListener('change', mockListenerChangeSecond)).toEqual(handle);
        expect(eventEmitter.registerListener('cancel', mockListenerCancelFirst)).toEqual(handle);
        expect(eventEmitter.registerListener('cancel', mockListenerCancelSecond)).toEqual(handle);

        eventEmitter.emit('change', 'test');
        eventEmitter.emit('cancel');

        expect(mockListenerChangeFirst).toHaveBeenCalled();
        expect(mockListenerChangeSecond).toHaveBeenCalled();
        expect(mockListenerCancelFirst).toHaveBeenCalled();
        expect(mockListenerCancelSecond).toHaveBeenCalled();
    });

    it('Deregister listener.', () => {
        type Events = {
            change: ((payload: string) => void)[]
        };
        const eventEmitter = new EventEmitter<Events>();
        const dummyHandle = {
            deregister: expect.any(Function),
        };

        function listener(payload: string) {
            expect(payload).toBe('test');
        }

        function dummyListener() {
            return undefined;
        }

        const mockListener = jest.fn(listener);
        const mockDummyListener = jest.fn(dummyListener);

        expect(eventEmitter.registerListener('change', mockListener)).toEqual(dummyHandle);

        eventEmitter.emit('change', 'test');

        expect(eventEmitter.deregisterListener('change', mockDummyListener)).toBeFalsy();
        expect(eventEmitter.deregisterListener('change', mockListener)).toBeTruthy();

        expect(mockListener).toHaveBeenCalled();
        expect(mockDummyListener).not.toHaveBeenCalled();
    });

    it('Deregister by handle.', () => {
        type Events = {
            change: ((payload: string) => void)[]
        };
        const observable = new EventEmitter<Events>();
        const testHandle = {
            deregister: expect.any(Function),
        };

        function listener(payload: string) {
            expect(payload).toBe('test');
        }

        const mockListener = jest.fn(listener);
        const handle = observable.registerListener('change', mockListener);

        expect(handle).toEqual(testHandle);

        handle.deregister();
        observable.emit('change', 'test');
        expect(mockListener).not.toHaveBeenCalled();
    });
});
