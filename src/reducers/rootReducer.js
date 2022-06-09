import { authReducer } from './authReducer';
import { calendarReducer } from './calendarReducer';
import { uiReducer } from './uiReducer';



export const rootReducer = ({
    auth: authReducer,
    ui: uiReducer,
    calendar: calendarReducer,
})
