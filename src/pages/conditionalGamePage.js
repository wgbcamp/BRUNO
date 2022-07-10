import React, { useEffect, useState } from 'react';
import InGame from './inGame';
import DoesNotExist from './doesNotExist';
import API from '../utilities/api';

function ConditionalGamePage(props){


    useEffect(() => {

        API.fetchGameCode2(window.location.href, props.app.socket, response);
        
        function response(res){
            console.log(res);
            props.app.updateGameCode(res.status);
            if(res.status){  
                if(res.status !== 'Document not found'){
                    sessionStorage.setItem('gameCode', res.status);
                    props.app.updateCURLC(true);
                }else{
                    props.app.updateCURLC(false);
                }      
            }         
        }

        
        
    }, [])
    
        return (
            <div>{props.app.conditionalURLCheck ? <InGame cgp={{darkMode: props.app.darkMode, switchPopup: props.app.switchPopup, showPopup: props.app.showPopup, gameCode: props.app.gameCode, updateGameCode: props.app.updateGameCode, switchBlur: props.app.switchBlur, showBlur: props.app.showBlur, socket: props.app.socket, ref: props.app.ref, handleClick: props.app.handleClick}}/> : 
            props.app.conditionalURLCheck === "" ? 
            <div id="mainGrid" className={`${"mainGrid1"} ${props.app.showBlur ? "blur" : "no-blur"}`} style={{backgroundColor: props.app.darkMode ? "#3d298a" : "white"}}>
            <div className="loadingIconContainer"><div className="fa-10x"><i className="fas fa-spinner fa-spin" style={{color: props.app.darkMode ? "white" : "black"}}></i></div></div></div> :
            <DoesNotExist app={{darkMode: props.app.darkMode, switchPopup: props.app.switchPopup, showPopup: props.app.showPopup, gameCode: props.app.gameCode, updateGameCode: props.app.updateGameCode, showBlur: props.app.showBlur}}
            />}</div>
        )
}

export default ConditionalGamePage;