import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";


const initailState = {
    checking: true,
}

describe('Pruebas en el authReducer', () => {
    
    test('debe de retornar el estado por defecto', () => {

        const state = authReducer(initailState, {});

        expect(state).toEqual(initailState);
        
    });

    test('debe de hacer la accion de authLogin y loguear al usuario', () => {
        
        const action = {
            type: types.authLogin,
            payload:{
                uid: '123',
                name: 'test'
            }
        }

        const state = authReducer(initailState, action);

        expect(state).toEqual( { checking: false, uid: '123', name: 'test' })

    });


    test('authCheckingFinish debe poner el checkin el false', () => {


        const state = authReducer(initailState, {
            type: types.authCheckingFinish,
        });

        expect(state).toEqual({ checking: false });

    });

    test('authLogout debe hacer el logout', () => {
        
        const initState = { 
            checking: false, 
            uid: '123', 
            name: 'test' 
        }

        const action = {
            type: types.authLogout
        }

        const state = authReducer(initState, action);

        expect(state).toEqual({ checking: false });

    });

});