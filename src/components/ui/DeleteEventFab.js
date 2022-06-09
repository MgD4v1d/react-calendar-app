import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../actions/events';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleClickDelete = () => {
        dispatch(eventStartDelete());
    }

  return (
    <button
        className="btn btn-danger fab-delete"
        onClick={ handleClickDelete }
    >
        <i className="far fa-trash-alt"></i> Borrar evento
    </button>
  )
}
