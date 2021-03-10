import React, { useState } from 'react'
import { Text, View, StyleSheet, Button, Image } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler';

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
          you solved the board!
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
        title='play again'
        onPress={()=> navigation.navigate('Home')}
      />
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
    fontSize: 27,
    fontWeight: 'bold'
  },
  subText: {
    fontSize: 20
  },
  img: {
    width: 255,
    height: 255,
  },
});

export default Result