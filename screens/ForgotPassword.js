import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Field, ScreenTitle, ScreenSubtitle } from '../../components/ios';
import { InitialButton } from '../../components/common';

export default class ForgotPassword extends Component {
	state = {
		buttonActive: false,
		email: '',
		validation: null
	};

	onChangeEmail = (email) => {
		if(this.state.validation) this.props.clearFPValidate();
		this.setState({email, buttonActive: email });
	}
	
	forgotPassword = () => {
		this.props.forgotPassword({email: this.state.email});
	}

	static getDerivedStateFromProps(props) {
		return { validation: props.validation };
	}

  render() {
		const { buttonActive, validation } = this.state;

    return (
			<View style={styles.container}>
				<View>
					<ScreenTitle text="Forgot Password" />
					<View style={styles.subtitle}>	
						<ScreenSubtitle textAlign="left" text="The link to password recovery will be sent to your e-mail." />
					</View>
					<Field 
						error={validation && validation.email} 
						onChangeText={this.onChangeEmail} 
						keyboardType="email-address" 
						label="E-mail" />
				</View>
				<View style={styles.button}>
					<InitialButton onPress={this.forgotPassword} isActive={buttonActive} text="Send" />
				</View>		
			</View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between'
	},
	subtitle: {
		marginVertical: 10,
		marginHorizontal: 24
	},
	button: {
		marginBottom: 32,
		width: '75%',
		alignSelf: 'center'
	}
});