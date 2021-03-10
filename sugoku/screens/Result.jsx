import React, { useState } from 'react'
import { Text, View, StyleSheet, Button, Image, Dimensions } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler';
import ConfettiCannon from 'react-native-confetti-cannon';

const windowWidth = Dimensions.get('window').width;

function Result({ route, navigation }) {
  const [imgPosition, setImgPosition] = useState({
    x: 0,
    y: 0
  })

  const handleGesture = (event) => {
    const { translationX, translationY } = event.nativeEvent
    setImgPosition({
      x: translationX,
      y: translationY
    })
  }
  
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>
          Congratulation
          {"\n"}
        </Text>
        <Text style={styles.subText}>
          "{route.params.username}"
          {"\n"} 
        </Text>
        <Text style={styles.subText}>
          you solved the board! GG!
        </Text>
      </View>
      <PanGestureHandler onGestureEvent={handleGesture}> 
        <Image
          style={
            [styles.img, 
            {
              transform: [
                {translateX: imgPosition.x},
                {translateY: imgPosition.y}
              ]
            }]
          }
          source={{
            uri: 'https://hungarytoday.hu/wp-content/uploads/2018/02/18ps27.jpg',
          }}
        />
      </PanGestureHandler>
      
      <Button
        color='#28a745'
        title='play again'
        onPress={()=> navigation.navigate('Home')}
      />
        <ConfettiCannon count={200} fallSpeed={6000} origin={{x: windowWidth/ 2, y: -15}} />
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  title: {
    fontSize: windowWidth / 14,
    fontWeight: 'bold'
  },
  subText: {
    fontSize: windowWidth / 20
  },
  img: {
    width: windowWidth / 1.5,
    height: windowWidth / 1.5,
  },
});

export default Result
