import { actionsConstants } from '../../constants';

const { appConstants } = actionsConstants;

export default {
    showLoading: () => {
        return (dispatch) => dispatch({ type: appConstants.SHOW_LOADING, blockUiSpinner: true });
    },
    hideLoading: () => {
        return (dispatch) => dispatch({ type: appConstants.HIDE_LOADING, blockUiSpinner: false });
    }
};