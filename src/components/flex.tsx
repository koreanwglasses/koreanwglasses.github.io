import { Box, BoxProps } from "@mui/system";
import React from "react";

export const Flex = <D extends React.ElementType<any> = "div", P = {}>(
  props: BoxProps<D, P>
) => <Box display="flex" {...props} />;
export const FlexCol = <D extends React.ElementType<any> = "div", P = {}>(
  props: BoxProps<D, P>
) => <Box display="flex" flexDirection="column" {...props} />;
