import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';

import './login.css';
import Swal from 'sweetalert2';

export const LoginScreen = () => {

  const dispatch = useDispatch();

  const [inputValues, handleInputChange] = useForm({
    email: '',
    password: ''
  });


  const { email, password } = inputValues;

  const handleLogin = (e) => {
    e.preventDefault();

    if(isValidForm()){
      dispatch(startLogin(email, password));
    }


  }


  const isValidForm = () => {
    if(!validator.isEmail(email)){
      Swal.fire('Error', 'Correo no valido', 'error');
      return false;
    }else if(password.length ===0){
      Swal.fire('Error', 'Contraseña no valida', 'error');
      return false;
    }
    return true;
  }

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-12 login-form-1">
          <h3>Login Calendar</h3>
          <form onSubmit={ handleLogin }>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="email"
                value={email}
                onChange={ handleInputChange }
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={ handleInputChange }
              />
            </div>
            <div className="form-group mt-4 d-grid gap-2">
              <input type="submit" className="btn btnSubmit" value="Login" />
            </div>
          </form>
          <Link
            className="link-secondary text-decoration-none"
            to="/auth/register"
          >
              Create a new account
          </Link>
        </div>
      </div>
    </div>
  );
};
