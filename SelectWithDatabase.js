import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import firebase from 'firebase';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email:'',
      senha:''
    };

    console.disableYellowBox = true;

    this.logar = this.logar.bind(this);

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

    firebase.auth().onAuthStateChanged((user) =>{
      if(user) {
        firebase.database().ref('usuarios').child(user.uid).once('value')
        .then((snapshot)=>{
            let nome = snapshot.val().nome;
            alert("Seja bem vindo, "+nome);
        });
      }
    });
}

  logar() {
    firebase.auth().signInWithEmailAndPassword(
      this.state.email,
      this.state.senha
    ).catch((error) =>{
      alert(error.code);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Tela de Login</Text>

        <Text>E-mail</Text>
        <TextInput onChangeText={(email)=>this.setState({email})} style={styles.input} />

        <Text>Senha</Text>
        <TextInput onChangeText={(senha)=>this.setState({senha})} style={styles.input} />

        <Button title="Logar" onPress={this.logar} />
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
