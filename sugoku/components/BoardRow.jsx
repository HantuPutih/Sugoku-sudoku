import { StyleSheet, Text, View, Button,TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import ColBox from './ColBox';

export default function BoardRow({row, i, setTheBoard, initialBoardI }) {
//initialBoardI
// console.log(initialBoardI, '================================================');
  return (
    <View style={styles.containerRow}>
      {
        row.map((rowChild, index) => {
          // console.log(initialBoardI[index], '++++++++++++++++++++++++++++++++++++++++++++');
          return <ColBox NChild={rowChild} i={i} j={index} key={index} 
          setTheBoard={setTheBoard}
          initialBoardIJ={initialBoardI ? initialBoardI[index] : null}
          />
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  containerRow: {
    flexDirection: 'row',
  }
});
