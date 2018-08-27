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

    this.logar = this.logar.bind(this);
    this.sair = this.sair.bind(this);

    console.disableYellowBox = true;


   //firebase.auth().signOut();

   firebase.auth().onAuthStateChanged((user) => {
     if(user) {
       alert("Logado!");
     }
   });
}

  logar() {

    firebase.auth().signInWithEmailAndPassword(
      this.state.email,
      this.state.senha
    ).catch((error) => {
      if(error.code = 'auth/wrong-password') {
        alert("Senha errada");
      } else {
        alert("Tente novamente mais tarde!");
      }
    });

  }

  sair() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <Text>E-mail</Text>
        <TextInput onChangeText={(email) => this.setState({email})} style={styles.input} />
        <Text>Senha</Text>
        <TextInput secureTextEntry={true} onChangeText={(senha) => this.setState({senha})} style={styles.input} />

        <Button title="Logar" onPress={this.logar} />

        <Button title="Sair" onPress={this.sair} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
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
