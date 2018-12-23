# react-instance-hook

[![Build Status](https://travis-ci.com/jackgeek/react-instance-hook.svg?branch=master)](https://travis-ci.com/jackgeek/react-instance-hook)

## A React Hook that provides a simple way to avoid out-of-date state values in memoized functions

Provides an object that can be used to store instance variables.

## Usage

```javascript
import useInstance from "react-instance-hook";

// ...
const [instance: Object, updateInstance: Function] = useInstance(initialInstanceState: Object);
// OR
const [instance: Object, updateInstance: Function] = useInstance(() => Object);
```

## Why use this?

When using useMemo or useCallback the state values from useState are captured
and therefore could be out of date.

For example

```javascript
function MyComponent() {
  const [value, setValue] = useState(2);
  const double = useCallback(() => setValue(value * 2), []);
  return <Widget value={value} setValue={setValue} double={double} />;
}
```

The above memoizes the double callback using the useCallback hook to avoid
causing the Widget to re-render every time MyComponent rerenders.
But there is a bug in this code!
When Widget calls double it will always return 4. This is because the initial
value of 2 is captured in the closure passed to useCallback.

To workaround this problem we can create an instance object and as the object
reference is captured the problem goes away:

```javascript
function MyComponent() {
  const [{ instance }] = useState({ instance: { value: 2 } });
  const double = useCallback(() => (instance.value = instance.value * 2), []);
  return <Widget value={instance.value} setValue={setValue} double={double} />;
}
```

But wait! This also has a bug. The widget does not receive the doubled value.
This is because no state has changed and so the component does not rerender.  
useInstance provides a function you can call to force an update to occur.

```javascript
function MyComponent() {
  const [instance, update] = useInstance(2);
  const double = useCallback(() => update((instance.value *= 2)), []);
  return <Widget value={instance.value} setValue={setValue} double={double} />;
}
```

Note that the update call does nothing with the value passed to it. The
following would be equivalent:

```javascript
const double = useCallback(() => {
  instance.value *= 2;
  update();
}, []);
```

## Caution

I have been playing with hooks in anger only a short time. This could well
be an anti-pattern! Use your judgement and please do read the source code in
index.js to understand how it works.
