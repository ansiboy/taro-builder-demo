import './index.less'
import React from 'react'
import { SingleColumnProducts, Carousel } from '../components'
import { View, ScrollView, TaroEvent } from '@tarojs/components'
import Taro from "@tarojs/taro";

export default class Index extends React.Component {

  componentWillMount() { }

  componentDidMount() {
  
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() {

  }

  render() {
    return <ScrollView scrollY style={{ height: `${Taro.getSystemInfoSync().screenHeight}px`, width: "100%" }}
      onScroll={(e: any) => {

        console.log(e.detail.scrollTop);
      }}
      onScrollToLower={() => {
        console.log("onScrollToLower")
      }}
      onScrollToUpper={() => {
        console.log("onScrollToUpper")
      }}>
      <Carousel />
      <SingleColumnProducts />
    </ScrollView>
  }
}
