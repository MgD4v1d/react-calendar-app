import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CalendarModal } from '../../../components/calendar/CalendarModal';

import moment from 'moment';

import Modal from 'react-modal';
import { eventStartUpdate, eventClearActiveEvent, startAddNew } from '../../../actions/events';
import Swal from 'sweetalert2';
Modal.setAppElement('body');



jest.mock('../../../actions/events',()=>({
    eventStartUpdate: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    startAddNew: jest.fn(),
}));


jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

// Storage.prototype.setItem = jest.fn();

const middlewares= [thunk];

const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');


const initState = {
    auth:{
        checking: false,
        uid: '123456',
        name: 'Peter'
    },
    ui:{
        modalOpen: true
    },
    calendar:{
        events:[],
        activeEvent:{
            title: 'hola',
            notes: 'mundo',
            start: now.toDate(),
            end: nowPlus1.toDate(),
            user:{
                _id: 'asd5f15asd1f51asd1f2as1',
                name: 'Juan'
            },
            id: '8a4sd8fas8d1c8asd1c8sd51c55c'
        }
    }
};

const store = mockStore (initState);

store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarModal />
    </Provider>
)



describe('Pruebas en <CalendarModal />', () => {


    beforeEach(()=>{
        jest.clearAllMocks()
    });
    

    test('debe mostrar el modal', () => {
        
        expect(wrapper.find('Modal').prop('isOpen')).toBe(true);

    });

    test('debe de llamar la accion de actualizar y cerrar modal', () => {
        
        act(()=>{

            wrapper.find('form').prop('onSubmit')({
                preventDefault(){}
            });
    
            expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
            expect(eventClearActiveEvent).toHaveBeenCalled();
        })

        

    });


    test('debe de mostrar error si falta el titulo', () => {
        
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);

    });


    test('debe de crear un nuevo evento', () => {

        const initState = {
            auth:{
                checking: false,
                uid: '123456',
                name: 'Peter'
            },
            ui:{
                modalOpen: true
            },
            calendar:{
                events:[],
                activeEvent: null
            }
        };
        
        const store = mockStore (initState);
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={store}>
                <CalendarModal />
            </Provider>
        );


        wrapper.find('input[name="title"]').simulate('change', {
            target:{
                name: 'title',
                value: 'Hola pruebas'
            }
        });


        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect(startAddNew).toHaveBeenCalledWith({
            end: expect.anything(),
            start: expect.anything(),
            title: 'Hola pruebas',
            notes: ''
        });

        expect(eventClearActiveEvent).toHaveBeenCalled();
        
    });


    test('debe de validar las fechas', () => {
        
        wrapper.find('input[name="title"]').simulate('change', {
            target:{
                name: 'title',
                value: 'Hola pruebas'
            }
        });

        const hoy = new Date();


        act(()=>{
            wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy);
        });


        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect(Swal.fire).toHaveBeenCalledWith( "Error", "fecha de fin no puede ser igual que la fecha de inicio", "error");

    });

});