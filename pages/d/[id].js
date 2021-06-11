import NextLink from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { FirebaseFirestore } from "./../../lib/firebase";

import { Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Textarea } from "@chakra-ui/textarea";
import { useClipboard } from "@chakra-ui/hooks";

export default function Document() {
  const {
    query: { id },
    asPath,
    isReady,
    push: RouterPush,
  } = useRouter();

  const documentRef = useMemo(
    function () {
      return FirebaseFirestore.collection("wdocs").doc(id);
    },
    [isReady]
  );

  const [data, setData] = useState(undefined);
  const documentBodyRef = useRef(null);

  useEffect(
    function () {
      let unsubscribeDocumentListener = function () {};

      if (isReady) {
        unsubscribeDocumentListener = documentRef.onSnapshot(
          function (snapshot) {
            if (!snapshot.exists) {
              RouterPush("/");
            } else {
              setData(snapshot.data());
            }
          },
          function (e) {
            console.log(e);
          }
        );
      }

      return function () {
        unsubscribeDocumentListener();
      };
    },
    [isReady]
  );

  const [isSaving, setIsSaving] = useState(false);

  const updateDocument = useCallback(
    function () {
      setIsSaving(true);
      documentRef
        .update({ body: documentBodyRef.current.value })
        .finally(function () {
          setIsSaving(false);
        });
    },
    [documentRef]
  );

  const { hasCopied, onCopy } = useClipboard(
    `${
      process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL
    }${asPath}`
  );

  return (
    <Stack
      direction="column"
      spacing="8"
      align="stretch"
      justify="flex-start"
      minHeight="100vh"
      padding="8"
    >
      <Flex
        as="header"
        direction="row"
        align="center"
        justify="space-between"
        wrap="wrap"
      >
        <Stack direction="row" align="center" spacing="2">
          <NextLink href="/" passHref>
            <Link>
              <Heading as="h1" size="md" color="teal">
                Writtic.com
              </Heading>
            </Link>
          </NextLink>
          <Text>/</Text>
          <Text fontSize="lg">{data?.name}</Text>
        </Stack>
        <Stack as="nav" direction="row" align="center" spacing="2">
          <Button
            onClick={updateDocument}
            colorScheme="teal"
            isLoading={data === undefined || isSaving}
            loadingText={isSaving && "Saving"}
          >
            Save
          </Button>
          <Button
            onClick={onCopy}
            colorScheme="cyan"
            variant="outline"
            isLoading={data === undefined}
          >
            {hasCopied ? "Copied!" : "Copy Link"}
          </Button>
        </Stack>
      </Flex>
      {data !== undefined ? (
        <Textarea
          ref={documentBodyRef}
          placeholder="Your content goes here..."
          defaultValue={data.body}
          resize="vertical"
          flexGrow="1"
        />
      ) : (
        "Loading..."
      )}
    </Stack>
  );
}
