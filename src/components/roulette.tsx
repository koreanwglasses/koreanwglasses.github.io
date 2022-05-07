import React, {
  Children,
  CSSProperties,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { useClientHeight } from "../lib/use-client-height";
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

type AnimationState = "idle" | "start" | "active" | "end";
export const Roulette = ({
  children,
  height,
  target,
  onReady,
}: PropsWithChildren<{
  height: CSSProperties["height"];
  target: number;
  onReady?: () => void;
}>) => {
  const childArray = Children.toArray(children);

  const [ref, clientHeight] = useClientHeight();
  const [animState, setAnimState] = useState({
    state: "idle" as AnimationState,
    t: 0,
    offset: Math.ceil(0 - childArray.length / 2) + 1,
    duration: INIT_DURATION,
  });

  useEffect(() => {
    if (animState.state === "idle" && animState.t === target) {
      onReady?.();
      return;
    } else if (animState.state === "idle" && animState.t !== target) {
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
        state: "idle",
        offset: Math.ceil(state.t - childArray.length / 2) + 1,
      }));
    }
  }, [animState.state, target]);

  const y = TIMING_PARAM_B / Math.sqrt(1 - TIMING_PARAM_A ** 2);
  const x = TIMING_PARAM_A * y;
  const top = (clientHeight ?? 0) * (animState.offset - animState.t);
  const transition = `top ${animState.duration}ms cubic-bezier(${x},${y},${
    1 - x
  }, ${1 - y})`;

  return (
    <FlexCol
      height={height}
      ref={ref}
      sx={{
        overflowY: "clip",
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
            <Flex
              key={i}
              height={clientHeight}
              sx={{
                ...(lnnr(target, childArray.length) !== i && {
                  userSelect: "none",
                }),
              }}
            >
              {child}
            </Flex>
          )),
          animState.offset
        )}
      </FlexCol>
    </FlexCol>
  );
};
