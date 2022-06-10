import {sendMessageCreator} from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {withAuthRedirectComponent} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';


const mapStateToProps = (state) => {
    return {
        dialogPage: state.dialogPage
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (text) => {
            dispatch(sendMessageCreator(text));
        }
    };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirectComponent)(Dialogs);