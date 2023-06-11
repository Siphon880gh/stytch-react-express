# Stytch

![Last Commit](https://img.shields.io/github/last-commit/Siphon880gh/stytch-react-express/main)
<a target="_blank" href="https://github.com/Siphon880gh" rel="nofollow"><img src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" alt="Github" data-canonical-src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" style="max-width:8.5ch;"></a>
<a target="_blank" href="https://www.linkedin.com/in/weng-fung/" rel="nofollow"><img src="https://camo.githubusercontent.com/0f56393c2fe76a2cd803ead7e5508f916eb5f1e62358226112e98f7e933301d7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c696e6b6564496e2d626c75653f7374796c653d666c6174266c6f676f3d6c696e6b6564696e266c6162656c436f6c6f723d626c7565" alt="Linked-In" data-canonical-src="https://img.shields.io/badge/LinkedIn-blue?style=flat&amp;logo=linkedin&amp;labelColor=blue" style="max-width:10ch;"></a>
<a target="_blank" href="https://www.youtube.com/user/Siphon880yt/" rel="nofollow"><img src="https://camo.githubusercontent.com/0bf5ba8ac9f286f95b2a2e86aee46371e0ac03d38b64ee2b78b9b1490df38458/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f596f75747562652d7265643f7374796c653d666c6174266c6f676f3d796f7574756265266c6162656c436f6c6f723d726564" alt="Youtube" data-canonical-src="https://img.shields.io/badge/Youtube-red?style=flat&amp;logo=youtube&amp;labelColor=red" style="max-width:10ch;"></a>

By Weng Fei Fung. Quick proof of concept of quickly bootstrapping OAuth2 Login / Signup flows into applications via Stytch.

## Motivation

I want to get into entrepreneurship with app and SaaS ideas and quickly churn out ideas and test MVP and business assumptions. There are many aspects I'm researching on how to rapidly develop the app common technological needs: authentication/authorization system, file storage, quick deployment of database (without all the hassle of setup for MySQL).

Recently looked into __Auth0__ and found it cumbersome although it has a whole management of permissions, users, roles. It takes longer than I wish to setup and the learning/relearning curve is steep (You can learn it, but if don't do it often, you'd forget it anyways). The next one was __Okta__, however, I found it was more for B2B with members of an organization being authenticated and authorized. As a soloentrepreneur I want to get ideas on the ground running. The next I looked into was __Fusio Project__, and it had permissions, users, roles, and although it seemed geared more towards API businesses, it could be rewritten for authenticating users, but it seemed to be missing the social OAuth2.

The 4th solution I tried is __Stytch__ and I find it easy to get off the ground running.

## Progress so far

- Button that logs into Google account and redirects back to /authenticate with URL query parameters to the token. 
- React router dom loads in a component inline that has useLocation and fetch to send the token parameter to server.js via POST /api/authenticate
- The server.js uses the node_module Stytch to authenticate the user. Notice the token can only be authenticated once. In return was the session token, but only after I gave a token expiration in minutes
- Verified that I have the same user_id everytime I log in. The authentication of Stytch returns both session token and user_id

## Todo

- Now at the stage of having a session token that expires every 60 minutes.

- There is a UUID per Google user, so can potentially do MySQL. The MySQL would be to store profile/user associated information for the app business requirements.

- Then would have to check if the user signs out or if it's been pass 60 minutes.

    - Firstly, would have to implement a sign out flow

    - Secondly, for every request that is profile/user or MySQL associated, I have to check for the session validity. I plan to add to server.js a global middleware that checks the req.method and req.url is not POST /api/authenticate, and if it's not, then check if the request is authorized with:

    ```
    async function checkSessionValidity(sessionToken) {
    try {
        const session = await client.sessions.getSession(sessionToken);
        console.log('Session is valid');
        // Session is still valid, you can proceed with your logic
    } catch (error) {
        console.log('Session is invalid');
        // Session is no longer valid, handle accordingly
    }
    }

    const sessionToken = req.session_token;
    checkSessionValidity(sessionToken);
    ```

- Todo Preview: Currently still in development. Will predeploy with /build, have "GET /" send /build/index.html, have express static set to /build, and decide on a deployment site.

- Todo Security: Will make the credentials secret in an env

- Todo Security: Might have an expiring jsonwebtoken for the UUID and session_token

## Vision
- This will become a template generator that can quickly get an app that requires authentication/authorization running
- May create for different stacks besides React.


## Raw notes that are unproofread from my journey of figuring out Stytch

First step:
https://stytch.com/docs/api/oauth-google-start

Even though at "Backend API" section of the website and we are doing frontend OAuth2 flow right now, still correct area.

Google->

It would auto populate your public token
```
https://test.stytch.com/v1/public/oauth/google/start?public_token=public-token-test-d42d592f-d1ec-42d1-ab7e-3a5cba74f220&login_redirect_url={login_redirect_url}&signup_redirect_url={signup_redirect_url}
```
--> Make sure to fill in redirect url
```
https://test.stytch.com/v1/public/oauth/google/start?public_token=public-token-test-d42d592f-d1ec-42d1-ab7e-3a5cba74f220&login_redirect_url=http://localhost:3000/authenticate&signup_redirect_url=http://localhost:3000/authenticate
```

Then have a direct link to there

Once user logins in, will redirect to a page you have react router dom load. then that inline component should useLocation and find the token. Fetch that token to your server which will check your token using the node_module stytch and your project_id and secret information (auto-populated at code sample Request at https://stytch.com/docs/api/oauth-authenticate).


You must have
```
, { session_duration_minutes: 10 }
```
if you are using session and checking if a session expired, as hinted at (even though they didn't update to include social oauth2: https://stytch.com/docs/api/sessions-overview)

So that code could be:
...


You can only authenticate once per token.
Once authenticated, you get the UUID and session token.
The UUID will be useful for MySQL with your app.
The session token can be used to check validity of session with Stytch.

You can check session validity with:
...

> Again, this section are my raw notes that I typed as I figured out Stytch. It hasn't been proofread. Will proofread and format later.

