import * as React from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { toPng, toSvg } from "html-to-image";
import { BiGitPullRequest } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import { MdIosShare } from "react-icons/md";
import NextLink from "next/link";
import { PullRequest } from "../../../types/PullRequest";
import download from "downloadjs";
import { useRef } from "react";

const BasicCard = (props: PullRequest) => {
  return <Box backgroundColor="white">Placeholder</Box>;
};

export default BasicCard;
