import { createReducer } from '@reduxjs/toolkit';
import { types } from '../types/types';


// {
//     id: '5a4sf51sd1fa1sd5f1515sdf',
//     title: 'Cumpleaños del jefe',
//     notes: 'Hoy es el comple del jefe',
//     start:  moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     user:{
//         _id: '123',
//         name: 'Pedro',
//     }      
// }

const initialState = {
    events:[],
    activeEvent: null,
}


export const calendarReducer = createReducer(initialState, (builder)=>{
    builder
        .addCase(types.eventAddNew, (state, action)=>{
            return {
                ...state,
                events: [...state.events, action.payload]
            }
        })
        .addCase(types.eventSetActive, (state, action)=>{
            return {
                ...state,
                activeEvent: action.payload
            }
        })
        .addCase(types.eventClearActiveEvent, (state, action)=>{
            return {
                ...state,
                activeEvent: null
            }
        })
        .addCase(types.eventUpdated, (state, action)=>{
            return {
                ...state,
                events: state.events.map(
                    event => (event.id === action.payload.id) ? action.payload : event 
                )
            }
        })
        .addCase(types.eventDeleted, (state)=>{
            return {
                ...state,
                events: state.events.filter(event => event.id !== state.activeEvent.id),
                activeEvent: null
            }
        })
        .addCase(types.eventLoaded, (state, action) =>{
            return {
                ...state,
                events:[...action.payload]
            }
        })
        .addCase(types.eventLogoutCleaning, () => {
            return {
                ...initialState
            }
        })
        .addDefaultCase( (state, action) => {
            return state;
        })
})