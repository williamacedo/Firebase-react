import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import firebase from 'firebase';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email:'',
      senha:'',
      novaSenha:''
    };

    this.redefinir = this.redefinir.bind(this);

    let config = {
       apiKey: "AIzaSyCStywi2WBlq4U6PbfDQ01zkSDWWCZGLwg",
       authDomain: "projeto-teste-4354f.firebaseapp.com",
       databaseURL: "https://projeto-teste-4354f.firebaseio.com",
       projectId: "projeto-teste-4354f",
       storageBucket: "projeto-teste-4354f.appspot.com",
       messagingSenderId: "949847838320"
     };

    firebase.initializeApp(config);

    firebase.auth().signOut();

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        user.updatePassword(this.state.novaSenha);
        alert("Senha alterada com sucesso");
        //user.updateEmail('...');
      }
    });

  }

  redefinir() {

    firebase.auth().signInWithEmailAndPassword(
      this.state.email,
      this.state.senha
    ).catch((error) =>{
      alert(error.code);
    });

  }

  render() {

    return(
      <View style={styles.container}>
        <Text style={styles.h1}>Redefinir Senha</Text>

        <Text>E-mail:</Text>
        <TextInput onChangeText={(email) => this.setState({email})} style={styles.input} />

        <Text>Antiga Senha:</Text>
        <TextInput onChangeText={(senha) => this.setState({senha})} style={styles.input} />

        <Text>Nova Senha:</Text>
        <TextInput onChangeText={(novaSenha) => this.setState({novaSenha})} style={styles.input} />

        <Button onPress={this.redefinir} title="Redefinir Senha" />
      </View>
    );

  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    margin: 20
  },
  h1:{
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
