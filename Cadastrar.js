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

   this.cadastrar = this.cadastrar.bind(this);
  }

  cadastrar() {
    firebase.auth().createUserWithEmailAndPassword(
      this.state.email,
      this.state.senha
    ).catch((error) => {

      switch (error.code) {
        case 'auth/weak-password':
          alert("Sua senha deve conter pelo menos 6 caracteres!");
          break;
        case 'auth/email-already-in-use':
          alert("Este e-mail ja tem conta.");
          break;
        default:
          alert("Ocorreu um erro! Tente novamente mais tarde");
          alert(error.code);
        break;
      }

    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>E-mail</Text>
        <TextInput onChangeText={(email) => this.setState({email})} style={styles.input} />
        <Text>Senha</Text>
        <TextInput secureTextEntry={true} onChangeText={(senha) => this.setState({senha})} style={styles.input} />

        <Button title="Cadastrar" onPress={this.cadastrar} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  input:{
    height: 40,
    borderWidth: 1,
    borderColor: '#000000',
    margin:10
  }
});
