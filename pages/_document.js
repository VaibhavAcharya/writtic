import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class _Document extends NextDocument {
  static async getInitialProps(ctx) {
    try {
      return await NextDocument.getInitialProps(ctx);
    } finally {
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
