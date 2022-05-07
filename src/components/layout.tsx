import React from "react";
import { PropsWithChildren } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import "@fontsource/metropolis/300.css";
import "@fontsource/metropolis/400.css";
import "@fontsource/metropolis/500.css";
import "@fontsource/metropolis/700.css";
import { FlexCol, Flex } from "./flex";
import { NavBar } from "./navbar";
import { Footer } from "./footer";
import { LocalStorageProvider } from "./local-storage";

const theme = createTheme({
  typography: { fontFamily: "Metropolis" },
  palette: {
    primary: { main: "#39b" },
    secondary: { main: "#888" },
  },
});

/**
 * Shared component across all pages.
 *
 * Details:
 * - Loads Metropolis font family
 * - Applies custom theme
 * - Adds navbar
 */
export const Layout = ({ children }: PropsWithChildren<{}>) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <LocalStorageProvider>
      <Flex width="100%">
        <NavBar />
        <FlexCol overflow="auto" px={1.5} flexGrow={1}>
          <FlexCol height="100vh">
            <main>
              <FlexCol maxWidth={"9in"}>
                {children}
                <Footer />
              </FlexCol>
            </main>
          </FlexCol>
        </FlexCol>
      </Flex>
    </LocalStorageProvider>
  </ThemeProvider>
);
