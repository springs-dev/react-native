import React from 'react';
import { StyleSheet, Modal, Picker, View, TouchableOpacity, Text } from 'react-native';

export default DefaultPicker = ({ visible, selectedValue, changeValue, list, hideModal }) => (
	<Modal onRequestClose={() => null} visible={visible} animationType="slide" transparent>
		<View style={styles.picker}>
			<View style={styles.topLine}>
				<TouchableOpacity onPress={hideModal}>
					<Text style={styles.text}>Done</Text>
				</TouchableOpacity>
			</View>
			<Picker selectedValue={selectedValue} onValueChange={changeValue}>
				{
					list.map(item => (
						<Picker.Item key={item} label={item} value={item} />
					))
				}
			</Picker>
		</View>
	</Modal>
);

const styles = StyleSheet.create({
	picker: {
		backgroundColor: '#fff',
		width: '100%',
		bottom: 0,
		position: 'absolute',
	},
	topLine: {
		borderBottomColor: '#ddd',
		borderBottomWidth: 1,
		height: 45,
		alignItems: 'flex-end',
		justifyContent: 'center'
	},
	text: {
		color: '#007aff',
		fontSize: 17,
		paddingHorizontal: 15
	}
});