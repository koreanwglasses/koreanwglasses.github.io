import React from "react";
import { Flex, FlexCol } from "./flex";
import { Link } from "./link";
import { useLocation } from "@reach/router";
import { useLocalStorage } from "./local-storage";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { Android12Switch } from "./android-12-switch";

const pages = [
  { href: "/", name: "Home" },
  { href: "/cv", name: "CV / Resume" },
];

export const NavBar = () => {
  const location = useLocation();

  return (
    <FlexCol
      component="nav"
      width={300}
      borderRight={1}
      px={1.5}
      alignItems="end"
      justifyContent="center"
      flexShrink={0}
      position="relative"
    >
      {pages.map(({ href, name }, i) => (
        <Link
          href={href}
          key={i}
          underline="hover"
          color={location.pathname == href ? "primary" : "secondary"}
          sx={{ textTransform: "uppercase", fontSize: 18 }}
        >
          {name}
          <span style={{ userSelect: "none" }}>{" 〈"}</span>
        </Link>
      ))}
      <Controls />
    </FlexCol>
  );
};

export const Controls = () => {
  const localStorage = useLocalStorage();
  const reduceMotion = localStorage("reduceMotion");

  return (
    <Flex position="absolute" bottom="0">
      <FormGroup>
        <FormControlLabel
          control={
            <Android12Switch
              checked={reduceMotion}
              onChange={(e) => localStorage("reduceMotion", e.target.checked)}
            />
          }
          label="Reduce Motion"
        />
      </FormGroup>
    </Flex>
  );
};
