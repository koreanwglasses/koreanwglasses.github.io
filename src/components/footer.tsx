import { Typography } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Flex, FlexCol } from "./flex";
import { Link } from "./link";

export const Footer = () => {
  const data: { siteBuildMetadata: { buildTime: string } } = useStaticQuery(
    graphql`
      query {
        siteBuildMetadata {
          buildTime
        }
      }
    `
  );

  const buildTime = new Date(data.siteBuildMetadata.buildTime);

  return (
    <FlexCol height="100px" alignItems="end">
      <Flex component="hr" borderTop={1} width="100%" />
      <Typography variant="caption">
        <Link
          href="https://github.com/koreanwglasses/koreanwglasses.github.io"
          target="_blank"
        >
          View source on GitHub
        </Link>
        <br /> Last updated {buildTime.toLocaleDateString()}
        <br />© {buildTime.getFullYear()} Frederick Choi
      </Typography>
    </FlexCol>
  );
};
