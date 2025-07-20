import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        <meta name="theme-color" content="#0d47a1"/>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="BerbagiAkun - Akun Premium Legal" />
        <meta property="og:description" content="Beli akun streaming, software, dan gaming original." />
        <meta property="og:image" content="/images/banner-og.jpg" />
        {/* Font bebas tambahkan */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
