import {connect} from "react-redux";
import Form from "./form";
import {signup} from "../../actions/session_actions"

const msp = (state) => {
    return {
        errors: errors.session,
        formType: 'Signup',
    }
}

const mdp = (dispatch) => {
    return {
        userForm: (user) => dispatch(signup(user))
    }
}

export default connect(msp, mdp)(Form);