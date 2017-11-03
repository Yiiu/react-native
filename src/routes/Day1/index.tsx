import * as React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle
} from 'react-native'

interface IProps {

}

interface IState {
  visible: boolean
}

import Modal from './Modal'

export default class Day1 extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)
    this.state = {
      visible: false
    }
  }
  render () {
    const { visible } = this.state;
    return (
      <View style={ styles.layout }>
        <Modal
          visible={ visible }
          onClose={ () => this.setState({visible: false}) }
        />
        <TouchableOpacity onPress={ () => this.setState({visible: true}) }>
          <Text>123123123</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff'
  } as ViewStyle
})