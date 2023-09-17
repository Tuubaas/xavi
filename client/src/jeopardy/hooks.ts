import { useEffect } from "react";

export const useKeyPress = (keyCode: string, callback: () => void) => {
  useEffect(() => {
    function onKeyup(e: KeyboardEvent) {
      if (e.key === keyCode) {
        callback();
      }
    }
    window.addEventListener("keyup", onKeyup);
    return () => window.removeEventListener("keyup", onKeyup);
  }, [keyCode, callback]);
};
