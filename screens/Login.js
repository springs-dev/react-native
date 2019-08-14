import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenSubtitle, ScreenTitle, Field, Checkbox } from '../../components/ios';
import { InitialButton } from '../../components/common';
import { EyeHide, EyeShow } from '../../components/ios/svg';

export default class Login extends Component {
	state = {
		securePassword: true,
		rememberPassword: false,
		loginButtonActive: false,
		form: {
			email: '',
			password: '',
		},
		validation: null
	};

	changeChackboxValue = (value) => {
		this.setState({[value]: !this.state[value]});
	}

	changeFormData = (key, data) => {
		if(this.state.validation) this.props.clearLoginValidate();
		this.setState({form: {...this.state.form, [key]: data}}, () => {
			this.setState({loginButtonActive: Object.values(this.state.form).every(item => Boolean(item))});
		});
	}

	login = () => {
		const { rememberPassword: remember } = this.state;
		const { email, password } = this.state.form;
		this.props.login({email, password, remember});
	}

	static getDerivedStateFromProps(props) {
		return { validation: props.validation };
	}

  render() {
		const { navigate } = this.props.navigation;
		const { securePassword, rememberPassword, loginButtonActive, validation } = this.state;

    return (
			<View style={styles.container}>
				<View style={styles.loginForm}>
					<View style={styles.form}>
						<ScreenTitle text="Login" />
						<Field 
							error={validation && validation.email} 
							onChangeText={(data) => this.changeFormData('email', data)} 
							keyboardType="email-address" 
							label="E-mail" />
						<Field 
							error={validation && validation.password} 
							onChangeText={(data) => this.changeFormData('password', data)} 
							label="Password" 
							onPress={() => this.changeChackboxValue('securePassword')} 
							secureTextEntry={securePassword}>
							{ securePassword ? <EyeHide /> : <EyeShow /> }
						</Field>
						<Checkbox
							onPress={() => this.changeChackboxValue('rememberPassword')}
							isActive={rememberPassword}
							text="Remember password?" />
					</View>
					<View style={styles.buttons}>
						<InitialButton onPress={this.login} text="Login" isActive={loginButtonActive} />
						<InitialButton onPress={() => navigate('ForgotPassword')} text="Forgot password?" backgroundColor="transparent" color="#2BF5FD" />
					</View>
				</View>

				<View style={styles.footer}>
					<ScreenSubtitle text="Don't have an account?" />
					<InitialButton onPress={() => navigate('SignUp')} text="Sign Up" backgroundColor="transparent" color="#2BF5FD" />
				</View>
			</View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingBottom: 35
	},
	form: {
		width: '100%'
	},
	loginForm: {
		width: '100%',
		alignItems: 'center'
	},
	buttons: {
		marginTop: 16,
		width: '75%'
	},
	footer: {
		width: '75%'
	}
});