import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { MemoryRouter } from 'react-router-dom';

import Swal from 'sweetalert2';

import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { startRegister } from '../../../actions/auth';




jest.mock('../../../actions/auth',()=>({
    startRegister: jest.fn()
}));

jest.mock('sweetalert2', () =>({
    fire: jest.fn(),
}))

const middlewares= [thunk];

const mockStore = configureStore(middlewares);

const initState = {};

const store = mockStore (initState);

store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
)



describe('Pruebas en el <RegisterScreen />', () => {


    beforeEach(() => {
        jest.clearAllMocks();
    })
    

    test('debe hacer match con el snapshot', () => {
        
        expect(wrapper).toMatchSnapshot();

    });


    test('No hay registro si las contraseñas son diferentes', () => {

        wrapper.find('input[name="email"]').simulate('change', {
            target:{
                name: 'name',
                value: 'Peter'
            }
        });

        wrapper.find('input[name="email"]').simulate('change', {
            target:{
                name: 'email',
                value: 'example@example.com'
            }
        });

        wrapper.find('input[name="password"]').simulate('change', {
            target:{
                name: 'password',
                value: '1234567'
            }
        });

        wrapper.find('input[name="password2"]').simulate('change', {
            target:{
                name: 'password2',
                value: '123456'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Las contraseñas no coinciden', 'error');
        expect(startRegister).not.toHaveBeenCalled();

    });

    test('debe dispararse el registro con contraseñas iguales', () => {
        
        wrapper.find('input[name="email"]').simulate('change', {
            target:{
                name: 'name',
                value: 'Peter'
            }
        });

        wrapper.find('input[name="email"]').simulate('change', {
            target:{
                name: 'email',
                value: 'example@example.com'
            }
        });

        wrapper.find('input[name="password"]').simulate('change', {
            target:{
                name: 'password',
                value: '123456'
            }
        });

        wrapper.find('input[name="password2"]').simulate('change', {
            target:{
                name: 'password2',
                value: '123456'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect(Swal.fire).not.toHaveBeenCalledWith('Error', 'Las contraseñas no coinciden', 'error');
        expect(startRegister).toHaveBeenCalled();

    });

});