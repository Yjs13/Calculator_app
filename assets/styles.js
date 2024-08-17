import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#525c4f',
      flex: 1,
      paddingHorizontal: 8,
      paddingBottom: 8,
    },
    displayContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginBottom: 14,
    },
    // display field css
    // css for displaying the equation and result on the calculator
    displayPressedValue: {
      fontFamily:'Sn-mid',
      fontSize: 64,
      color: '#F1C376',
      maxHeight: '80%',
    },
    displayResultValue:{
      fontSize:50,
      color: '#F7E6C4',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 7,
    },
    button: {
      backgroundColor: '#F1C376',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 4,
      height: 83,
      borderRadius: 50,
    },
    buttonRow1: {
      backgroundColor: '#F7E6C4',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 4,
      height: 83,
      borderRadius: 50,
    },
    buttonText: {
      fontFamily:'Sn-mid',
      fontSize: 38,
      color: '#525c4f',
      marginBottom: 5,
    },
    coralColor: {
      backgroundColor: '#EA5455',
    },
    whiteColor: {
      color: '#fff',
    },
    buttonZero: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    buttonZeroText: {
      color: '#fff',
      textAlign: 'left',
      paddingLeft: 35,
    },
});

export {styles}
  