import * as React from "react";
import { Box, Button, Flex, Img, Stack, Text } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";
import { LoginComponent } from "../components/LoginComponent";
import { NavBar } from "../components/NavBar";
import NextLink from "next/link";
import type { NextPage } from "next";

import { PullRequestsSection } from "../components/PullRequestsSection";
import { UserCard } from "../components/UserCard";
import { UserDetails } from "../types/UserDetails";
import { apiWrapper } from "../apiWrapper";

const Custom404: NextPage = () => (
  <>
    <NavBar />
    <Flex
      height={"100vh"}
      justifyContent={"center"}
      alignItems="center"
      aria-hidden="true"
    >
      <Stack alignItems="center">
        <Img maxHeight="400px" src="/404.png" alt="Could not load page" />
        <Text fontSize="xl">😒 Oh no! Page not found.</Text>
        <Box>
          <NextLink href="/" passHref>
            <Button
              as="a"
              mt={12}
              rightIcon={<BsArrowRightCircleFill fontWeight={"bold"} />}
              colorScheme="teal"
              variant="solid"
              fontSize={"18px"}
            >
              Go to Home Page
            </Button>
          </NextLink>
        </Box>
      </Stack>
    </Flex>
    <Footer />
  </>
);

export default Custom404;
