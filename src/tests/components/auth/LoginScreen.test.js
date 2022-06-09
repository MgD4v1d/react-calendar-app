import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { MemoryRouter } from 'react-router-dom';

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin } from '../../../actions/auth';


jest.mock('../../../actions/auth',()=>({
    startLogin: jest.fn()
}))

const middlewares= [thunk];

const mockStore = configureStore(middlewares);

const initState = {};

const store = mockStore (initState);

store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
)


describe('Pruebas en <LoginScreen />', () => {
    
    test('debe hacer match con el snapshot', () => {
        
        expect(wrapper).toMatchSnapshot();

    });

    test('debe de llamar el dispatch del login', () => {
    
        wrapper.find('input[name="email"]').simulate('change', {
            target:{
                name: 'email',
                value: 'example2@example.com'
            }
        });


        wrapper.find('input[name="password"]').simulate('change', {
            target:{
                name: 'password',
                value: '123456'
            }
        });


        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });


        expect(startLogin).toHaveBeenCalledWith('example2@example.com', '123456');

    });


    

});