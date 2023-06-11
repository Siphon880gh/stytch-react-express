import logo from './logo.svg';
import Authenticate from './Authenticate';
import './App.css';
import {Route,Routes, BrowserRouter} from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <BrowserRouter>
        <Routes>
          {/* So that callback from OAuth2 flow is possible to /authenticate */}
          <Route path='/authenticate' element={<Authenticate/>}></Route>
          <Route path='*' element={<LoginButton></LoginButton>}></Route>
        </Routes>
        </BrowserRouter>
        
      </header>
    </div>
  );
}
function LoginButton() {

  function oauth2() {
    window.location.href="https://test.stytch.com/v1/public/oauth/google/start?public_token=public-token-test-d42d592f-d1ec-42d1-ab7e-3a5cba74f220&login_redirect_url=http://localhost:3000/authenticate&signup_redirect_url=http://localhost:3000/authenticate";
  }

  return (
      <button onClick={()=>{ oauth2(); }}>Login/Signup with Google</button>
  );
}

export default App;
