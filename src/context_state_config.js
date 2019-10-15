import React, { useReducer } from 'react';
import Context from './utils/context';
import * as ACTIONS from './store/actions/actions';

import * as Reducer1 from './store/reducers/plain_reducer';
import * as AuthReducer from './store/reducers/auth_reducer';
import * as FormReducer from './store/reducers/form_reducer';
import * as CameraReducer from './store/reducers/camera_reducers';
import * as VehicleReducer from './store/reducers/vehicle_reducers';
import Routes from './routes';

import Auth from './utils/auth';


const auth = new Auth()


const ContextState = () => {
    /*
        Plain Reducer
    */
    const [stateReducer1, dispatchReducer1] = useReducer(Reducer1.Reducer1,
                                                         Reducer1.initialState)


    const handleDispatchTrue = () => {
      //    dispatchReducer1(type: "SUCCESS")
      //    dispatchReducer1(ACTIONS.SUCCESS)
      dispatchReducer1(ACTIONS.success())
    }

    const handleDispatchFalse = () => {
      //     dispatchReducer1(type: "FAILURE")
      //    dispatchReducer1(ACTIONS.FAILURE)
      dispatchReducer1(ACTIONS.failure())
    }

    /*
      Auth Reducer
    */
    const [stateAuthReducer, dispatchAuthReducer] =                      useReducer(AuthReducer.AuthReducer,
                                                           AuthReducer.initialState)


    const handleLogin = () => {
      dispatchAuthReducer(ACTIONS.login_success())
    }

    const handleLogout = () => {
      dispatchAuthReducer(ACTIONS.login_failure())
    }

    const handleAddProfile = (profile) => {
      dispatchAuthReducer(ACTIONS.add_profile(profile))
    }

    const handleRemoveProfile = () => {
      dispatchAuthReducer(ACTIONS.remove_profile())
    }



    // Camera reducer
    const [stateCameraReducer, dispatchCameraReducer] = useReducer(CameraReducer.CameraReducer, CameraReducer.initialState)

    const handleGetCameras = (data) => {
      dispatchCameraReducer(ACTIONS.fetch_cameras_success(data));
    }

    const setCurrentCamera = (camera) => {
      dispatchCameraReducer(ACTIONS.set_current_camera(camera));
    }

    const handleGetCamerasFail = () => {
      dispatchCameraReducer(ACTIONS.fetch_cameras_failure());
    }

    //Vehicle reducer
    const [stateVehicleReducer, dispatchVehicleReducer] = useReducer(VehicleReducer.VehicleReducer, VehicleReducer.initialState)

    const getVehicles = (data) => {
      dispatchVehicleReducer(ACTIONS.fetch_vehicles_success(data));
    }

    const setCurrentVehicle = (vehicle) => {
      dispatchVehicleReducer(ACTIONS.set_current_vehicle(vehicle));
    }

    /*
      Form Reducer
    */

        const [stateFormReducer, dispatchFormReducer] = useReducer(FormReducer.FormReducer, FormReducer.initialState)


    const handleFormChange = (event) => {
      dispatchFormReducer(ACTIONS.user_input_change(event.target.value))
    };

    const handleFormSubmit = (event) => {
      event.preventDefault();
      event.persist();             dispatchFormReducer(ACTIONS.user_input_submit(event.target.useContext.value))
    };

    //Handle authentication from callback
    const handleAuthentication = (props) => {
      if(props.location.hash) {
        auth.handleAuth()
      }
    }




    return(
      <div>
      <Context.Provider
          value={{
            //Reducer1
            stateProp1: stateReducer1.stateprop1,
            stateProp2: stateReducer1.stateprop2,
            dispatchContextTrue: () => handleDispatchTrue(),
            dispatchContextFalse: () => handleDispatchFalse(),

            //Form Reducer
            useContextChangeState: stateFormReducer.user_textChange,
            useContextSubmitState: stateFormReducer.user_textSubmit,
            useContextSubmit: (event) => handleFormSubmit(event),
            useContextChange: (event) => handleFormChange(event),

            //Auth Reducer
            authState: stateAuthReducer.is_authenticated,
            profileState:  stateAuthReducer.profile,
            handleUserLogin: () => handleLogin(),
            handleUserLogout: () => handleLogout(),
            handleUserAddProfile: (profile) => handleAddProfile(profile),
            handleUserRemoveProfile: () => handleRemoveProfile(),

            //Camera reducer
            cameraList: stateCameraReducer.cameraList,
            currentCamera: stateCameraReducer.currentCamera,
            fetchCameras: (data) => handleGetCameras(data),
            setCurrentCamera: (camera) => setCurrentCamera(camera),

            //Vehicle reducer
            vehicleList: stateVehicleReducer.vehicleList,
            currentVehicle: stateVehicleReducer.currentVehicle,
            fetchVehicles: (data) => getVehicles(data),
            setCurrentVehicle: (vehicle) => setCurrentVehicle(vehicle),

            //Handle auth
            handleAuth: (props) => handleAuthentication(props),
            authObj: auth
          }}>
          <Routes />
      </Context.Provider>
      </div>
    )
}


export default ContextState;