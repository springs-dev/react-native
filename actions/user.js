export const login = (navigation, data) => async dispatch => {
	if(passwordValidation(data.password)) {
		dispatch(toggleModalStatus());
		const { status, data: { password } } = await axios.post('/auth/login/', data);

		if(status === 200) {
			await getUser(navigation)(dispatch);
		} else {
			dispatch({
				type: LOGIN_VALIDATION,
				payload: {
					validation: {
						password: password[0]
					}
				}
			})
		}
		dispatch(toggleModalStatus());
	} else {
		dispatch({
			type: LOGIN_VALIDATION,
			payload: {
				validation: {
					password: 'The password must contain at least one letter and at least one digit or punctuation character'
				}
			}
		})
	}
};

export const getUser = ({ navigate }) => async dispatch => {
	const netinfo = await NetInfo.isConnected.fetch();

	if(netinfo) {
		const { status, data: user } = await axios.get('/auth/whoami/');
		
		if(status === 200) {
			axios.defaults.headers.post['X-CSRFToken'] = await CookieManager.get(api.path).then(res => res.csrftoken);

			dispatch({
				type: LOG_IN,
				payload: { user }
			})
		} else {
			logout({ navigate })(dispatch);
		}
	}
};