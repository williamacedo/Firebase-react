import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import firebase from 'firebase';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nome:'Carregando..',
      nomeInput:'',
      idadeInput:''
    };

    console.disableYellowBox = true;

   /*
   firebase.database().ref("usuarios/1/nome").on('value', (snapshot) => {
     let state = this.state;
     state.nome = snapshot.val();
     this.setState(state);
   });
   */
   /*
   firebase.database().ref("usuarios/1/nome").once('value').then((snapshot) => {
     let state = this.state;
     state.nome = snapshot.val();
     this.setState(state);

  });*/

  this.inserirUsuario = this.inserirUsuario.bind(this);

  //firebase.database().ref('contagem').set('10');
  let id = '-LIMuCZRG1WCWPAeoKiv';

  firebase.database().ref('usuarios/2').remove();
}

  inserirUsuario() {
    if(this.state.nomeInput.length > 0){
      let usuarios = firebase.database().ref('usuarios');
      let chave = usuarios.push().key;

      usuarios.child(chave).set({
        nome:this.state.nomeInput,
        idade:this.state.idadeInput
      });

      alert("Usuario Inserido");

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Nome do Usuario</Text>
        <TextInput style={styles.input} onChangeText={(nomeInput) => this.setState({nomeInput})} />

        <Text>Idade do usuario</Text>
        <TextInput style={styles.input} onChangeText={(idadeInput) => this.setState({idadeInput})} />

        <Button title="Inserir Usiario" onPress={this.inserirUsuario} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 20
  },
  input:{
    height: 40,
    borderWidth: 1,
    borderColor: '#FF0000'
  }
});
