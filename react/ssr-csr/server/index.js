import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../src/App";

const app = express();

// Serve static compiled assets (like client.bundle.js) from a build folder
app.use(express.static("public"));

app.get("*", (req, res) => {
  // Render the component tree to static HTML based on request URL location
  const appHtml = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  // Send the fully formed HTML template to the client browser
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React Custom SSR</title>
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script src="/client.bundle.js"></script>
      </body>
    </html>
  `);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
