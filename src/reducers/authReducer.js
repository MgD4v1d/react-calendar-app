import { createReducer } from "@reduxjs/toolkit";
import { types } from "../types/types";

const initailState = {
    checking: true,
    // uid: null,
    // name: null
}



export const authReducer = createReducer(initailState, (builder) => {
    builder
        .addCase(types.authLogin, (state, action)=>{
            return {
                ...state,
                checking: false,
                ...action.payload
            }
        })
        .addCase(types.authCheckingFinish, (state)=>{
            return {
                ...state,
                checking: false
            }
        })
        .addCase(types.authLogout, ()=>{
            return {
                checking: false
            }
        })
        .addDefaultCase((state) => {
            return state;
        })
});