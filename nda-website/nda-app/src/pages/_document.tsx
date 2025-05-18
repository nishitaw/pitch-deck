import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Critical CSS loaded first */}
        <link rel="stylesheet" href="/critical.css" />

        {/* Ensure Next.js CSS is loaded */}
        <link rel="stylesheet" href="/_next/static/css/app/layout.css" />
        <link rel="stylesheet" href="/_next/static/css/app/globals.css" />

        {/* Preload fonts */}
        <link rel="preload" href="/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </Head>
      <body suppressHydrationWarning={true}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
