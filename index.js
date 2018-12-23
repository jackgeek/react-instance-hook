import { useReducer, useMemo } from "react";

export default function useInstance(initialInstanceState) {
  const [{ instance }, dispatch] = useReducer(
    instanceReducer,
    undefined,
    initialInstanceState || {}
  );
  return useMemo(() => [
    instance,
    function update() {
      dispatch();
    }
  ]);
}

function instanceReducer(state, initialInstanceState) {
  if (!initialInstanceState) {
    // create a new reference
    return {
      instance: state.instance
    };
  }
  // return initial state
  return {
    instance:
      typeof initialInstanceState === "function"
        ? initialInstanceState()
        : initialInstanceState
  };
}
