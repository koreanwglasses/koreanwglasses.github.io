import * as React from "react";
import { Typography } from "@mui/material";
import { Layout } from "../components/layout";
import portrait from "../images/portrait.jpg";
import { Flex, FlexCol } from "../components/flex";

const HomePage = () => {
  return (
    <Layout>
      <main>
        <title>Home - Fred Choi</title>
        <Typography variant="h1" mt="25vh">
          Fred Choi
        </Typography>
        <Typography variant="subtitle1">
          Graduate Student Researcher @ University of Illinois at
          Urbana-Champaign
        </Typography>
        <h1>About Me</h1>
        <Flex gap={2} width="100%">
          <FlexCol flexGrow={1}>
            <p>
              <i>Todo: write a short bio here</i>
            </p>
          </FlexCol>
          <Flex component="img" src={portrait} height="6in" />
        </Flex>
      </main>
    </Layout>
  );
};

export default HomePage;
