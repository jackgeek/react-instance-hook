import { useState, useMemo } from "react";

export default function useInstance(initialInstanceState) {
  const [{ instance }, updateInstance] = useState(() => ({
    instance:
      typeof initialInstanceState === "function"
        ? initialInstanceState()
        : initialInstanceState
  }));
  return useMemo(() => [
    instance,
    function update() {
      updateInstance({ instance });
    }
  ]);
}
