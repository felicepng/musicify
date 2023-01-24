# musicify

![](https://github.com/felicepng/musicify/blob/main/demo.gif)

An application for generating song recommendations from various genres, built with [Nuxt 3](https://nuxt.com) and [Spotify API](https://developer.spotify.com/documentation/web-api/).

## Set-up

Create a `.env` file in the root directory and add the following credentials for your Spotify application:

```bash
# .env
NUXT_CLIENT_ID=$CLIENT_ID
NUXT_CLIENT_SECRET=$CLIENT_SECRET
```

Run the following commands to install required dependencies and start a development server:

```bash
$ npm install
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

Alternatively, the application is deployed with Vercel [here](https://musicify-felicepng.vercel.app).