import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  cardTitle: {
    borderBottomWidth: 0.5,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 2.5,
    borderBottomColor: '#d6d7da',
    backgroundColor: 'rgb(231, 59, 59)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  giftCardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(252, 222, 203)'
  },
  cardTitleText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white'
  },
  cardContainer: {
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#ffffff',
    margin: 10,
    marginVertical: 5,
    overflow: 'hidden',
    // width: 300,
    // height: 300
  },
  listItem: {
    fontWeight: '400',
    fontSize: 14
  },
  children: {
    margin: 10
  },
  button: {
    width: windowWidth * .3,
  },
  input: {
    height: 40,
  },
  navView: {
    // paddingTop: 80,
    backgroundColor: 'rgb(252, 222, 203)'
  },
  navText: {
    margin: 8,
    marginTop: 15,
    fontSize: 16,
    color: 'white'
  },
  navBar: {
    backgroundColor: 'rgb(231, 59, 59)',
    padding: 20,
  },
  // completeButton: {
  //   // flexDirection: 'row-reverse',
  //   // justifyContent: 'space-between',
  //   // marginVertical: 10,
  //   // marginHorizontal: 10,
  //   backgroundColor: '#ff6347',
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0
  // }
});
