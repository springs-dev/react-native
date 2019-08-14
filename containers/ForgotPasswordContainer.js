import { connect } from 'react-redux';
import { ForgotPassword } from '../../screens/ios';

import { forgotPassword, clearFPValidate } from '../../actions';

const mstp = ({ validation }) => ({
 validation: validation.forgotPasswordValidation
});

const mdtp = {
 forgotPassword,
 clearFPValidate
};

export default connect(mstp, mdtp)(ForgotPassword);