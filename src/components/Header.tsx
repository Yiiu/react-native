import * as React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle
} from 'react-native'

interface IProps {

}
interface IState {

}

export default class Header extends React.Component<IProps, IState> {
  render () {
    return (
      <View style={ styles.layout }>
        <Text style={ styles.title }>Day</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  layout: {
    height: 90,
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-start'
  } as ViewStyle,
  title: {
    fontSize: 28
  } as TextStyle
})