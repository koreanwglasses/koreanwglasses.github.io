import { useLayoutEffect, useRef, useState } from "react";

export const useClientDims = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [clientDims, setClientDims] = useState({
    clientWidth: 0,
    clientHeight: 0,
  });

  useLayoutEffect(() => {
    if (ref.current) {
      setClientDims({
        clientHeight: ref.current.clientHeight,
        clientWidth: ref.current.clientWidth,
      });
    }
  }, [ref.current?.clientHeight, ref.current?.clientWidth]);

  return [ref, clientDims] as const;
};
