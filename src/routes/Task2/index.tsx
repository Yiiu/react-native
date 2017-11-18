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

const HEADER_MAX_HEIGHT = 230;
const HEADER_MIN_HEIGHT = 80;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

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
    headerValue: new Animated.Value(0)
  }

  screen: any = null
  
  scrollY: Animated.Value = new Animated.Value(0)

  imageLoaded = () => {
    this.setState({ screen: findNodeHandle(this.screen), referenceReady: true });
  }

  scrollView: any

  render () {
    const headerHeight = this.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    })
    const { visible } = this.state;
    let uri = 'https://picsum.photos/500/400'
    return (
      <View style={styles.container}>
        {/* <Header title="2123"/> */}
        <Animated.View
          style={{ flex: 1 }}
        >
          <Animated.View
            removeClippedSubviews
            style={[styles.header, {
              height: headerHeight
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
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.scrollY}}}]
            )}
          >
            <View style={{ height: HEADER_MAX_HEIGHT }} />
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
    overflow: 'hidden',
    position: 'absolute',
    zIndex: 0,
    top: 0,
    left: 0
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth,
    height: 400
  } as ViewStyle,
});