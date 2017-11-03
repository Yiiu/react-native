import * as React from 'react'
import {
  View,
  Text,
  Easing,
  PanResponder,
  Animated,
  Dimensions,
  StyleSheet
} from 'react-native'

import {
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
  ViewStyle
} from 'react-native'

let { height: windowHeight, width: windowWidth } = Dimensions.get('window')

interface IProps {
  visible: boolean
  onClose?: () => any
}
  
interface IState {
  opacity: Animated.Animated
  translateY: Animated.Animated
}
 
export default class Modal extends React.Component<IProps, IState> {
  static defaultProps = {
    onClose: () => null
  }

  public state = {
    opacity: new Animated.Value(0),
    translateY: new Animated.Value(windowHeight)
  }

  pan: PanResponderInstance
  
  maskAnimOpen: Animated.CompositeAnimation = Animated.timing(this.state.opacity, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true
  })
  
  contentAnimOpen: Animated.CompositeAnimation = Animated.timing(this.state.translateY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true
  })
    
  maskAnimClose: Animated.CompositeAnimation = Animated.timing(this.state.opacity, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true
  })
  
  contentAnimClose: Animated.CompositeAnimation = Animated.timing(this.state.translateY, {
    toValue: windowHeight,
    duration: 300,
    useNativeDriver: true
  })

  _panResponder = PanResponder.create({
    // 要求成为响应者：
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
  })

  componentWillMount () {
    this.createPanResponder()
  }

  componentWillReceiveProps (newProps: IProps) {
    const { visible } = newProps
    if (visible !== this.props.visible) {
      if (visible) {
        this.animateOpen()
      }
    }
  }

  animateOpen = () => {
    Animated.parallel([
      this.maskAnimOpen,
      this.contentAnimOpen
    ]).start()
  }

  animateClose = () => {
    Animated.parallel([
      this.maskAnimClose,
      this.contentAnimClose
    ]).start(() => {
      if (this.props.onClose) {
        this.props.onClose()
      }
    })
  }

  createPanResponder = () => {
    let animEvt = Animated.event([null, {dy: this.state.translateY}]);
  
    let onPanStart = (e: GestureResponderEvent, state: PanResponderGestureState) => {
      return true
    }
    let onPanMove = (e: GestureResponderEvent, state: PanResponderGestureState) => {
      if (state.dy < 0) {
        return
      } else {
        animEvt(e, state);
      }
    }
    let onPanRelease = (e: GestureResponderEvent, state: PanResponderGestureState) => {
      if (state.dy > 50) {
        this.animateClose()
      } else {
        this.animateOpen()
      }
    }
    this.pan = PanResponder.create({
      onStartShouldSetPanResponder: onPanStart,
      onPanResponderMove: onPanMove,
      onPanResponderRelease: onPanRelease,
      onPanResponderTerminate: onPanRelease,
    });
  }
  
  render () {
    const { visible } = this.props;
    if (!visible) {
      return  <View/>
    }
    return (
      <Animated.View style={ styles.layout } {...this.pan.panHandlers}>
        <Animated.View
          style={[styles.mask, {
            opacity: this.state.opacity
          }]}
        />
        <Animated.View
          style={[styles.content, {
            transform: [{translateY: this.state.translateY}]
          }]}
        >
          { this.props.children }
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    position: 'absolute',
    zIndex: 99,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: windowWidth,
    height: windowHeight,
    flex: 1
  } as ViewStyle,
  mask: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .3)'
  } as ViewStyle,
  content: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff'
  } as ViewStyle
})