import { useLayoutEffect, useRef, useState } from "react";

export const useClientHeight = () => {
  const ref = useRef<HTMLElement>(null);
  const [clientHeight, setClientHeight] = useState(0);

  useLayoutEffect(() => {
    setClientHeight(ref.current?.clientHeight ?? 0);
  });

  return [ref, clientHeight] as const;
};
