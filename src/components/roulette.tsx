import React, {
  Children,
  CSSProperties,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { useClientDims } from "../lib/use-client-dims";
import { Flex, FlexCol } from "./flex";

const TIMING_PARAM_A = 0.1;
const TIMING_PARAM_B = 0.1;
const INIT_DURATION = 1000;

function rotate<T>(arr: T[], n: number) {
  return [...arr.slice(n % arr.length), ...arr.slice(0, n % arr.length)];
}

function lnnr(n: number, m: number) {
  let r = n % m;
  if (r < 0) r += m;
  return r;
}

type AnimationState = "ready" | "start" | "active" | "end";
export const Roulette = ({
  children,
  height,
  target,
  onIdle: onIdle,
}: PropsWithChildren<{
  height: CSSProperties["height"];
  target: number;
  onIdle?: () => void;
}>) => {
  const childArray = Children.toArray(children);

  const [ref, { clientHeight, clientWidth }] = useClientDims();
  const [animState, setAnimState] = useState({
    state: "ready" as AnimationState,
    t: 0,
    offset: Math.ceil(0 - childArray.length / 2) + 1,
    duration: INIT_DURATION,
  });

  useEffect(() => {
    if (animState.state === "ready" && animState.t === target) {
      onIdle?.();
      return;
    } else if (animState.state === "ready" && animState.t !== target) {
      setAnimState((state) => ({
        ...state,
        t: state.t + Math.sign(target - state.t),
        duration: INIT_DURATION / Math.abs(target - state.t),
        state: "start",
      }));
    } else if (animState.state === "start") {
      setTimeout(
        () => setAnimState((state) => ({ ...state, state: "end" })),
        animState.duration
      );
      setAnimState((state) => ({ ...state, state: "active" }));
    } else if (animState.state === "end") {
      setAnimState((state) => ({
        ...state,
        state: "ready",
        offset: Math.ceil(state.t - childArray.length / 2) + 1,
      }));
    }
  }, [animState.state, target]);

  const isIdle = animState.state === "ready" && animState.t === target;

  const y = TIMING_PARAM_B / Math.sqrt(1 - TIMING_PARAM_A ** 2);
  const x = TIMING_PARAM_A * y;
  const top = (clientHeight ?? 0) * (animState.offset - animState.t);
  const transition = `top ${animState.duration}ms cubic-bezier(${x},${y},${
    1 - x
  }, ${1 - y})`;
  return isIdle && clientHeight && clientWidth ? (
    <Flex height={clientHeight} width={clientWidth}>
      {childArray[lnnr(target, childArray.length)]}
    </Flex>
  ) : (
    <Flex
      height={height}
      ref={ref}
      sx={{
        overflowY: "clip",
        userSelect: "none",
      }}
    >
      <FlexCol
        position="relative"
        style={{
          top,
          ...(animState.state === "start" && { transition }),
        }}
      >
        {rotate(
          childArray.map((child, i) => (
            <Flex key={i} height={clientHeight}>
              {child}
            </Flex>
          )),
          animState.offset
        )}
      </FlexCol>
    </Flex>
  );
};
