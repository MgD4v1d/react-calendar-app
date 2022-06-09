import { types } from "../../types/types";



describe('Pruebas en Types', () => {
    
    test('los types debe ser iguales', () => {
        
        expect(types).toEqual({
            uiOpenModal: '[ui] Open modal',
            uiCloseModal: '[ui] Close modal',
        
            eventSetActive: '[event] Set active event',
        
            eventLogoutCleaning: '[event] Logout events cleaning',
        
            eventStartAddNew: '[event] Start add new ',
            eventAddNew: '[event] Add new event',
            eventClearActiveEvent: '[event] Clear active event',
            eventUpdated: '[event] Updated event',
            eventDeleted: '[event] Deleted event',
            eventLoaded: '[event] Events loaded',
        
            authCheckingFinish: '[auth] Finish checking login state',
            authStartLogin: '[auth] Start login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start register',
            authStartTokenRenew: '[auth] Start token renew',
            authLogout: '[auth] Logout',
            
        });

    });

});