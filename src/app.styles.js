import { StyleSheet } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const style = theme => {
  const css = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      //  backgroundColor: colors.,
    },
    button: {
      marginTop: 15,
      backgroundColor: '#000'
    },
    sectionContainer:{
      marginTop: 32,
      marginBottom: 32,
      paddingHorizontal: 24,
      backgroundColor: theme.color.primary
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
  });
  return css
}


export default style