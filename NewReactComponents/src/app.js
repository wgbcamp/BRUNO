import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import DoesNotExist from './pages/doesNotExist';
import InGame from './pages/inGame';
import HeaderBar from './subComponents/headerBar';
import ConditionalGamePage from './pages/conditionalGamePage';


function App(props){

    
    const [darkMode, swDarkMode] = useState(
        localStorage.getItem('userSetDarkMode') === 'dark' ? true : 
        localStorage.getItem('userSetDarkMode') === 'light' ? false : 
        window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false);
    const [showPopup, switchPopup] = useState(false);
    const [gameCode, updateGameCode] = useState(sessionStorage.getItem('gameCode'));
    const [showBlur, switchBlur] = useState(false);

    const [conditionalURLCheck, updateCURLC] = useState("");
    const [loadingIcon, switchLoadingIcon] = useState(false);



    


    return(
        <div id="container" className={darkMode ? "container1" : "container2"}>  
        <>
        <HeaderBar swDarkMode={swDarkMode} darkMode={darkMode} showPopup={showPopup} switchBlur={switchBlur} showBlur={showBlur}/>
        
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main darkMode={darkMode} switchPopup={switchPopup} showPopup={showPopup} gameCode={gameCode} updateGameCode={updateGameCode} showBlur={showBlur} switchBlur={switchBlur} switchLoadingIcon={switchLoadingIcon} loadingIcon={loadingIcon}/>}/>
                <Route path="*" element={<DoesNotExist darkMode={darkMode} switchPopup={switchPopup} showPopup={showPopup} gameCode={gameCode} updateGameCode={updateGameCode} showBlur={showBlur} loadingIcon={loadingIcon} switchLoadingIcon={switchLoadingIcon}/>} />
                <Route path="/inGame/:id" element={<ConditionalGamePage darkMode={darkMode} switchPopup={switchPopup} showPopup={showPopup} gameCode={gameCode} updateGameCode={updateGameCode} showBlur={showBlur} ws={props.ws} loadingIcon={loadingIcon} switchLoadingIcon={switchLoadingIcon} conditionalURLCheck={conditionalURLCheck} updateCURLC={updateCURLC}/>} />
            </Routes>
        </BrowserRouter>
        </>
        </div>
    );
}

export default App;