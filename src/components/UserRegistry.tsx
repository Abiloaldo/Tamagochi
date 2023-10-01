import React, {useState} from 'react';
import {TextInput, SafeAreaView, StyleSheet, Text, Button, View, Alert, Pressable, Image, ImageBackground} from 'react-native';
import axios from 'axios';

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

const UserRegistry =  ({navigation}: any) => {
  const [password, setPassword] = useState<string>();
  const [text, setText] = useState<string>();
  const [passwordVerification, setPasswordeVerification] = useState<string>();

  const [hasErrorText, setHasErrorText] = useState(true);
  const [hasErrorPassword, setHasErrorPassword] = useState(true);
  const [hasErrorPasswordVerification, setHasErrorPasswordVerification] = useState(true);

  const onChangePasswordVerification = (value: string) => {
    if (value.length >= 6) {
      setHasErrorPasswordVerification(false);
    } else {
      setHasErrorPasswordVerification(true);
    }
    setPasswordeVerification(value);
  };

  const onChangeInput = (value: string) => {
    if (value.length >= 6) {
      setHasErrorText(false);
    } else {
      setHasErrorText(true);
    }
    setText(value);
  };

  const onChangePassword = (value: string) => {
    if (value.length >= 6) {
      setHasErrorPassword(false);
    } else {
      setHasErrorPassword(true);
    }
    setPassword(value);
  };

  const UserRegistry = async () => {
    try {
      const {data} = await axios.post('https://tamagochiapi-clpsampedro.b4a.run/register', {
        email: text,
        password: password,
      });
      Alert.alert('Sucesso', 'O usuário foi cadastrado com sucesso!', [{ text: 'Ok', onPress: () => {navigation.navigate('Login')}}]);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'O cadastro não foi efetivado!');
    }
  }

  const validateInput = () => {
    if(hasErrorText === true) {
      Alert.alert('Erro', 'Preencha o campo E-mail com ao menos 6 caracteres!')
      return
    }
    if(hasErrorPassword === true) {
      Alert.alert('Erro', 'Preencha o campo Senha com ao menos 6 caracteres!')
      return 
    }
    if(hasErrorPasswordVerification === true) {
      Alert.alert('Erro', 'Preencha o campo de confirmação da Senha com ao menos 6 caracteres!')
      return 
    }
    if(password !== passwordVerification) {
      Alert.alert('Erro', 'As senhas inseridas não são iguais!')
      return
    }
    UserRegistry();
  }

  return (
    <SafeAreaView style={styles.backColor}>
      <ImageBackground source={require('../images/Tamagochi.jpg')} style={styles.image}>
        <View style={styles.loginContainer}>
          <Text style={styles.containerText}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={onChangeInput}
          />

          <Text style={styles.containerText}>Senha</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            value={password}
            onChangeText={onChangePassword}
          />

          <Text style={styles.containerText}>Confirme sua Senha</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            value={passwordVerification}
            onChangeText={onChangePasswordVerification}
          />

          <Pressable
            style={styles.button} 
            onPress={() => {validateInput()}}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </Pressable>
        </View>
        </ImageBackground>
      </SafeAreaView>
  );
}

export default UserRegistry;