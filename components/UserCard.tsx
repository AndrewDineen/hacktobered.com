import * as React from "react";
import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Center,
  HStack,
  Icon,
  Link,
  Stack,
  StackDivider,
  Text,
  Wrap,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsGithub, BsGlobe } from "react-icons/bs";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card } from "./common/Card";
import { GoVerified } from "react-icons/go";
import { NoPullRequestCard } from "./NoPullRequestCard";
import { SearchResults } from "../types/SearchResults";
import { UserCardPropType } from "../types/UserCardPropType";
import { UserDetails } from "../types/UserDetails";
import { apiWrapper } from "../apiWrapper";

export const UserCard = ({ user }: UserCardPropType) => {

  const avatarColor = useColorModeValue("white", "gray.700");
  const iconColor = useColorModeValue("blue.500", "blue.200");

  const [searchData, setSearchData] = useState<SearchResults>();
  const { data: session, status } = useSession();

  async function fetchPR(accessToken: any, login: string) {
    const pullData = await apiWrapper.fetchUserPullRequests(accessToken, login);
    if (pullData) {
      setSearchData({
        issueCount: pullData.issueCount,
        edges: pullData.edges,
      });
    }
  }

  useEffect(() => {
    if (session) {
      fetchPR(session.accessToken, user.login);
    }
  }, [session, user.login]);

  return (
    <Card>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: "3", md: "10" }}
        align="center"
      >
        <Stack spacing="4" align="center">
          <Avatar
            size="2xl"
            src={user.avatar_url}
            name={user.name ?? user.login}
          >
            <AvatarBadge
              borderWidth="4px"
              borderColor={avatarColor}
              insetEnd="3"
              bottom="3"
              bg={avatarColor}
            >
              <Icon as={GoVerified} fontSize="2xl" color={iconColor} />
            </AvatarBadge>
          </Avatar>
        </Stack>
        <Box>
          <Stack spacing={{ base: "1", md: "2" }} direction={"column"}>
            <HStack fontSize="lg">
              <Text as="span" fontWeight={"600"} color={"gray.500"}>
                {user.name}
              </Text>
            </HStack>

            {user.bio && (
              <HStack fontSize="lg">
                <Text as="span" color={"gray.500"}>
                  {user.bio}
                </Text>
              </HStack>
            )}
            {user.login && (
              <HStack fontSize="lg">
                <Icon as={BsGithub} color="blue.500" />
                <Link href={user.html_url} target="_blank">
                  <Text as="span" color={"gray.500"}>
                    {user.login}
                  </Text>
                </Link>
              </HStack>
            )}
            <Wrap shouldWrapChildren my="4" spacing="4">
              {user.location && (
                <HStack fontSize="lg">
                  <Icon as={MdLocationPin} color={"gray.500"} />
                  <Text as="span" color={"gray.500"}>
                    {user.location}
                  </Text>
                </HStack>
              )}
              {user.blog && (
                <HStack fontSize="lg">
                  <Icon as={BsGlobe} color="blue.500" />
                  <Link href={user.blog} target="_blank">
                    <Text as="span" color={"gray.500"}>
                      {user.blog}
                    </Text>
                  </Link>
                </HStack>
              )}
            </Wrap>
          </Stack>
          {!searchData?.issueCount && (
              <NoPullRequestCard></NoPullRequestCard>
            )}
        </Box>
      </Stack>
    </Card>
  );
};
