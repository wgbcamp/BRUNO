import React, { useState } from "react";
import StartSession from "../components/pages/StartSession";
import Instructions from "../components/pages/Instructions";
import Home from "../components/pages/Home";
import Game from "../components/pages/Game";
import Navbar from "./Navbar";
import { Route, Switch } from "react-router";


function SiteContainer(){

    const [value, setValue] = useState('');

    function handleChange(newValue){
        setValue(newValue);
    }

        return(
            <div>
                <Navbar value={value} onChange={handleChange}/>
                <Switch>
                    <Route exact path="/" component ={Home} />
                    <Route exact path="/instructions" component ={Instructions} />
                    <Route exact path="/startsession" component ={StartSession} />
                    <Route exact path="/game" component ={Game} />

                </Switch>

            </div>
        )
    }


export default SiteContainer;