import { actionsConstants } from '../../constants';

const initialState = {};

const userActionsConstants = actionsConstants.userConstants;


export const user = (state = initialState, action) => {
    switch (action.type) {
        case userActionsConstants.USER_LOGIN_SUCCESS:
            return {
                ...(action.user)
            };
        case userActionsConstants.USER_LOGOUT:
            return {};
        default:
            return state;
    }
};