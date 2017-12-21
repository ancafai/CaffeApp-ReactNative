import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Alert
} from 'react-native';

import store from 'react-native-simple-store';
import Store from 'react-native-store';


export default class ListScreen extends Component<{}> {
  static navigationOptions = {
    title: 'Caffe List',
  };

  DB = {
    'caffeDb' : Store.model('caffesDb')
  }
  constructor(){
    super();
    this.state={
      list: ''
    }
    
    // store.get('cars').then((res)=>
    // this.setState({
    //     list:res
    // })
    // );
}
componentDidMount() {
  this.DB.caffeDb.find().then(resp =>  this.setState({list:resp}))
}
componentDidUpdate(){
  this.DB.caffeDb.find().then(resp =>  this.setState({list:resp}))  
}

render(){
   const { navigate } = this.props.navigation
  return(
    <View style={{alignItems: 'center'}}>
      <FlatList
        data = {this.state.list}
        renderItem={({item}) => 
          <Text style = {styles.input} numberOfLines={5} onPress={() => navigate('EditScreen', {name: item._id})}>
            Caffe Name: {item.name+'\n'}
            Address: {item.address+'\n'}
            Phone: {item.phone} 
            </Text>
        }
       keyExtractor={(item, key) => key}  
      />
    </View>
  )
}


}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    height: 130
  }
});
