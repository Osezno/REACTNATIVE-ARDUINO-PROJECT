import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeView from './src/views/HomeView';
import LoginView from './src/views/LoginView';

// ver como usar useEffect
// usar redux
// crerar un login

const Stack = createStackNavigator();




const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="Details" component={LoginView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
