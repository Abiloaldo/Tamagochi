import React, {useState, useEffect} from 'react';
import {TextInput, SafeAreaView, StyleSheet, Text, Button, View, Alert, Pressable, Image, ImageBackground} from 'react-native';
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
      height: 40,
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
    nameContainer: {
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

const PetRegistry =  ({navigation}: any) => {
  const [token, setToken] = useState<string>();
  const [name, setName] = useState<string>();
  const [hasErrorName, setHasErrorName] = useState(true);

  //pegar o token no momento da montagem do componente
  useEffect(() => {
    getToken()
  }, [])

  const getToken = async () => {
    try {
      let userToken = await AsyncStorage.getItem('token') || 'none'
      setToken(userToken)
    } catch (error) {
      console.log(error)
    }  
  };

  const onChangeName = (value: string) => {
    if (value.length >= 6) {
      setHasErrorName(false);
    } else {
      setHasErrorName(true);
    }
    setName(value);
  };

  const petRegistry = async () => {
    try {
      const {} = await axios.post('https://tamagochiapi-clpsampedro.b4a.run/pet', {name: name},{headers:{'x-access-token': token}});
      Alert.alert('Sucesso', 'O Pet foi cadastrado com sucesso!', [{ text: 'Ok', onPress: () => {navigation.navigate('Início')}}]);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'O cadastro não foi efetivado!');
    }
  };

  const validateInput = () => {
    if(hasErrorName === true) {
      Alert.alert('Erro', 'Preencha o campo "Nome do Pet" com ao menos 6 caracteres!')
      return
    }
    petRegistry();
  }

  return (
    <SafeAreaView style={styles.backColor}>
      <ImageBackground source={require('../images/Tamagochi.jpg')} style={styles.image}>
        <View style={styles.nameContainer}>
          <Text style={styles.containerText}>Nome do Pet</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={onChangeName}
          />

          <Pressable
            style={styles.button} 
            onPress={() => {validateInput()} }>
            <Text style={styles.buttonText}>Cadastrar</Text>         
          </Pressable>
        </View>
        </ImageBackground>
      </SafeAreaView>
  );

}

export default PetRegistry;