import {AUTH,LOGOUT} from "../constants/actionTypes";

const authReducer = (state = {authData : null},action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem("profile",JSON.stringify(action?.payload)); //? "?."  is Optional Chaining Operator Which doesnt give errror if action is undefined.
                                                                                //? It will simply return undefined
            return {...state,authData:action?.payload};
        case LOGOUT:
            localStorage.removeItem("profile");
            return {...state,authData:null};    
        default:
            return state;
    }
}

export default authReducer;