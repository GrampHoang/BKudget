import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
        height: 40,
        borderWidth: 1,
        borderColor: '#000000',
        backgroundColor: '#95C0E7',
        textAlign: 'center',
        padding: 5,
        fontSize: 20,
    },
    container: {
        flex: 1,
        paddingTop: 0,
        flexDirection: 'column',
        //alignItems: "center",
        justifyContent: "center",
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      height: 400,
      width: 300,
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      borderColor: 'black',
      borderWidth: 1,
      padding: 10,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 30,
      margin: 20,
      textAlign: "center",
    },
    buttontextStyle: {
      color: '#16B830',
      fontSize: 40,
      fontWeight: 'bold', 
      marginTop: 30,
    },
    input: {
      borderColor: '#000000',
      borderWidth: 1,
      borderRadius: 10,
      width: 245,
      height: 50,
      margin: 10,
      backgroundColor: '#EFEFEF',
      textAlign: 'center',
      fontSize: 20,
    }
});

export default styles;