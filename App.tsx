/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import React from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';
// import Login from './src/components/Login';

// function App(): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaView>
//       <Login/>
//     </SafeAreaView>
//   );
// }
import React from 'react';
import UserRegistry from './src/components/UserRegistry';
import Home from './src/components/Home';
import Login from './src/components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Cadastro de Usuário' component={UserRegistry}/>
        <Stack.Screen name='Início' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
