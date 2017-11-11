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

import Task1 from './Task1'

export default StackNavigator({
  Task1: {
    screen: Task1,
  },
})