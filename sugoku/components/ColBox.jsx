import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

function ColBox({colChild, i, j, handleInputUserToBoard, initialBoardIJ}) {
  const [n, setN] = useState(colChild)

  function updateN(n) {
    handleInputUserToBoard(i, j, n)
  }
  
  function edit() {
    let isEdit = colChild == initialBoardIJ && colChild !==0 ? false : true
    return isEdit
  }
  useEffect(() => {
    updateN(n)
  }, [n])
  
  // function handleOnFocus() {
    // styles.num.backgroundColor= '#ededed'
  // } 

  return (
    <View style={ edit() ? styles.containerNum : styles.containerNumNoEdit }>
      {
        edit() ? 
        <TextInput
          disabledInputStyle={{opacity: 1}}
          style={styles.num} 
          keyboardType="numeric" 
          onChangeText={input => setN(input)} 
          maxLength={1}
          editable
          // onFocus={() => handleOnFocus() }
          value={n ? n.toString() : null}
          /> 
        : 
        <Text style={styles.numNoEdit}>{n}</Text>
      }
    </View>
  )
}

export default ColBox

const styles = StyleSheet.create({
  containerNum: {
    borderColor: "#20232a",
    padding: 5,
    borderWidth: 1.2,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 1,
  },
  containerNumNoEdit: {
    borderColor: "#20232a",
    padding: 5,
    borderWidth: 1.2,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 1,
    backgroundColor: '#c7ae8d'
  },
  num: {
    fontSize: (windowWidth -220) / 9,
    textAlign: 'center',
    justifyContent: 'center',
    width: (windowWidth -200) / 9,
    height: (windowWidth -200) / 9,
  },
  numNoEdit: {
    fontSize: (windowWidth -220) / 9,
    textAlign: 'center',
    justifyContent: 'center',
    width: (windowWidth -200) / 9,
    height: (windowWidth -200) / 9,
    marginTop: -9,
    fontWeight: 'bold',
    textShadowColor: '#797979',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  }
});
