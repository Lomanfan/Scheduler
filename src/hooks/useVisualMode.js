import { useState } from 'react';

export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => { //default parameter
    setHistory(prev => replace ? [...prev.splice(0, prev.length - 1), newMode] : [...prev, newMode])
    console.log("Transition History", history);
  };

  const back = () => {
    if (history.length > 1) {    //history >=1;
      const newHistory = history.slice(0, history.length - 1);
      setHistory(() => [...newHistory]);
      // TODO//
    }
  };

  return { mode: history[history.length - 1], transition, back };
};