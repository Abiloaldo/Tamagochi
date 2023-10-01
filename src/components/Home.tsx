import React, {useState} from 'react';
import {TextInput, SafeAreaView, StyleSheet, Text, Button, View, Alert, Pressable, Image, ImageBackground} from 'react-native';
//import CadastroUsuario from './CadastroUsuario';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    input: {
      height: 50,
      width: 300,
      margin: 5,
      borderWidth: 1,
      borderRadius: 4,
      padding: 10,
      
    },
    button: {
      height: 50,
      width: 300,
      margin: 5,
      borderWidth: 1,
      borderRadius: 4,
      backgroundColor: '#00b300'
    },
    header: {
      padding: 10,
      backgroundColor: '#d9d9d9',
    },
    text: {
      fontWeight: 'bold',
      fontSize: 30,
      color: '#000',
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 25,
      color: '#ffff',
      justifyContent: 'center',
      textAlign: 'center'
    },
    backColor: {
      backgroundColor: '#ff471a',
      paddingBottom: 500,
    },
    loginContainer: {
      backgroundColor: '#d9d9d9',
      margin: 10,
      padding: 10,
      alignItems: 'center',
      marginTop: 100,
      borderRadius: 4,
    },
    containerText: {
      fontWeight: 'bold',
    },
    image: {
      width: '100%',
      height: 700,
    },
});

const Home = ({navigation}: any) => {
  const [token, setToken] = useState<string>();

  const getToken = async () => {
    try {
      let token = await AsyncStorage.getItem('token') || 'none';
      console.log('O token é:' + token)
    } catch (error) {
      console.log(error);
    }  
    return token;
  };

  return(
    <SafeAreaView>
      <Text>OI</Text>
      <Pressable
            style={styles.button} 
            onPress={() => {getToken()}}>
            <Text style={styles.buttonText}>Testar</Text>
          </Pressable>
    </SafeAreaView>
  );
};

export default Home;