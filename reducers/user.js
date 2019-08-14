import { 
	LOG_IN, 
	UPDATE_USER_DATA,
	SIGN_UP, 
	LOG_OUT
} from '../constants/actionTypes';

const initialState = {
	user: null,
	signUpSuccess: false
};

export default (state = initialState, action) => {
	switch(action.type) {
		case LOG_IN:
			return {...state, user: action.payload.user, signUpSuccess: false};
		
		case UPDATE_USER_DATA:
			return {...state, user: action.payload.user};
		
		case SIGN_UP:
			return {...state, signUpSuccess: true};
		
		case LOG_OUT:
			return {...initialState};
		
		default:
			return state;
	}
}