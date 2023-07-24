import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    function pressEsc(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
    document.addEventListener("keydown", pressEsc);
    return () => {
      document.removeEventListener("keydown", pressEsc);
    };
  }, [key, action]);
}
