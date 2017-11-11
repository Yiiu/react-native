import * as React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle
} from 'react-native'

interface IProps {
  title: string
}
interface IState {

}

export default class Header extends React.Component<IProps, IState> {
  static defaultProps = {
    title: ''
  }
  render () {
    const { title } = this.props;
    return (
      <View style={ styles.layout }>
        <Text style={ styles.title }>{ title }</Text>
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