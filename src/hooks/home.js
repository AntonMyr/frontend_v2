import React, { useContext, useEffect } from 'react';
import axios from 'axios';
/* import * as ACTIONS from '../store/actions/actions'; */
/* import * as CameraReducer from '../store/reducers/camera_reducers'; */
import Context from '../utils/context';
import LeftView from './LeftView'
import MainView from './MainView'
import RightView from './RightView'

const Home = props => {
  const context = useContext(Context);

  axios.defaults.headers.common['Authorization'] = `Bearer ${context.authObj.getAccessToken()}`;

  useEffect(() => {
    axios.get(`http://localhost:5000/camera`).then((res) => {
      console.log(res.data);
      context.fetchCameras(res.data);
      context.setCurrentCamera(res.data[0]);
    })

    axios.get(`http://localhost:5000/vehicles`).then((res) => {
      console.log(res.data);
      context.fetchVehicles(res.data);
      context.setCurrentVehicle(res.data[0]);
    })
  }, [])

  return(
    <div className="home">
      <LeftView />
      <MainView />
      <RightView />
    </div>
  );
};

export default Home;