import React, { useState, useEffect } from "react";
import { io } from 'socket.io-client';

function Home(){

    const [response, setResponse] = useState("");

    useEffect(() => {

        let unmounted = false;

        const socket = io();
        socket.emit('startRefresh', "go");
        socket.on("Refresh", data => {
            if (!unmounted){
                setResponse(data);
            }

        });
        console.log(`Connecting socket...`);

        return () => {
            socket.emit('startRefresh', "stop");
            unmounted = true;
        }
    }, []);

    return(



<div className="container vh">
<div className="row h-100">

    <div className="col-sm">
        <div className="row text-center">
            <div className="col">
            <h1>Home Page</h1>
            The time is now {response}.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque velit, lobortis ut magna
          varius, blandit rhoncus sem. Morbi lacinia nisi ac dui fermentum, sed luctus urna tincidunt.
          Etiam ut feugiat ex. Cras non risus mi. Curabitur mattis rutrum ipsum, ut aliquet urna
          imperdiet ac. Sed nec nulla aliquam, bibendum odio eget, vestibulum tortor. Cras rutrum ligula
          in tincidunt commodo. Morbi sit amet mollis orci, in tristique ex. Donec nec ornare elit.
          Donec blandit est sed risus feugiat porttitor. Vestibulum molestie hendrerit massa non
          consequat. Vestibulum vitae lorem tortor. In elementum ultricies tempus. Interdum et malesuada
          fames ac ante ipsum primis in faucibus.
            </div>
        </div>
    </div>

</div>
</div>
    )
}

export default Home;