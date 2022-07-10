import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import DoesNotExist from './pages/doesNotExist';
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

    const socket = props.socket;

    const ref = useRef(null);
    const handleClick = () => {
        ref.current.focus();
    }

    useEffect(() => {
        
        if(localStorage.getItem("userID")){
        }else{
            localStorage.setItem("userID", Math.random().toString(36).substring(2,13));
        }

    }, [])

    


    return(
        <div id="container" className={darkMode ? "container1" : "container2"}>  

        <HeaderBar app={{swDarkMode, darkMode, showPopup, switchBlur, showBlur}}/>

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main app={{darkMode, switchPopup, showPopup, gameCode, updateGameCode, showBlur, switchLoadingIcon, loadingIcon, socket}}/>}/>

                <Route path="*" element={<DoesNotExist app={{darkMode, switchPopup, showPopup, showBlur, gameCode, updateGameCode, showBlur, loadingIcon, switchLoadingIcon}}/>}/>

                <Route path="/inGame/:id" element={<ConditionalGamePage
                app={{darkMode, switchPopup, showPopup, switchBlur, showBlur, gameCode, updateGameCode, showBlur, loadingIcon, switchLoadingIcon, conditionalURLCheck, updateCURLC, socket, handleClick, ref}}/>}/>
            </Routes>
        </BrowserRouter>

        </div>
    );
}

export default App;
