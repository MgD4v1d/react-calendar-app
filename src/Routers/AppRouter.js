import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,

} from 'react-router-dom';
import { startChecking } from '../actions/auth';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

  const dispatch = useDispatch();

  const { checking, uid } = useSelector(state => state.auth);

  useEffect(()=>{

    dispatch(startChecking());

  }, [dispatch]);


  if( checking ){
    return (<h1>Espere ...</h1>)
  }

  return (
    <Router>
        <div>
            <Switch>

                <PublicRoute 
                  path="/auth" 
                  component={AuthRouter} 
                  isLoggedIn={ !!uid } 
                />

                <PrivateRoute 
                  exact 
                  path="/" 
                  component={CalendarScreen}
                  isLoggedIn={ !!uid }  
                />

                <Redirect to="/" />

            </Switch>
        </div>
    </Router>
  )
}
