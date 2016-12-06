import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  DatePickerAndroid,
  TouchableHighlight,
} from 'react-native';
import Card from './Card';
import FriendPicker from './FriendPicker';

export default class SantaEventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: 'Choose a day to exchange gifts',
    }
  }

  datePress = async () => {
    try {
      const {action, month, day, year} = await DatePickerAndroid.open({date: new Date()});
      if (action !== DatePickerAndroid.dismissedAction) {
        let dateStr = `${month} / ${day} / ${year}`;
        this.setState({
          date: dateStr
        });
      }
    } catch (e) {
      Alert.alert(this);
    }
  }

  render() {
    return (
      <View>
        <Card title="Set a Date">
          <View>
            <TouchableHighlight
              onPress={this.datePress}>
              <Text>{this.state.date}</Text>
            </TouchableHighlight>
          </View>
        </Card>
        <FriendPicker />
        <View style={{marginTop: 30, marginHorizontal: 40}}>
          <Button title="Finish" onPress={()=>null} />
        </View>
      </View>
    );
  }
}
