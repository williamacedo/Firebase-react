import React from 'react';
import { StyleSheet, Text, View,FlatList } from 'react-native';
import firebase from 'firebase';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lista:[]
    };

    console.disableYellowBox = true;


   firebase.database().ref('usuarios').on('value', (snapshot) => {
     let state = this.state;
     state.lista = [];

     snapshot.forEach((childItem)=>{
       state.lista.push({
         key:childItem.key,
         nome:childItem.val().nome,
         idade:childItem.val().idade
       });
     });

     this.setState(state);
   });

  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.lista} renderItem={({item}) => <Text>{item.nome}, {item.idade} anos.</Text>} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  }
});
