import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert
} from 'react-native';

import store from 'react-native-simple-store';
import Store from 'react-native-store';


export default class EditScreen extends Component<{}> {
  static navigationOptions = {
    title: 'Edit Caffe',
  };

  DB = {
    'caffeDb' : Store.model('caffesDb')
  }
  constructor(props) {
    super(props);
    this.state = { 
      id: this.props.navigation.state.params.name,
      name: '',
      address: '',
      phone: '',
    };
   
  }

  componentDidMount() {
    this.DB.caffeDb.find({
      where:{
       _id: this.state.id
      }
    }).then(resp =>  
      this.setState({
      name: resp[0].name,
      address: resp[0].address,
      phone: resp[0].phone
    })
    );
    
  }
  
  render() {
   
    return (
      <View >
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
        onPress={() => this.updateData(this.state.id,this.state.name,this.state.address,this.state.phone)}
        title="Update Caffe"
      />
	  <Button
	     style = {{padding : 10 }}
		onPress={() => this.deleteData(this.state.id)}
		title="Delete Caffe"
	  />
      </View>
    );
  }
  updateData(id,name,address,phone){
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
        
        const { navigate } = this.props.navigation
        this.DB.caffeDb.updateById(caffe,id)
        Alert.alert(
          "Caffe updated!",
          "",
          [
          // {text: 'Cancel', style: 'cancel'},
          {text: 'OK', onPress: () => navigate("HomeScreen")}
          ]
        )
        this.setState({
          name: '',
          address: '',
          phone: ''
        })

    }
  }
  
  deleteData(id) {
	  const { navigate } = this.props.navigation
	  Alert.alert(
    'Warning!',
    'Are you sure you want tu delete this caffe?',
    [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: () => {
        this.DB.caffeDb.removeById(id),
		this.componentDidUpdate(),
		navigate("HomeScreen")
        }
      },
    ],
  )
  }
  
  componentDidUpdate(){
  this.DB.caffeDb.find().then(resp =>  this.setState({list:resp}))  
}
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    height: 80
  }
});
