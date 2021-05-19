import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setHistory((prev) =>
      replace
        ? [...prev.splice(0, prev.length - 1), newMode]
        : [...prev, newMode]
    );
  };

  const back = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, history.length - 1);
      setHistory(() => [...newHistory]);
    }
  };

  return { mode: history[history.length - 1], transition, back };
}
