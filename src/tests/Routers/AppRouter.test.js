import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AppRouter } from '../../Routers/AppRouter';



const middlewares= [thunk];

const mockStore = configureStore(middlewares);



// store.dispatch = jest.fn();




describe('pruebas en <AppRouter />', () => {
    
    test('debe mostrar el "Espere..."', () => {

        const initState = {
            auth:{
                checking:true
            }
        };
        
        const store = mockStore (initState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );


        // expect(wrapper).toMatchSnapshot();

        expect(wrapper.find('h1').exists()).toBe(true);
        
    });


    test('debe de mostrar la ruta publica', () => {

        const initState = {
            auth:{
                checking:false,
                uid:null
            }
        };
        
        const store = mockStore (initState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();

        expect(wrapper.find('.login-container').exists()).toBe(true);
        
    });


    test('debe de mostrar la ruta privada', () => {

        const initState = {
            auth:{
                checking:false,
                uid: '123456',
                name: 'Test'
            },
            calendar:{
                events:[]
            },
            ui:{
                modalOpen: false
            }
        };
        
        const store = mockStore (initState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();

        expect(wrapper.find('.calendar-screen').exists()).toBe(true);
        
    });


});