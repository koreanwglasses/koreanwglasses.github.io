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

      {/* <IAmA /> */}
      <Flex gap={2} width="100%">
        <FlexCol flexGrow={1}>
          <Typography variant="h6" component="p">
            I am a graduate student and social computing researcher at UIUC
            studying for my PhD in computer science. In my research, I am
            studying how the design of interfaces impact user behavior online,
            and redesigning social media interfaces for moderators and
            end-users. Drawing on techniques from visualization, user-interface
            design, and social computing, I am developing tools that integrate
            modern techniques in machine learning and NLP to augment the
            workflow of human moderators. I am exploring positive reinforcement
            techniques for shaping and driving user behavior. And I am
            reimagining the experience for end-users to better align with the
            diversity of user needs. Ultimately, my goal is to advance our
            understanding of how the design of social media platforms affect us
            so that we can design better interfaces moving into the future of
            the online world.
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

  const [isRolling, setIsRolling] = useState(false);
  const [target, setTarget] = useState(0);
  const localStorage = useLocalStorage();

  const roll = () => {
    setTarget((t) =>
      Math.floor(t - iams.length * 2 - iams.length * Math.random())
    );
    setIsRolling(true);
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
          onIdle={() => setIsRolling(false)}
        >
          {iams.map((iam) => iam.replaceAll(" ", "\xa0"))}
        </Roulette>
      </Flex>
      <IconButton
        disabled={isRolling}
        onClick={() => roll()}
        sx={{ transition: "opacity 0.5s", "&:disabled": { opacity: 0 } }}
      >
        <ReplayIcon />
      </IconButton>
    </Flex>
  );
};

export default HomePage;
