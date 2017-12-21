/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Alert
} from 'react-native';

import Mailer from 'react-native-mail';
import store from 'react-native-simple-store';
import Store from 'react-native-store';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class HomeScreen extends Component<{}> {
    static navigationOptions = {
        title: 'Home Screen',
      };
    
  DB = {
        'caffeDb' : Store.model('caffesDb')
      }
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      address: '',
      phone: '',
    };
    
  }
  

  componentDidMount() {
     this.DB.caffeDb.find().then(resp => this.setState({items: resp}));
  }

  render() {
    const { navigate } = this.props.navigation
    
    return (
      <View style={{padding: 10}}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={this.state.name}
        onChangeText={(name) => this.setState({name})}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={this.state.address}
        onChangeText={(address) => this.setState({address})}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={this.state.phone}
        onChangeText={(phone) => this.setState({phone})}
      />
      <Text
      style = {{padding : 10 }}
      />
      <Button
        onPress={() => this.saveData(this.state.name,this.state.address,this.state.phone)}
        title="Add Caffe"
      />
       <Text
      style = {{padding : 10 }}
      />
      <Button
        onPress={() =>this.sendEmail(this.state.name,this.state.address,this.state.phone)}
        title="Send Email"
        />
      <Text
      style = {{padding : 10 }}
      />
      <Button
        onPress={() => navigate("ListScreen")}
        title="Show all Caffes"
        />
		<Text
      style = {{padding : 10 }}
      />
		<Button
        onPress={() => navigate("ChartScreen")}
        title="Display chart"
        />
         {/* <Text
      style = {{padding : 10 }}
      />
      <Button
        //onPress={() => navigate("ListScreen")}
        onPress={()=> this.showall()}
        title="Show Caffes"
        /> */}
      </View>
  );
}

  saveData(name, address, phone){
    if(name === '' || address === '' || phone ===""){
      Alert.alert(
        "All rows are required!"
      )
    }else{
        const caffe = {
            name:name,
            address:address,
            phone:phone
        };
        //store.delete('cars')
        //store.push('cars',car);
        this.DB.caffeDb.add(caffe);
        Alert.alert(
          "Caffe Saved!"
        )
        this.setState({
          name: '',
          address: '',
          phone: ''
        })
    }

  }

  showall(){
      // store.get('cars').then((res)=> 
      //   Alert.alert("",JSON.stringify(res))
    //);
    this.DB.caffeDb.find().then(resp =>  Alert.alert("",JSON.stringify(resp)))

  }
  sendEmail(name,address, phone){
    if(name === '' || address === '' || phone ===""){
      Alert.alert(
        "All rows are required!"
      )
    }else{
        Mailer.mail({
        subject: 'Selected caffe',
        recipients: ['support@example.com'],
        body: '<b>'+name+"</b><p> Address: "+address+"</p><p> Phone:"+ phone+'</p>',
        isHTML: true
      }, (error, event) => {
        Alert.alert(
         'Something went wrong...'
        )
      });
      
    }
  }

}



const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    height: 80, 
  }
});
