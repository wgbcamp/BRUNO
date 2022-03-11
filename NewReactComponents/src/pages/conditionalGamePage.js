import React, { useEffect, useState } from 'react';
import InGame from './inGame';
import DoesNotExist from './doesNotExist';
import API from '../utilities/api';

function ConditionalGamePage(props){

    const value = useState('initial');

    useEffect(() => {

        API.fetchGameCode(window.location.href, response);
        
        function response(res){
            props.updateGameCode(res.data);
            if(res.status === 200){  
                if(res.data !== 'Document not found'){
                    props.updateCURLC(true);
                }else{
                    props.updateCURLC(false);
                }      
            }         
        }

        
        
    }, [])
    
        return (
            <div>{props.conditionalURLCheck ? <InGame darkMode={props.darkMode} switchPopup={props.switchPopup} showPopup={props.showPopup} gameCode={props.gameCode} updateGameCode={props.updateGameCode} showBlur={props.showBlur} ws={props.ws}/> : 
            props.conditionalURLCheck === "" ? 
            <div id="mainGrid" className={`${"mainGrid1"} ${props.showBlur ? "blur" : "no-blur"}`} style={{backgroundColor: props.darkMode ? "#3d298a" : "white"}}>
            <div className="loadingIconContainer"><div className="fa-10x"><i className="fas fa-spinner fa-spin" style={{color: props.darkMode ? "white" : "black"}}></i></div></div></div> :
            <DoesNotExist darkMode={props.darkMode} switchPopup={props.switchPopup} showPopup={props.showPopup} gameCode={props.gameCode} updateGameCode={props.updateGameCode} showBlur={props.showBlur} ws={props.ws}/>}</div>
        )
}

{/* <DoesNotExist darkMode={props.darkMode} switchPopup={props.switchPopup} showPopup={props.showPopup} gameCode={props.gameCode} updateGameCode={props.updateGameCode} showBlur={props.showBlur} ws={props.ws}/> */}
export default ConditionalGamePage;