import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import firebase from 'firebase';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nome:'',
      email:'',
      senha:''
    };

    console.disableYellowBox = true;

    this.cadastrar = this.cadastrar.bind(this);

    firebase.auth().signOut();

    firebase.auth().onAuthStateChanged((user)=>{
      if(user) {
        //user.uid
        firebase.database().ref('usuarios').child(user.uid).set({
          nome:this.state.nome
        });

        alert("Usuario criado com sucesso!");
      }
    });
}

  cadastrar() {

    firebase.auth().createUserWithEmailAndPassword(
      this.state.email,
      this.state.senha
    ).catch((error) => {
      alert(error.code);
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Tela de Cadastro</Text>

        <Text>Nome</Text>
        <TextInput onChangeText={(nome)=>this.setState({nome})} style={styles.input} />

        <Text>E-mail</Text>
        <TextInput onChangeText={(email)=>this.setState({email})} style={styles.input} />

        <Text>Senha</Text>
        <TextInput onChangeText={(senha)=>this.setState({senha})} style={styles.input} />

        <Button title="Cadastrar" onPress={this.cadastrar} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  h1: {
    fontSize: 28,
    textAlign: 'center',
    margin: 20
  },
  input:{
    height: 40,
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 10
  }
});
