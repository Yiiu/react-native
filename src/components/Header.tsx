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
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9'
  } as ViewStyle,
  title: {
    fontSize: 28
  } as TextStyle
})