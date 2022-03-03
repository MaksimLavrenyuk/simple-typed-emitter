# simple-typed-emitter

Simple, typed, event emitter.

## Install

if you use the npm
```
npm install simple-typed-emitter //npm

yarn add simple-typed-emitter // yarn
```

## Usage

```typescript
import EventEmitter from 'simple-typed-emitter';

type Events = {
    changeValue: ((value: string) => void)[],
};

const eventEmitter = new EventEmitter<Events>();

function listener(value: string) {
    console.log(value);
}

/**
 * We register the event listener.
 * Additionally, we save the handler, later we can use it to unregister.
 */
const changeValueHandle = eventEmitter.registerListener('changeValue', listener);

// Emitting an event
eventEmitter.emit('changeValue', 'ping');

// Cancel listener registration
changeValueHandle.deregister();
// or
const wasDeregister = eventEmitter.deregisterListener('changeValue', listener);
```

## License
[MIT](https://github.com/MaksimLavrenyuk/simple-typed-emitter/blob/main/LICENSE)
