import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";


export const startAddNew = ( event ) => {
    return async( dispatch, getState ) => {

        const {uid, name} = getState().auth;

        try {
            const resp = await fetchConToken('events/new', event, 'POST')
            const body = await resp.json();

            if(body.ok){

                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                }

                dispatch(eventAddNew(event));
            }

        } catch (error) {
            console.log(error)
        }

    }
}



export const startLoadingEvents = () => {
    return async (dispatch) => {

        try{

            const resp = await fetchConToken('events');
            const body = await resp.json();

            const events = prepareEvents( body.eventos );

            if(body.ok){
                dispatch(eventLoaded(events));
            }


        }catch(error){
            console.log(error);
        }

    }
}


export const eventStartUpdate = ( event ) => {
    return async (dispatch) => {

        try {
            
            const resp = await fetchConToken(`events/edit/${ event.id }`, event, 'PUT');
            const body = await resp.json();

            if(body.ok){
                dispatch(eventUpdated(event));
            }else{
                Swal.fire('Error', body.msg , 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}


export const eventStartDelete = () => {
    return async (dispatch, getState) => {

        const { id } = getState().calendar.activeEvent;


        try {

            const resp = await fetchConToken(`events/delete/${id}`, {}, 'DELETE');
            const body = await resp.json();

            if(body.ok){
                dispatch(eventDeleted());
            }else{
                Swal.fire('Error', body.msg , 'error');
            }

            
        } catch (error) {
            console.log(error);
        }

    }
}


const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});


export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});


export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent,
});


export const eventLogoutClean = () => ({
    type: types.eventLogoutCleaning,
})

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

const eventDeleted = () => ({
    type: types.eventDeleted,
})


const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})