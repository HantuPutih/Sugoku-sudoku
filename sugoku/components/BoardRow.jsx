import { StyleSheet, View } from 'react-native';
import React from 'react';
import ColBox from './ColBox';

export default function BoardRow({row, i, handleInputUserToBoard, initialBoardI }) {
  return (
    <View style={styles.containerRow}>
      {
        row.map((rowChild, colIdx) => {
          return <ColBox colChild={rowChild} i={i} j={colIdx} key={colIdx} 
          handleInputUserToBoard={handleInputUserToBoard}
          initialBoardIJ={initialBoardI ? initialBoardI[colIdx] : null}
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
