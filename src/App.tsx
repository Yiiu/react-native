import * as React from 'react'
import { StackNavigator, NavigationScreenProp } from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'
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
  TouchableOpacity,
  Easing,
  Animated
} from 'react-native'

import Header from './components/Header'
import Navigator from './routes'
import Task1 from './routes/Task1'
import Task2 from './routes/Task2'

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
        <Header title="RN-Task" /> 
        <ScrollView contentContainerStyle={[styles.layout]}>
          <TouchableOpacity
            activeOpacity={ 0.8 }
            style={[{ width: windowWidth / 2, height:  windowWidth / 2 }, styles.cardBox]}
            onPress={() => navigate('Task1')}
          >
            <View style={ styles.card }>
              <Image
                source={{ uri: 'https://picsum.photos/800/800/?blur&random' }}
                style={[{  width: windowWidth / 2, height:  windowWidth / 2 }, styles.bg]}
                resizeMode="cover"
              />
              <View style={[{ width: windowWidth / 2, height:  windowWidth / 2 }, styles.mask ]} />
              <Text style={ styles.title }>Task1</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={ 0.8 }
            style={[{ width: windowWidth / 2, height:  windowWidth / 2 }, styles.cardBox]}
            onPress={() => navigate('Task2')}
          >
            <View style={ styles.card }>
              <Image
                source={{ uri: 'https://picsum.photos/800/800/?blur&random' }}
                style={[{  width: windowWidth / 2, height:  windowWidth / 2 }, styles.bg]}
                resizeMode="cover"
              />
              <View style={[{ width: windowWidth / 2, height:  windowWidth / 2 }, styles.mask ]} />
              <Text style={ styles.title }>Task2</Text>
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
    Task1: {
      screen: Task1
    },
    Task2: {
      screen: Task2
    }
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none',
    transitionConfig: () => ({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal
    })
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