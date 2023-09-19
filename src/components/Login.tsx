import React, {useState} from 'react';
import {TextInput, SafeAreaView, StyleSheet, Text, Button, View, Alert, Pressable} from 'react-native';
//import CadastroUsuario from './CadastroUsuario';
import axios from 'axios';
import Home from './Home';

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
});

const Login = ({navigation}: any) => {
  const [password, setPassword] = useState<string>();
  const [text, setText] = useState<string>();
  const [register, setRegister] = useState(false);
  const [hasErrorText, setHasErrorText] = useState(true);
  const [hasErrorPassword, setHasErrorPassword] = useState(true);

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

  const ValidateUser = async () => {
    try {
      const {data} = await axios.post('https://tamagochiapi-clpsampedro.b4a.run/login', {
        email: text,
        password: password,
      });
      Alert.alert('Sucesso', 'O login foi concluído com sucesso!')
      // <Home/>;
    } catch (error) {
      Alert.alert('Erro', 'Usuário não encontrado! Deseja cadastrar novo usuário com os dados inseridos?', [
        { text: 'Cadastrar', onPress: () => {UserRegistry()}}, { text: 'Sair'}
      ]);
    }
  };

  const UserRegistry = async () => {
    try {
      const {data} = await axios.post('https://tamagochiapi-clpsampedro.b4a.run/register', {
        email: text,
        password: password,
      });
      Alert.alert('Sucesso', data);
      //<Home/>;
    } catch (error) {
      Alert.alert('Erro', String(error));
    }
  }

  return (
    <SafeAreaView style={styles.backColor}>
      <View style={styles.header}>
        <Text style={styles.text}>Login</Text>
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.containerText}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={onChangeInput}
        />
        {/* {hasErrorText ? <Text>Digite pelo menos 6 caracteres</Text> : null} */}

        <Text style={styles.containerText}>Senha</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={onChangePassword}
        />
        {/* {hasErrorPassword ? <Text>Digite pelo menos 6 caracteres</Text> : null} */}

        <Pressable
          style={styles.button} 
          onPress={() => {
            if(hasErrorText === true) {
              Alert.alert('Erro', 'Preencha o campo E-mail com ao menos 6 caracteres!')
              return
            }
            if(hasErrorPassword === true) {
              Alert.alert('Erro', 'Preencha o campo Senha com ao menos 6 caracteres!')
              return 
            }
            ValidateUser()
          }}>
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Login;