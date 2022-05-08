import * as localStorage from "local-storage";
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

const defaults = {
  reduceMotion: false,
};

type Store = typeof defaults;

const LocalStoreContext = createContext<
  [Store, Dispatch<SetStateAction<Store>>?]
>([defaults, undefined]);

export const useLocalStorage = () => {
  const [state, setState] = useContext(LocalStoreContext);

  return function <K extends keyof Store>(key: K, value?: Store[K]): Store[K] {
    if (arguments.length === 1) {
      return (
        (typeof window !== "undefined" &&
          (localStorage.get(key) as Store[K])) ??
        state[key]
      );
    }

    if (arguments.length === 2) {
      if (typeof window !== "undefined") localStorage.set(key, value);
      setState?.((state) => ({ ...state, [key]: value }));
      return value!;
    }

    throw new Error("Invalid arguments");
  };
};

export const LocalStorageProvider = ({ children }: PropsWithChildren<{}>) => {
  const context = useState(defaults);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load from local storage if window is available (i.e. not SSR)
      const [, setState] = context;
      setState(
        Object.fromEntries(
          Object.keys(defaults).map((key) => [key, localStorage.get(key)])
        ) as Store
      );
    }
  }, []);

  return (
    <LocalStoreContext.Provider value={context}>
      {children}
    </LocalStoreContext.Provider>
  );
};
