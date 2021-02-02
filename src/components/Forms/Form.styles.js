import { StyleSheet } from 'react-native';

const box = {
    width: '100%',
    padding: 7,
    borderRadius: 4
}
const color = {
    success: "#000",
    error:"#fff"
}

const css = StyleSheet.create({
    // modal: {
    //     background: "#fff"
    // },
    input:{
        padding:5,
        marginBottom:5,
    },
    button:{
        backgroundColor:'#000',
        marginBottom:5
    },
    form: {
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        marginBottom: '10px',
    },
    inputs: {
        margin: 4,
        width: '100%',
    },
    success: {
        backgroundColor: color.success,
        ...box
    },
    error: {
        backgroundColor: color.error,
        ...box
    },
    // pictureWrap: {
    //     width: '100px',
    //     height: '100px',
    //     position: 'relative',
    //     backgroundSize: 'cover',
    //     borderRadius: '50px',
    //     margin: '0 auto',
    //     //  borderRadius:'50%',
    // },
    // picture: {
    //     width: '100px',
    //     height: '100px',

    //     //  borderRadius:'50%',
    // },
    // belowDivIcon: {
    //     position: 'absolute',
    //     bottom: '0px',
    //     right: '0px',
    // }
});

export default css
