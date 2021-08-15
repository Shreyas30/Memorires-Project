import * as api from "../api/index.js";
import { AUTH } from '../constants/actionTypes';

//* Action Creators
export const signin = (formData,history) => async (dispatch) => {
    try {
        const {data} = await api.singIn(formData);  

        
        dispatch({type:AUTH,payload:data }); // This will go to Reducer for updating State
                                              //* Here,You need dispatch Action not Return
       
        history.push("/"); //? REdirect to Home Page

    }catch(err){
        console.error(err);
    }
}

export const signup = (formData,history) => async (dispatch) => {
    try {
        
        const {data} = await api.singUp(formData);  
        dispatch({type:AUTH,payload:data }); // This will go to Reducer for updating State
                                              //* Here,You need dispatch Action not Return
        
        history.push("/"); //? REdirect to Home Page

    }catch(err){
        console.error(err);
    }
}