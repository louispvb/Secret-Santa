import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import Card from './Card';
import Styles from './Styles';
import {assign} from 'lodash';

const GiftCards = [
  {
    title: '',
    features: [''],
    image: '',
    url: '',
    votes: 0,
    toName: '',
  }
];

// Display you've been assigned to NAME
// Your friends need help! Think these are good gifts?

class ItemDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: this.props.data.votes
    }
  }
  clipStr(str, maxLength = 100) {
    let tail = str.length > maxLength ? '...' : '';
    return str.slice(0, maxLength) + tail;
  }
  render() {
    return (
      <View>
        <View style={{flex: 1, flexDirection: 'row',
          height: 120,
          paddingTop: 20
        }}>
        { this.props.data.image ?
          (<Image
              source={{uri: this.props.data.image}}
              style={{height: 100, width: 100}}
              resizeMode="contain" />) : null }
          <Text style={{
            width: 150,
            height: 100,
            fontSize: 14,
            marginHorizontal: 8
          }}>{this.clipStr(this.props.data.features[0])}</Text>
        </View>
        <View style={{
          position: 'relative',
          top: 30
        }}>

        </View>
        <View style={{
          position: 'relative',
          top: 80,
          // left: 150,
          flex: 1,
          flexDirection: 'row'
        }}>
          <Text style={{
            fontFamily: 'sans-serif-thin',
            fontSize: 17,
            height: 30,
            width: 110,
            textAlign: 'center'
          }}>For {this.props.data.toName}</Text>
          <Text style={{
            fontFamily: 'sans-serif-thin',
            textAlign: 'center',
            fontSize: 17,
            width: 70,
            height: 30
          }}>{this.props.data.price}</Text>
          <Text style={{
            fontSize: 17,
            height: 30,
            width: 110,
            color: 'rgb(121, 182, 204)',
            textAlign: 'center'
          }}>{this.props.data.votes} Votes</Text>
        </View>
      </View>
    );
  }
}

export default class GiftSwipeCards extends Component {
  constructor(props) {
    super(props);
    let mockNames = ['Will', 'Fiona', 'Evan', 'Bing', 'Yoshi', 'Rebecca'];
    let randomName = () => mockNames[Math.floor(Math.random() * mockNames.length)];
    fetch('http://santaserver.louispvb.com/api/sampleItems')
      .then(data => data.json())
      .then(gifts => {
        // GiftCards[0].features[0] = JSON.stringify(gifts);
        gifts = gifts.map(g =>
          assign(g, {
            votes: Math.floor(Math.random() * 8),
            toName: randomName()
          })
        );
        this.setState({cards: gifts});
      });
    this.state = {
      cards: GiftCards
    };
  }
  handleYup() {
    console.log('Yup');
  }
  handleNope() {
    console.log('Nope');
  }

  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        containerStyle={Styles.giftCardContainer}
        renderCard={(cardData) =>
          <Card
            title={cardData.title}
            style={{
              width: 300,
              height: 300,
              marginBottom: 100
            }}>
            <ItemDesc
              data={cardData}
              />
          </Card>}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        showYup={true}
      />
    );
  }
};
