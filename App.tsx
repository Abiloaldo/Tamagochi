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
import PetRegistry from './src/components/PetRegistry';
import PetEdition from './src/components/PetEdition';
const App = () => {

  type InputProps = {
    petId: Number
  }
  const Stack = createNativeStackNavigator();
  const StackEdition = createNativeStackNavigator<InputProps>();
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Cadastro de Usuário' component={UserRegistry}/>
        <Stack.Screen name='Início' component={Home} />
        <Stack.Screen name='Cadastro de Pet' component={PetRegistry} />
        <StackEdition.Screen name='Edição de Pet' component={PetEdition}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
