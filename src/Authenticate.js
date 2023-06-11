import React,{useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom'

function Authenticate() {
    // Expect this page to be hit after OAuth2 login flow finishes
    // And expect URL query parameteres
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    
    // Accessing URL query parameter "token"
    const paramValue = searchParams.get('token');

    // Todo: Send to backend to get a UUID associated with the OAuth2 log in

    return (
        <div>
            <h3>Authenticated</h3>
            <br/>
            <br/>
            <LogoutButton/>
        </div>
    );
}

function LogoutButton() {

    function oauth2() {
      window.location.href="/";
    }
  
    return (
        <button onClick={()=>{ oauth2(); }}>Logout</button>
    );
  }

export default Authenticate;
