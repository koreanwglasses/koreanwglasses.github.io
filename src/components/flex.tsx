import { Box, BoxProps } from "@mui/system";
import React, { forwardRef, Ref } from "react";

export const Flex = forwardRef(
  <D extends React.ElementType<any> = "div", P = {}>(
    props: BoxProps<D, P>,
    ref: Ref<unknown>
  ) => <Box display="flex" {...props} ref={ref} />
);

export const FlexCol = forwardRef(
  <D extends React.ElementType<any> = "div", P = {}>(
    props: BoxProps<D, P>,
    ref: Ref<unknown>
  ) => <Box display="flex" flexDirection="column" {...props} ref={ref} />
);
