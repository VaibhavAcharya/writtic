import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";

export default function _App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/logo.svg" type="image/x-icon" />

        <title>Writtic</title>
        <meta
          name="description"
          content="Store & share your notes securely over the web."
        />
      </Head>

      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
