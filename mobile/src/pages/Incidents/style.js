import React from 'react';
import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
	strong: {
		fontWeight: 'bold'
	},

	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: Constants.statusBarHeight + 20,
		backgroundColor: '#eee'
	},

	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	headerText: {
		fontSize: 16,
		color: 'gray',
	},

	title: {
		fontSize: 30,
		marginBottom: 16,
		marginTop: 32,
		fontWeight: 'bold'
	},
	description: {
		fontSize: 16,
		lineHeight: 24,
		color: 'gray'
	},

	incidentList: {
		marginTop: 32
	},
	incident: {
		padding: 24,
		borderRadius: 16,
		backgroundColor: 'white',
		marginBottom: 16
	},
	incidentProperty: {
		fontSize: 15,
		fontWeight: 'bold'
	},
	incidentValue: {
		marginTop: 3,
		marginBottom: 7,
		fontSize: 15
	},
	detailsButton: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	detailsButtonText: {
		color: '#E02041',
		fontSize: 15,
		fontWeight: 'bold'
	}
});