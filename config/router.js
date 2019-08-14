import React from 'react';
import { createAppContainer, createSwitchNavigator, createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { Login, Dashboard, Synchronization, ProductDetails } from '../containers';
import { Menu } from '../screens';
import { Header } from '../components';

const stackOpt = {
	defaultNavigationOptions: ({ navigation }) => ({
		gesturesEnabled: false,
		header:  <Header navigation={navigation} />
	}),
	cardStyle: {
		backgroundColor: '#f3f4f3'
	}
};

const dashboardStack = createStackNavigator({ Dashboard }, stackOpt);
const syncStack = createStackNavigator({ Synchronization }, stackOpt);
const productStack = createStackNavigator({ ProductDetails }, stackOpt);

const drawerStack = createDrawerNavigator({ productStack, dashboardStack, syncStack }, {
	contentComponent: Menu,
	drawerLockMode: 'locked-closed'
});

export default createAppContainer(createSwitchNavigator({ drawerStack, Login }));