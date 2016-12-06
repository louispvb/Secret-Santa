import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import Card from './Card';
import styles from './Styles';

export default class FriendPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      friendsList: []
    }
  }

  addFriend = () => {
    if (this.state.text.length) {
      let newFList = this.state.friendsList;
      newFList.push(this.state.text);
      this.setState({
        friendsList: newFList
      });
      this._textInput.setNativeProps({text: ''})
      this.setState({text: ''});
    }
  }

  render() {
    return (
      <Card title="Invite Your Friends">
        <View style={{flex: 1, flexDirection: 'row', height: 40}}>
          <View style={{flex: .6}}>
            <TextInput
              ref={component => this._textInput = component}
              style={styles.input}
              placeholder="Friend's name"
              onChangeText={(text) => this.setState({text})}
              onSubmitEditing={this.addFriend} />
          </View>
          <View>
            <Button
              title="Add"
              onPress={this.addFriend}
              color="#777"/>
          </View>
        </View>
        <View>
          {this.state.friendsList.map((f, i) => (
            <Text key={i} style={styles.listItem}>{'   • ' + f}</Text>),
          )}
        </View>
      </Card>
    );
  }
}
