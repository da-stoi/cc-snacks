import Head from 'next/head'
import React from 'react'

export default function RichHeader(params) {

  const data = {
    /* defaults */
    author: "Daniel Stoiber",
    handle: "@_dastoi",
    title: "CC Snacks",
    site_name: "CC Snacks",
    description: "Live CC Snack Availability",
    image_url: "/icons/icon-512x512.png",
    theme_color: "#FFFFFF",
    og_type: "website",
    large_image: false,

    ...params
  }

  return (
    <Head>
      <title>{data.title}</title>
      <meta property="author" content={data.author} key="author" />

      {/* Icons */}
      <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/icons/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />

      {/* Fixed */}
      <link rel="manifest" href="/manifest.json" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={data.og_type} key="og_type" />
      <meta name="msapplication-TileColor" content={data.theme_color} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

      {/* Discord large image embed */}
      <meta property="og:title" content={data.title} key="title" />
      <meta property="og:site_name" content={data.site_name} key="site_name" />
      <meta property="og:description" content={data.description} key="description" />
      <meta property="og:image" content={data.image_url} key="image" />
      <meta name="theme-color" content={data.theme_color} key="theme-color" />

      {/* Twitter Tags */}
      <meta property="twitter:creator" content={data.handle} />
      <meta property="twitter:title" content={data.site_name} />
      <meta property="twitter:description" content={data.description} />

      {data.large_image ? (
        <meta name="twitter:card" content="summary_large_image" key="misc-card" />
      ) : (
        <meta property="twitter:card" content="summary" />
      )}

      {/* Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;600&family=Roboto:wght@300;400&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    </Head>
  )
}