import * as React from 'react'
import { StackNavigator, NavigationScreenProp } from 'react-navigation'
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Dimensions,
  ScrollView,
  Image,
  ImageStyle,
  TouchableOpacity
} from 'react-native'

import Header from './components/Header'
import Navigator from './routes'
import Day1 from './routes/Day1'

let { height: windowHeight, width: windowWidth } = Dimensions.get('window')

interface IProps {
  navigation: NavigationScreenProp<{}, {}>
}

interface IState {

}

class MainScreen extends React.Component<IProps, IState> {
  render() {
    const {navigate} = this.props.navigation
    return (
      <View style={ styles.container }>
        <StatusBar
          animated
          translucent
          barStyle="dark-content"
          backgroundColor="rgba(0, 0, 0, .1)"
        />
        <Header /> 
        <ScrollView contentContainerStyle={[styles.layout]}>
          <TouchableOpacity
            activeOpacity={ 0.8 }
            style={[{ width: windowWidth / 2, height:  windowWidth / 2 }, styles.cardBox]}
            onPress={() => navigate('Day1')}
          >
            <View style={ styles.card }>
              <Image
                source={{ uri: 'https://picsum.photos/800/800/?blur&random' }}
                style={[{  width: windowWidth / 2, height:  windowWidth / 2 }, styles.bg]}
                resizeMode="cover"
              />
              <View style={[{ width: windowWidth / 2, height:  windowWidth / 2 }, styles.mask ]} />
              <Text style={ styles.title }>Day1</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

export default StackNavigator(
  {
    Index: {
      screen: MainScreen
    },
    Day1: {
      screen: Day1
    }
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none',
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  } as ViewStyle,
  layout: {
    flex: 1,
    flexDirection: 'row'
  } as ViewStyle,
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  } as ViewStyle,
  cardBox: {
  } as ViewStyle,
  bg: {
    position: 'absolute'
  } as ImageStyle,
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, .2)'
  } as ViewStyle,
  title: {
    color: '#fff',
    fontSize: 34
  } as TextStyle
})