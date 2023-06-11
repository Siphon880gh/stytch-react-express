const express = require("express");
const server = express();
const path = require("path");

// Stytch to get more authentication information
// Will use expirable json web token to validate session
const stytch = require("stytch")


// TODO: Will place into env file later
const client = new stytch.Client({
    project_id: "project-test-e52f7895-4634-462f-993a-1917499adffe",
    secret: "secret-test-MqKhvuPlnef08YfyIFR71p1s2vzgXADuFQw=",
    env: stytch.envs.test,
  }
);

// Boilerplate: Middleware to parse JSON fetch body and URL-encoded form data
// Boilerplate: Middleware to respond with static files after page is loaded
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "/build")));

// Routes
server.post("/api/authenticate", async (req, res) => {
    const token = req.body.token;

    // Response object reference: https://stytch.com/docs/api/oauth-authenticate
    client.oauth.authenticate(token, { session_duration_minutes: 60 })
    .then(resp => {
        res.json({
            status:"authorized (Only one time per OAuth flow)", 
            bundled: {
                user_id:resp.user_id, 
                session_token:resp.session_token,
            }, 
            debug: {
                resp
            },
            comingSoon:"Todo - Will convert bundled into an expirable json web token"}
        )
    })
    
    .catch(err => {
        res.json({status:"unauthorized"})
    });

});

async function startServer() {
    let port = 3001;

    server.listen(port, () => {
        console.log(`Server listening at ${port}`);
    });
}

startServer();