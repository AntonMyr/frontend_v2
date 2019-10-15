/* import React, { useEffect, useState } from 'react'; */
/* import { useSelector } from 'react-redux'; */
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import React from 'react';


function MainView(props) {

/*     const [loadedView, setLoadedView] = useState(false);
    const [loadedVehicle, setLoadedVehicle] = useState(false); */

/*     const [views, setViews] = useContext(ViewContext);
    const [vehicles, setVehicles] = useContext(VehicleContext); */

/*     const currentView = useSelector((state) => state.currentView);
    const currentVehicle = useSelector((state) => state.currentVehicle);
    const loading = useSelector((state) => state.loading); */

/*     useEffect(() => { */
/*         if(views.currentView !== "") {
            setLoadedView(true);
        }
        if(vehicles.currentVehicle.vehicle_id !== null) {
            setLoadedVehicle(true);
        } */
/*    }, []); */

    const returnListItems = function returnListItems() {
        return (
        <iframe 
        width="80%" 
        height="80%" 
        src={"https://www.youtube.com/embed/hHW1oY26kxQ"} 
        // Twitch stream works as well
    //        src="https://player.twitch.tv/?channel=riotgames"
        frameborder="0" 
        allow="accelerometer; autoplay=1; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
        ></iframe>
        );
    }

/*     const returnButtonItems = function returnButtonItems() {
        let buttonList = []
        console.log("Current: ", vehicles);
        buttonList.push(
            <Button
                key={vehicles.currentVehicle.vehicle_id}
            >Real</Button>
        );
        return buttonList;
    } */


/*     if(!loading) { */
        return(
            <div className="view">
                <div className="borderStyle align rightBorder">
                    <h3>Current view: Camera 1</h3>
                    { returnListItems() }
                </div>
                <div>
                    <p>Currently controlling: Vehicle 1</p>
                    <ButtonGroup
                        variant="text"
                        color="secondary"
                        size="large"
                        aria-label="large contained secondary button group"
                    >
{/*                     {returnButtonItems()} */}
                        <Button>Stop</Button>
                        <Button>Reset</Button>
                        <Button>Turn off</Button>
                    </ButtonGroup>
                </div>
            </div>
        );
/*     } */
/*     if(loading) return null; */
}

export default MainView;