import './App.css'

function App() {
  return (
    <div>
      <div className="topnav">
        <a>
          <img className="site-logo"
            src="https://static.wixstatic.com/media/8eae5a_d7938906c3264579b155e8092ff7d459~mv2.png/v1/fill/w_1650,h_280,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo_white-01.png"
            alt="Home" width="165" height="28" />
        </a>
        <button id="boxes_hs">Hide/show boxes</button>
        <button id="peoples_hs">Hide/show peoples</button>
        <button id="pins_hs">Hide/show pins</button>
      </div>
      <div id="container"></div>
    </div>
  )
}

export default App
