import * as React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle
} from 'react-native'

import Header from '../../components/Header'

interface IProps {

}

interface IState {
  visible: boolean
}

import Modal from './Modal'

export default class Day1 extends React.PureComponent<IProps, IState> {
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
        <Header title="Task1"/>
        <Modal
          visible={ visible }
          onClose={ () => this.setState({visible: false}) }
        >
          <Header title="Modal"/>
          <Text>下拉或者点击文字按钮关闭，安卓点击返回也可以关闭</Text>
        </Modal>
        <TouchableOpacity onPress={ () => this.setState({visible: true}) }>
          <Text>弹弹弹</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#fff'
  } as ViewStyle
})