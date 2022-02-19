import "../stylesheets/main.css";
import React, { useState } from 'react';
import HeaderBar from "../subComponents/headerBar";
import { Link } from "react-router-dom";

function DoesNotExist(props) {

  return (
    <div>  

    <div id="mainGrid" className={`${"mainGrid1"} ${props.showBlur ? "blur" : "no-blur"}`} style={{backgroundColor: props.darkMode ? "#3d298a" : "white"}}>
      {props.loadingIcon ? <div className="loadingIconContainer"><div className="fa-10x"><i className="fas fa-spinner fa-spin"></i></div></div> :
      <>
        <div id="title" className="title" style={{color: props.darkMode ? "white" : "black"}}> 
            BRUNO
            <div id="subtitle" className="subtitle" style={{color: props.darkMode ? "#ededed" : "#383838"}}>
            Uh oh! It looks like you've ventured into uncharted terroritory. This address doesn't exist, but you can click the button below to go to the home page.
            </div>
        </div>
        <Link to="/" className="createSession" style={{backgroundColor: props.darkMode ? "#c079ff" : "#3d298a", textDecoration: 'none'}}>
            RETURN TO HOMEPAGE
        </Link>
      </>
        }
    </div>


    </div>
  );
}


export default DoesNotExist;
