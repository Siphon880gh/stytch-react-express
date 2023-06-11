import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'

function Authenticate() {
    // Expect this page to be hit after OAuth2 login flow finishes
    // And expect URL query parameteres
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Accessing URL query parameter "token"
    const paramValue = searchParams.get('token');

    useEffect(()=>{
        // You can only authenticate once per token
        // Once authenticated, you get the UUID and session token
        // The UUID will be useful for MySQL with your app
        // The session token can be used to check validity of session with Stytch (TODO)
        // It's recommended you encode UUID and session token as an expiring json web token (TODO)
        fetch('/api/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: paramValue }) // Replace with your JSON data
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response:', data);
            // Process the response data here
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle any errors here
        });
    }, [location])

    // Todo: Send to backend to get a UUID associated with the OAuth2 log in

    return (
        <div>
            <h3>Authenticated</h3>
            <span>Open DevTools console for more details as you login/signup/logout</span>
            <br />
            <br />
            <LogoutButton />
        </div>
    );
}

function LogoutButton() {

    function oauth2() {
        window.location.href = "/";
    }

    return (
        <button onClick={() => { oauth2(); }}>Logout</button>
    );
}

export default Authenticate;
