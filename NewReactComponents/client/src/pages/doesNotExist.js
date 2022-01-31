import "../stylesheets/main.css";
import React, { useState, useEffect } from 'react';
import API from "../utilities/api";
import HeaderBar from "../subComponents/headerBar";
import { Link } from "react-router-dom";

function DoesNotExist() {

    React.useEffect(() => {
        
        function detectDarkMode(){
            if(localStorage.getItem('userSetDarkMode') == undefined){
                let matched = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if(matched){
                    swDarkMode1(true);
                }else{
                    swDarkMode1(false);
                }
            }
            if(localStorage.getItem('userSetDarkMode') === 'dark'){
                swDarkMode1(true);                
            } 
        }
        detectDarkMode();
    })

    const [playerCount, setPlayers] = useState(2);
    const [showPopup, switchPopup] = useState(false);
    const [showBlur, switchBlur] = useState(false);

    const changeStyle = () => {
        switchPopup(!showPopup);
    }

    const blur = (data) => {  
        if(data == true){
            switchBlur(!showBlur);
        }
    }

    //dark mode switch
    const [darkMode, swDarkMode1] = useState(false);
    const [dModeHTML, switchHTML1] = useState(darkMode ? "Disable Dark Mode" : "Enable Dark Mode");

    const swDarkMode2 = (data) => {
        if(data == true){
            swDarkMode1(!darkMode);

        }
    }

    const submitStyle = {
        backgroundColor: darkMode ? "#4cdd81" : "#4cdd81",
        color: darkMode ? "white" : "white"
    }

  return (
    <div id="container" className={darkMode ? "container1" : "container2"}>  
    <HeaderBar swDarkMode3={swDarkMode2} darkMode={darkMode} showPopup={showPopup} blurFunction={blur}/>   
    <div id="mainGrid" className={`${"mainGrid1"} ${showBlur ? "blur" : "no-blur"}`} style={{backgroundColor: darkMode ? "#3d298a" : "white"}}>
        <div id="title" className="title" style={{color: darkMode ? "white" : "black"}}> 
            BRUNO
            <div id="subtitle" className="subtitle" style={{color: darkMode ? "#ededed" : "#383838"}}>
            Uh oh! It looks like you've ventured into uncharted terroritory. This address doesn't exist, but you can click the button below to go to the home page.
            </div>
        </div>
        <Link to="/" className="createSession" style={{backgroundColor: darkMode ? "#c079ff" : "#3d298a", textDecoration: 'none'}}>
        
            RETURN TO HOMEPAGE
            
        
        </Link>
    </div>


    </div>
  );
}


export default DoesNotExist;
