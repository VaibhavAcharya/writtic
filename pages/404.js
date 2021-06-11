import NextLink from "next/link";

import { Heading, Link, Stack } from "@chakra-ui/react";

export default function _404() {
  return (
    <Stack
      direction="column"
      align="center"
      justify="center"
      spacing="4"
      padding="16"
      minHeight="100vh"
    >
      <Heading as="h1" size="2xl">
        404!
      </Heading>
      <Heading as="h2" size="lg">
        Page not found.
      </Heading>
      <NextLink href="/" passHref>
        <Link color="teal">
          <Heading as="p" size="md">
            Go back
          </Heading>
        </Link>
      </NextLink>
    </Stack>
  );
}
