import * as React from 'react'
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ViewStyle,
  Image,
  findNodeHandle,
  Dimensions,
  RefreshControl,
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
  ScrollViewStatic
} from 'react-native'
import { BlurView } from 'react-native-blur';

import Header from '../../components/Header'
let { height: windowHeight, width: windowWidth } = Dimensions.get('window')

interface IProps {

}

interface IState {
  visible: boolean
  referenceReady: boolean
  screen: any
  headerValue: Animated.Value
  scrollEnabled: boolean
}

export default class Task2 extends React.PureComponent<IProps, IState> {
  public state = {
    visible: false,
    referenceReady: false,
    screen: null,
    scrollEnabled: false,
    headerValue: new Animated.Value(280)
  }

  screen: any = null
  
  componentWillMount () {
    this.createPanResponder()
  }
  
  pan: PanResponderInstance

  imageLoaded = () => {
    this.setState({ screen: findNodeHandle(this.screen), referenceReady: true });
  }

  createPanResponder = () => {
    let animEvt = Animated.event([null, {dy: this.state.headerValue}]);
  
    let onPanStart = (e: GestureResponderEvent, state: PanResponderGestureState) => {
      return true
    }
    let onPanMove = (e: GestureResponderEvent, state: PanResponderGestureState) => {
      if (this.scrollView) {

        this.scrollView.scrollResponderScrollTo({x: 0, y: 0, animated: true})
      }
      // if (state.dy < 0) {
      //   animEvt(e, {...state, dy: 30});
      // } else {
      //   animEvt(e, state);
      // }
      // if (state.dy > 0) {
      //   this.setState({
      //     scrollEnabled: true
      //   })
      // }
    }
    let onPanRelease = (e: GestureResponderEvent, state: PanResponderGestureState) => {
      // if (state.dy > 50) {
      //   if (this.props.onClose) {
      //     this.props.onClose()
      //   } else {
      //     this.animateOpen()
      //   }
      // } else {
      //   this.animateOpen()
      // }
    }
    this.pan = PanResponder.create({
      onStartShouldSetPanResponder: onPanStart,
      onPanResponderMove: onPanMove,
      onPanResponderRelease: onPanRelease,
      onPanResponderTerminate: onPanRelease,
    });
  }

  scrollView: any

  render () {
    const { visible } = this.state;
    let uri = 'https://picsum.photos/500/400'
    return (
      <View style={styles.container}>
        {/* <Header title="2123"/> */}
        <Animated.View
          style={{ flex: 1 }}
          { ...this.pan.panHandlers }
        >
          <Animated.View
            removeClippedSubviews
            style={[styles.header, {
              height: this.state.headerValue
            }]}
          >
            <Image
              ref={(img) => { this.screen = img; }}
              onLoadEnd={this.imageLoaded}
              source={{uri}}
              style={styles.image}
            />
            {
              this.state.referenceReady &&
              <BlurView
                style={styles.absolute}
                viewRef={this.state.screen}
                blurType="light"
                blurAmount={8}
              />
            }
          </Animated.View>
          <ScrollView
            ref={ ref => this.scrollView = ref }
            overScrollMode="never"
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => console.log(123)}
                tintColor="#ff0000"
                title="Loading..."
                titleColor="#00ff00"
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor="#ffff00"
              />
            }
          >
            <View>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
              <Text>123123123</Text>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  } as ViewStyle,
  image: {
    width: windowWidth,
    height: 280
  } as ViewStyle,
  header: {
    overflow: 'hidden'
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth,
    height: 390
  } as ViewStyle,
});