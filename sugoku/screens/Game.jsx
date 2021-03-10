import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import BoardRow from '../components/BoardRow';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux'
import { fetchBoard, setGameBoard, solveBoard, validateBoard } from '../store/actions'

const windowWidth = Dimensions.get('window').width;

export default function Game({ navigation }) {
  const dispatch = useDispatch()
  const {gameBoard} = useSelector(state => state.board)
  const {initialBoard} = useSelector(state => state.board)
  const {username} = useSelector(state => state.userData)
  const {difficulty} = useSelector(state => state.userData)

  function solvePress() {
    dispatch(setGameBoard([]))
    dispatch(solveBoard(initialBoard))
  }

  function submitPress() {
    // console.log({board});
    dispatch(validateBoard(gameBoard, navigation))
  }

  function restartPress() {
    dispatch(setGameBoard([]))
    dispatch(fetchBoard(difficulty))
  }

  useEffect(() => {
    dispatch(fetchBoard(difficulty))
  }, [dispatch])

  const handleInputUserToBoard = (i, j, n) => {
    // console.log(i, j, n );
    let userInputBoard = gameBoard.map(row => [...row])
    userInputBoard[i][j] = +n
    dispatch(setGameBoard(userInputBoard))
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.headingCont}>
        <Text style={styles.heading}>Hektipeit Sudoku</Text>
        <Text>Username: {username}</Text>
        <Text>Difficulty: {difficulty}</Text>
      </View>
      <StatusBar style="auto" />
        <View style={styles.board}>
          {
            gameBoard.length !== 0 ? 
            gameBoard.map((row, rowIdx) => {
              return <BoardRow row={row} i={rowIdx} key={rowIdx} 
              handleInputUserToBoard={handleInputUserToBoard}
              initialBoardI={initialBoard[rowIdx]}
              />
            })
            : 
            <View>
              <ActivityIndicator size="large" color="#6b8e23" />
              <Text>Loading Board...</Text>
            </View>
          }
        </View>
        <View style={styles.containerBtn}>
          <View style={{margin: 10}}>
            <Button onPress={submitPress} title='validate board'></Button>
          </View>
          <View style={{margin: 10}}>
            <Button onPress={restartPress} title='load new board' color='#6b8e23'></Button>
          </View>
        </View>
          <TouchableOpacity
            style={styles.button}
            onPress={solvePress}
          >
            <Text>Give Up</Text>
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  heading: {
    fontSize: windowWidth /10,
    color: '#caa472',
    textShadowColor: '#797979',
    textShadowOffset: {width: 1.5, height: 1},
    textShadowRadius: 1
  },
  board: {
    borderWidth: 2,
    borderRadius: 6,
    padding: 7,
    backgroundColor: '#e5d3b3',
    width: windowWidth - 60,
    height: windowWidth - 60,
    alignItems: 'center', 
    justifyContent: 'center',
    elevation: 6,

  },
  containerBtn: {
    display: 'flex',
    flexDirection: 'row',
  },
  headingCont: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 2,
  }
});
