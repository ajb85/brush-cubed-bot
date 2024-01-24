const express = require("express");
const axios = require("axios"); // for making HTTP requests
const qs = require("querystring"); // for handling query parameters
const app = express();

app.get("/oauth2/callback", async (req, res) => {
  console.info("Received oauth");
  try {
    const code = req.query.code;
    const tokenResponse = await axios.post(
      `${DISCORD_API_URL}/oauth2/token`,
      qs.stringify({
        client_id: process.env.DISCORD_APPLICATION_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        code,
        redirect_uri: process.env.DISCORD_REDIRECT_URI + "/oauth2/callback",
        grant_type: "authorization_code",
        scope: "identify",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;
    const userResponse = await axios.get(`${DISCORD_API_URL}/users/@me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = userResponse.data;
    res.send(`Hello, ${user.username}!`);
  } catch (error) {
    console.error("OAuth2 callback error:", error);
    res.status(500).send("An error occurred during OAuth2 authorization.");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
