import React, {useState} from 'react';
import {TextInput, SafeAreaView, StyleSheet, Text, Button, View, Alert, Pressable} from 'react-native';

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
});

const Login = ({navigation}: any) => {
  const [password, setPassword] = useState<string>();
  const [text, setText] = useState<string>();
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

  return (
    <SafeAreaView style={styles.backColor}>
      <View style={styles.header}>
        <Text style={styles.text}>Login</Text>
      </View>

      <View style={styles.loginContainer}>
        <Text>E-mail</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={onChangeInput}
        />
        {hasErrorText ? <Text>Digite pelo menos 6 caracteres</Text> : null}

        <Text>Senha</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={onChangePassword}
        />
        {hasErrorPassword ? <Text>Digite pelo menos 6 caracteres</Text> : null}

        <Pressable
          style={styles.button} 
          onPress={() => {
            if(hasErrorText === true) {
              console.warn('Preencha o campo E-mail!')
              return
            }
            if(hasErrorPassword === true) {
              console.warn('Preencha o campo Senha!')
              return 
            }
            navigation.navigate('Home', {id: 1});
          }}>
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Login;
