import * as React from 'react'
import { StackNavigator } from 'react-navigation'
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ViewStyle,
  TextStyle
} from 'react-native'

import Day1 from './Day1'

export default StackNavigator({
  Day1: {
    screen: Day1,
  },
})