import { createReducer } from '@reduxjs/toolkit';
import { types } from '../types/types';

const initialState = {
    modalOpen: false,
}

export const uiReducer = createReducer(initialState, (builder)=> {
    
    builder
        .addCase( types.uiOpenModal, (state, action) => {
            return {
                ...state,
                modalOpen: true,
            }
        })
        .addCase( types.uiCloseModal, (state, action) => {
            return {
                ...state,
                modalOpen: false,
            }

        })
        .addDefaultCase( (state, action) => {
            return state;
        });

})