import { useEffect, useState } from "react";
import * as React from "react";
import { IconButton, Typography } from "@mui/material";
import { Layout } from "../components/layout";
import portrait from "../images/portrait.jpg";
import { Flex, FlexCol } from "../components/flex";
import { Roulette } from "../components/roulette";
import ReplayIcon from "@mui/icons-material/Replay";

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

        <IAmA />
        <Flex gap={2} width="100%">
          <FlexCol flexGrow={1}>
            <p></p>
          </FlexCol>
          <Flex component="img" src={portrait} height="6in" />
        </Flex>
      </main>
    </Layout>
  );
};

const IAmA = () => {
  const iams = [
    " researcher",
    " graduate student",
    " programmer",
    " mathematician",
    "n artist",
    " composer",
    " musician",
  ];

  const [canReroll, setCanReroll] = useState(false);
  const [target, setTarget] = useState(0);

  const roll = () => {
    setTarget((t) =>
      Math.floor(t - iams.length * 2 - iams.length * Math.random())
    );
    setCanReroll(false);
  };

  useEffect(() => {
    roll();
  }, []);

  return (
    <Flex fontSize="4em" ml="1.5em" mt="1em" mb=".5em">
      {"I\xa0am\xa0a"}
      <Flex
        sx={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0))",
        }}
      >
        <Roulette
          height="1.5em"
          target={target}
          onReady={() => setCanReroll(true)}
        >
          {iams.map((iam) => iam.replaceAll(" ", "\xa0"))}
        </Roulette>
      </Flex>
      <IconButton
        disabled={!canReroll}
        onClick={() => roll()}
        sx={{ transition: "opacity 0.5s", "&:disabled": { opacity: 0 } }}
      >
        <ReplayIcon />
      </IconButton>
    </Flex>
  );
};

export default HomePage;
