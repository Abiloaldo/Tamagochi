import React, { useEffect, useState } from "react";
import { View, SafeAreaView, ActivityIndicator, FlatList, Text, Image, StyleSheet, Pressable, ImageBackground, Alert, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { useCallback } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const styles = StyleSheet.create({
    background: {
        alignItems: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#000',
    },
    listItem: {
        padding: 3,
        margin: 3,
        borderRadius: 5,
        backgroundColor: '#d9d9d9',
        flexDirection:'row',
    },
    countryImage: {
        height: '100%', 
        width:'40%',
        resizeMode: 'contain',
    },
    listRow: {
        columnGap: 5,
        flexDirection: 'row',
    },
    listRowId: {
        fontWeight: 'bold',
        color: '#000',
    },
    rowContainer: {
        margin: 10,
        paddingRight: 10
    },
    logoutButton: {
        height: 40,
        width: 70,
        margin: 5,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#A12'
    },
    button: {
        height: 40,
        width: 300,
        margin: 5,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#00b300'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#ffff',
        justifyContent: 'center',
        textAlign: 'center'
    },
    image: {
        width: '100%',
        height: 700,
    },
    viewContainer: {
        backgroundColor: '#d9d9d9',
        margin: 5,
        padding: 4,
        alignItems: 'center',
        borderRadius: 4,
    },
    editButton: {
        height: 35,
        width: 65,
        margin: 5,
        padding: 3,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#3242a8'
    },
    deleteButton: {
        height: 35,
        width: 70,
        margin: 5,
        padding: 3,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#A12'
    }
});

type ListItemProps = {
    pet: {
        id: Number,
        name: String,
        life: Number,
        createdAt: Date,
    }
}

type ListRowProps = {
    id: string,
    value: any,
}

const Home = ({navigation}: any) => {
    const [pets, setPets] = useState([])
    const [loading, setLoading] = useState(false)

    const getToken = async () => {
        try {
          let userToken = await AsyncStorage.getItem('token') || 'none'
         return userToken
        } catch (error) {
          console.log(error)
          Alert.alert("Erro","Erro ao obter token de autenticação!")
        }  
    };

    const ListRow = ({id , value}: ListRowProps) => {
        return(
            <View style={styles.listRow}>
                <Text style={styles.listRowId}>{id}</Text>
                <Text>{value}</Text>
            </View>
        );
    };
    
    const ListItem = ({pet}: ListItemProps) => {
    
        return(
            <View style={styles.listItem}>
                <View style={styles.rowContainer}>
                    <ListRow  id={"Nome:"} value={pet.name}/>
                    <ListRow  id={"Pontos de Vida:"} value={pet.life}/>
                    <ListRow  id={"Data de Nascimento:"} value={pet.createdAt}/>
                    <View style={{rowGap: 5, flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                        <Pressable
                            style={styles.editButton} 
                            onPress={() => {navigation.navigate('Edição de Pet', {petId: pet.id})} }>
                            <Text style={{fontSize:20, fontWeight:'bold'}}>Editar</Text>         
                        </Pressable>
                        <Pressable
                            style={styles.deleteButton} 
                            onPress={() => {Alert.alert('Alerta', 'Deseja realmente excluir o Pet selecionado?', [
                                { text: 'Excluir', onPress: () => {deletePet(pet.id)}}, { text: 'Cancelar'}
                            ]);} }>
                            <Text style={{fontSize:20, fontWeight:'bold'}}>Excluir</Text>         
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    }
    
    const deletePet = async (petId : Number) => {
        try {
            const token = await getToken()
            await axios.delete('https://tamagochiapi-clpsampedro.b4a.run/pet/' + petId, {headers: {'x-access-token': token}})
            setLoading(true)
        } catch (error) {
            Alert.alert('Erro', 'A exclusão não foi realizada!')
        } finally {
            getPetsData()
            setLoading(false)
        }
    }

    //useCallBack considera os dados armazenados em cache e executa apenas quando alterado  
    const getPetsData = useCallback(async () => {
        try {
            const token = await getToken()
            setLoading(true)
            const {data} = await axios.get('https://tamagochiapi-clpsampedro.b4a.run/pets?',{headers: {'x-access-token': token}})
            setPets(data.pets)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [])

    //chamar na montagem do componente
    // useEffect(() => {
    //     getPetsData()
    // }, [])

    //chamar toda vez que a tela ganhar foco
    useFocusEffect(
        React.useCallback(() => {getPetsData()}, [])
    )

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token');        }
        catch(error) {
            console.log(error)
        }
        navigation.navigate('Login')
    }

    return (
        <SafeAreaView>
            <ImageBackground source={require('../images/Tamagochi.jpg')} style={styles.image}>
                <View style={styles.viewContainer}>
                    <View style={{rowGap: 5, flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                    <Pressable
                        style={styles.button} 
                        onPress={() => {navigation.navigate('Cadastro de Pet')} }>
                        <Text style={styles.buttonText}>Cadastrar Pet</Text>         
                    </Pressable>
                    <Pressable
                        style={styles.logoutButton} 
                        onPress={() => {logout()} }>
                        <Text style={styles.buttonText}>Sair</Text>         
                    </Pressable>
                    </View> 
                </View>
                <View>
                    {loading === true ? <ActivityIndicator size={"large"}/> : <FlatList data={pets} renderItem={({item}) => <ListItem pet={item}/>}/>}
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default Home;