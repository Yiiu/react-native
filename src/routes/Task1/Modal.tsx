import * as React from 'react'
import {
  View,
  Text,
  Easing,
  PanResponder,
  Animated,
  Dimensions,
  StyleSheet,
  BackHandler,
  Platform
} from 'react-native'
const OS = Platform.OS
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
  isOpen: boolean
  isAnimateOpen: boolean
  isAnimateClose: boolean
}
 
export default class Modal extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    onClose: () => null
  }
  public state = {
    isOpen: this.props.visible,
    isAnimateOpen: false,
    isAnimateClose: false
  }

  opacity: Animated.Value = new Animated.Value(0)
  translateY: Animated.Value = new Animated.Value(windowHeight)

  pan: PanResponderInstance
  
  maskAnimOpen: Animated.CompositeAnimation = Animated.timing(this.opacity, {
    toValue: 1,
    duration: 250,
    useNativeDriver: true
  })
  
  contentAnimOpen: Animated.CompositeAnimation = Animated.timing(this.translateY, {
    toValue: 0,
    duration: 250,
    useNativeDriver: true
  })
  
  animOpen: Animated.CompositeAnimation = Animated.parallel([
    this.maskAnimOpen,
    this.contentAnimOpen
  ])
    
  maskAnimClose: Animated.CompositeAnimation = Animated.timing(this.opacity, {
    toValue: 0,
    duration: 250,
    useNativeDriver: true
  })
  
  contentAnimClose: Animated.CompositeAnimation = Animated.timing(this.translateY, {
    toValue: windowHeight,
    duration: 250,
    useNativeDriver: true
  })
  
  animClose: Animated.CompositeAnimation = Animated.parallel([
    this.maskAnimClose,
    this.contentAnimClose
  ])

  componentWillMount () {
    this.createPanResponder()
  }

  componentWillReceiveProps (newProps: IProps) {
    const { visible } = newProps
    if (visible !== this.props.visible) {
      if (visible) {
        if (OS !== 'ios') {
          BackHandler.addEventListener('hardwareBackPress', this.backHandle)
        }
        this.setState({
          isOpen: true
        })
        this.animateOpen()
      } else {
        if (OS !== 'ios') {
          BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
        }
        this.animateClose()
      }
    }
  }
  
  backHandle = () => {
    if (this.props.onClose) {
      this.props.onClose()
      return true
    }
  }

  stopAnimateOpen = () => {
    if (this.state.isAnimateOpen) {
      this.animClose.stop()
      this.setState({
        isAnimateOpen: false
      })
    }
  }

  animateOpen = () => {
    this.stopAnimateClose()
    this.setState({
      isAnimateOpen: true
    })
    this.animOpen.start(() => {
      this.setState({
        isAnimateOpen: false
      })
    })
  }

  stopAnimateClose = () => {
    if (this.state.isAnimateClose) {
      this.animClose.stop()
      this.setState({
        isAnimateClose: false
      })
    }
  }

  animateClose = () => {
    this.stopAnimateOpen()
    this.setState({
      isAnimateClose: true
    })
    this.animClose.start(() => {
      if (this.props.onClose) {
        this.translateY.setValue(windowHeight)
        this.setState({
          isAnimateClose: false,
          isOpen: false
        })
        this.props.onClose()
      }
    })
  }

  createPanResponder = () => {
    let animEvt = Animated.event([null, {dy: this.translateY}]);
  
    let onPanStart = (e: GestureResponderEvent, state: PanResponderGestureState) => {
      return true
    }
    let onPanMove = (e: GestureResponderEvent, state: PanResponderGestureState) => {
      if (state.dy < 0) {
        animEvt(e, {...state, dy: 0});
      } else {
        animEvt(e, state);
      }
    }
    let onPanRelease = (e: GestureResponderEvent, state: PanResponderGestureState) => {
      if (state.dy > 50) {
        if (this.props.onClose) {
          this.props.onClose()
        } else {
          this.animateOpen()
        }
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
    const { isOpen } = this.state;
    if (!isOpen) {
      return  <View/>
    }
    console.log(123123)
    return (
      <Animated.View style={ styles.layout } {...this.pan.panHandlers}>
        <Animated.View
          style={[styles.mask, {
            opacity: this.opacity
          }]}
        />
        <Animated.View
          style={[styles.content, {
            transform: [{translateY: this.translateY}]
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