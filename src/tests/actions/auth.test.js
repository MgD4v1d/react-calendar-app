import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import { startChecking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';

import * as fetchModule from '../../helpers/fetch';


jest.mock('sweetalert2', () =>({
    fire: jest.fn(),
}))

const middlewares= [thunk];

const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore (initState);

Storage.prototype.setItem = jest.fn();

describe('Pruebas en las acciones del Auth', () => {
    
    beforeEach(()=>{
        store = mockStore(initState);
        jest.clearAllMocks();
    });


    test('startLogin correcto', async () => {

        
        
        await store.dispatch(startLogin('example@example.com', '123456'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));


    // const token = localStorage.setItem.mock.calls[0][1];
     
    });


    test('startLogin incorrecto', async() => {
        
        await store.dispatch(startLogin('example@example.com', '12345564'));
        let actions = store.getActions();

        expect(actions).toEqual([]);

        expect(Swal.fire).toBeCalledWith('Error', 'La contraseña es incorrecta', 'error');

        await store.dispatch(startLogin('example@examplsed.com', '123456'));
        actions = store.getActions();

        expect(Swal.fire).toBeCalledWith('Error', 'El usuario no existe con ese email', 'error');

    });


    test('startRegister correcto', async () => {

        fetchModule.fetchSinToken = jest.fn(()=>({
            json(){
                return {
                    ok: true,
                    uid: '12345',
                    name: 'testResp',
                    token: '4s21xe21c2z2vc4sdf1w95dv4vw4sd.fgadsf'
                }
            }
        }));
        
        await store.dispatch(startRegister('test','test@test.com', '123456'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload:{
                uid: '12345',
                name: 'testResp'
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', '4s21xe21c2z2vc4sdf1w95dv4vw4sd.fgadsf');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    });


    test('startChecking correcto', async () => {

        fetchModule.fetchConToken = jest.fn(()=>({
            json(){
                return {
                    ok: true,
                    uid: '12345',
                    name: 'testResp',
                    token: '4s21xe21c2z2vc4sdf1w95dv4vw4sd.fgadsf'
                }
            }
        }));
        
        await store.dispatch(startChecking());

        const actions = store.getActions();

        expect( actions[0]).toEqual({
            type: types.authLogin,
            payload:{
                uid: '12345',
                name: 'testResp'
            }
        });


        expect(localStorage.setItem).toHaveBeenCalledWith('token', '4s21xe21c2z2vc4sdf1w95dv4vw4sd.fgadsf');


    });

});