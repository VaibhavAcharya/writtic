import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import firebase, { FirebaseFirestore } from "../lib/firebase";

export default function Landing() {
  const { push: RouterPush } = useRouter();
  const [loading, setLoading] = useState(false);
  const documentNameRef = useRef(null);

  return (
    <Stack
      direction="column"
      spacing="16"
      align="center"
      justify="center"
      minHeight="100vh"
      padding="8"
    >
      <Stack
        as="header"
        direction="column"
        spacing="4"
        align="center"
        justify="start"
      >
        <Avatar size="lg" src="/logo.svg" name="Writtic Logo" bg="teal" />
        <Heading as="h1" size="lg">
          Writtic
        </Heading>
        <Heading as="h2" size="md">
          Store & share your notes securely over the web.
        </Heading>
      </Stack>
      <Stack
        direction="column"
        as="form"
        spacing="4"
        align="center"
        justify="flex-start"
        onSubmit={async function (event) {
          event.preventDefault();
          setLoading(true);
          FirebaseFirestore.collection("wdocs")
            .add({
              name: documentNameRef.current.value,
              createdOn: firebase.firestore.Timestamp.now(),
              body: "",
            })
            .then(function (newDocument) {
              RouterPush(`/d/${newDocument.id}/`);
            })
            .catch(function (error) {
              console.log(error);
              setLoading(false);
            });
        }}
      >
        <FormControl>
          <FormLabel>Document Name</FormLabel>
          <Input
            ref={documentNameRef}
            type="text"
            placeholder="Eg. 'Startup Ideas'"
            required={true}
            size="lg"
            variant="filled"
          />
        </FormControl>
        <Button type="submit" size="lg" colorScheme="teal" isLoading={loading}>
          Create Document
        </Button>
      </Stack>
    </Stack>
  );
}
