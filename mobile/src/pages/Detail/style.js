import {StyleSheet} from 'react-native';
import Constants from 'expo-constants'

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: Constants.statusBarHeight + 20
	},

	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	incident: {
		padding: 24,
		borderRadius: 16,
		backgroundColor: 'white',
		marginBottom: 16,
		marginTop: 48
	},
	incidentProperty: {
		fontSize: 15,
		fontWeight: 'bold',
		marginTop: 16
	},
	incidentValue: {
		marginTop: 3,
		fontSize: 15
	},
	contactBox: {
		padding: 24,
		borderRadius: 16,
		backgroundColor: 'white',
		marginBottom: 16
	},
	heroTitle: {
		fontWeight: 'bold',
		fontSize: 20,
		lineHeight: 30
	},
	heroDescription: {
		fontSize: 15,
		marginTop: 16
	},
	actions: {
		marginTop: 16,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	action: {
		backgroundColor: '#E02041',
		borderRadius: 16,
		height: 50,
		width: '48%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	actionText: {
		color: 'white',
		fontSize: 15,
		fontWeight: 'bold'
	}
});