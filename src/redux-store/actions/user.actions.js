import { actionsConstants } from '../../constants';
import { appActions } from '../actions';
import { userService } from '../../services';

const { userConstants } = actionsConstants;
export const userLogin = (user) => {
    return (dispatch) => {
        dispatch(appActions.showLoading());

        userService.userLogin(user).then(response => {
            console.log(response);
            dispatch({
                type: userConstants.USER_LOGIN_SUCCESS,
                user: response
            });
            dispatch(appActions.hideLoading());

        })
            .catch();
    };
};

export const userLogout = () => {
    return (dispatch) => {
        dispatch({ type: userConstants.USER_LOGOUT, user: {} });
    };
};

export default {
    userLogin,
    userLogout
}