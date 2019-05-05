import { actionsConstants } from '../../constants';

const initialState = {
    blockUiSpinner: false
};

const appActionsConstants = actionsConstants.appConstants;


export const app = (state = initialState, action) => {
    switch (action.type) {

        case appActionsConstants.SHOW_LOADING:
            return {
                ...state,
                blockUiSpinner: true,
            };
        case appActionsConstants.HIDE_LOADING:
            return {
                ...state,
                blockUiSpinner: false
            };
        default:
            return state;
    }
};