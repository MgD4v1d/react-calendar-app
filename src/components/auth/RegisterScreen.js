import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';

import "./login.css";

export const RegisterScreen = () => {


  const dispatch = useDispatch();

  const [inputValues, handleInputChange] = useForm({
    name: '',
    email: '',
    password: '',
    password2: ''
  });


  const {name, email, password, password2} = inputValues;


  const handleRegister = (e) => {
    e.preventDefault();

    if(isValidRegisterForm()){
      dispatch(startRegister(name, email, password));
    }


  }


  const isValidRegisterForm = () => {

    if(validator.isEmpty(name)){
      Swal.fire('Error', 'El campo "Nombre" es requerido', 'error');
      return false;
    }else if(name.length <= 2){
      Swal.fire('Error', 'El nombre debe ser de almenos 3 caracteres', 'error');
      return false;
    }else if( !validator.isEmail(email)){
      Swal.fire('Error', 'El correo no tiene un formato valido', 'error');
      return false;
    }else if(password.length <= 2){
      Swal.fire('Error', 'La contraseña al menos debe terner 6 caracteres', 'error');
      return false;
    }else if(password !== password2){
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return false;
    }
    return true
  }

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-12 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="name"
                value={name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Correo"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="password2"
                value={password2}
                onChange={handleInputChange}
              />
            </div>

            <div className=" mt-4 d-grid gap-2">
              <button type="submit" className="btn btn-primary btnSubmit">
                Crear Cuenta
              </button>
            </div>
          </form>
          <Link
          className="text-white text-decoration-none"
          to="/auth/login"
          >
              ¿Ya tienes una cuenta?
          </Link>
        </div>
      </div>
    </div>
  );
};
