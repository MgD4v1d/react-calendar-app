import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Calendar, momentLocalizer  } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';

import { messages } from '../../helpers/calendar-messages-es';

import { uiOpenModal } from '../../actions/ui';

import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { eventClearActiveEvent, eventSetActive, startLoadingEvents } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

import 'moment/locale/es-mx';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('es-mx');

const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

  const dispatch = useDispatch();
  const {events, activeEvent } = useSelector(state => state.calendar);
  const { uid } = useSelector(state => state.auth);

  const [lastView, setLastView] = useState(localStorage.getItem('calendarLastView') || 'month');


  useEffect(()=>{

    dispatch(startLoadingEvents())

  }, [dispatch]);

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  }

  const onSelectEvent = (eventCalendar) => {
    dispatch(eventSetActive(eventCalendar));
  }

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('calendarLastView', e);
  }

  const onSelectSlot = (e) => {
    dispatch(eventClearActiveEvent())
  }

  const eventStyleGetter = (event, start, end, isSelected) => {


    const style = {
      backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: '#fff',
    }

    return {
      style
    }

  }

  return (
    <div className='calendar-screen'>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  messages={ messages }
                  eventPropGetter={eventStyleGetter}
                  onDoubleClickEvent={onDoubleClick}
                  onSelectEvent={onSelectEvent}
                  onView={ onViewChange }
                  onSelectSlot = { onSelectSlot }
                  selectable={true}
                  view={ lastView }
                  components={{
                    event: CalendarEvent,
                  }}
                />
            </div>
          </div>
        </div>

        <AddNewFab />

        {
          activeEvent &&
            <DeleteEventFab />
        }        

        <CalendarModal />
    </div>
  )
}
