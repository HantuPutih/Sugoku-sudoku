import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button,TextInput, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

function ColBox({NChild, i, j, setTheBoard, initialBoardIJ}) {
  // initialBoardIJ
  const [n, setN] = useState(NChild)
  const [editable, setEditable] = useState(false)
  const [num, setNum] = useState(0)

  function updateN(text) {
    // setN(n)
    // console.log(initialBoard[i][j]);
    setTheBoard(i, j, text)
    console.log(text);
  }
  
  function edit() {
    let editableeee = n == initialBoardIJ && n !==0 ? false : true
    return editableeee
  }
  // useEffect(() => {
  //   edit()
  // }, [])

  return (
    <View style={styles.containerNum}>
      {
        edit() ? 
        <TextInput
          disabledInputStyle={{opacity: 1}}
          // placeholder={n > 0 ? n.toString() : null} 
          style={styles.num} 
          keyboardType="numeric" 
          onChangeText={text => updateN(text)} 
          maxLength={1}
          editable
          value={n ? n.toString() : null}
          />
        : <Text style={styles.num} >{n}</Text>
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
    borderRadius: 1
  },
  num: {
    fontSize: 19,
    textAlign: 'center',
    justifyContent: 'center',
    width: (windowWidth -200) / 9,
    height: (windowWidth -200) / 9,
    // color: "#FFFFFF"
  }
});
