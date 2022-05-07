import { useEffect, useState } from "react";
import * as React from "react";
import { IconButton, Typography } from "@mui/material";
import { Layout } from "../components/layout";
import portrait from "../images/portrait.jpg";
import { Flex, FlexCol, Img } from "../components/flex";
import { Roulette } from "../components/roulette";
import ReplayIcon from "@mui/icons-material/Replay";
import { useLocalStorage } from "../components/local-storage";

const HomePage = () => {
  return (
    <Layout>
      <title>Home - Fred Choi</title>
      <Typography variant="h1" mt="25vh">
        Fred Choi
      </Typography>
      <Typography variant="subtitle1">
        Graduate Student Researcher @ University of Illinois at Urbana-Champaign
      </Typography>

      <IAmA />
      <Flex gap={2} width="100%">
        <FlexCol flexGrow={1}>
          <Typography variant="h6" component="p">
            I am many things. Officially, I am a graduate student and social
            computing researcher at UIUC studying for my PhD in computer
            science.
          </Typography>
        </FlexCol>
        <Img src={portrait} sx={{ height: "6in" }} />
      </Flex>
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
  const localStorage = useLocalStorage();

  const roll = () => {
    setTarget((t) =>
      Math.floor(t - iams.length * 2 - iams.length * Math.random())
    );
    setCanReroll(false);
  };

  useEffect(() => {
    if (!localStorage("reduceMotion")) roll();
  }, []);

  return (
    <Flex fontSize="4em" mt="1em" mb=".5em" alignSelf="flex-end">
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
