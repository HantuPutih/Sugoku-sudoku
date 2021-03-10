import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button,TextInput, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

function ColBox({NChild, i, j, setTheBoard, initialBoardIJ}) {
  // initialBoardIJ
  const [n, setN] = useState(NChild)
  const [editable, setEditable] = useState(false)

  function updateN(text) {
    // setN(n)
    // console.log(initialBoard[i][j]);
    setTheBoard(i, j, text)
    // console.log(text);
  }
  
  function edit() {
    let isEdit = n == initialBoardIJ && n !==0 ? false : true
    return isEdit
  }
  // useEffect(() => {
  //   edit()
  // }, [])
  // function handleOnFocus() {
    // styles.num.backgroundColor= '#ededed'
  // } 

  return (
    <View style={ edit() ? styles.containerNum : styles.containerNumNoEdit }>
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
          // onFocus={() => handleOnFocus() }
          value={n ? n.toString() : null}
          /> 
          // {n ? n.toString() : null} </TextInput> 
        : <Text style={styles.numNotEdit} >{n}</Text>
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
    fontSize: 19,
    textAlign: 'center',
    justifyContent: 'center',
    width: (windowWidth -200) / 9,
    height: (windowWidth -200) / 9,
    // color: "#FFFFFF"
  },
  numNotEdit: {
    fontSize: 19,
    textAlign: 'center',
    justifyContent: 'center',
    width: (windowWidth -200) / 9,
    height: (windowWidth -200) / 9,
    marginTop: -9,
    // color: '#0054ba',
    fontWeight: 'bold',
    textShadowColor: '#797979',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  }
});
