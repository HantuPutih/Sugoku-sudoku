import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Button, TextInput, ScrollView, Alert, Dimensions, TouchableOpacity } from 'react-native';
import BoardRow from '../components/BoardRow';
// import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

export default function Game({ route, navigation }) {
  const [board, setBoard] = useState([])
  const [initialBoard, setInitialBoard] = useState([])

  function solvePress() {
    // console.log(initialBoard);
    setBoard([])
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams({board: initialBoard}),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response.solution)
        setBoard(response.solution)
      }
      )
      .catch(console.warn)
  }

  function submitPress(payload) {
    console.log({board});
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams({board}),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        if (response.status !== 'solved') {
          Alert.alert(
            response.status,
            'Check your board and try again!',
          )
        } else {
          navigation.navigate('Result', {
            username: route.params.username,
          })
        }
        console.log(response)
      }
      )
      .catch(console.warn)
  }

  function restartPress() {
    setBoard([])
    fetch('https://sugoku.herokuapp.com/board?difficulty=' + route.params.difficulty)
    .then((res) => res.json() )
    .then((data) => {
      console.log(data.board)
      setBoard(data.board.map(row => [...row]))
      setInitialBoard(data.board.map(row => [...row]))
    })
  }

  useEffect(() => {
    fetch('https://sugoku.herokuapp.com/board?difficulty=' + route.params.difficulty)
    .then((res) => res.json() )
    .then((data) => {
      // console.log(data.board)
      // let convertBoard = JSON.parse(JSON.stringify(data.board))
      setBoard(data.board)
      setInitialBoard(data.board.map(row => [...row]))
    })
  }, [])

  const setTheBoard = (i, j, n) => {
    // console.log(i, j, n );
    let userInputBoard = board.map(row => [...row])
    userInputBoard[i][j] = +n
    setBoard(userInputBoard)
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.headingCont}>
        <Text style={styles.heading}>Hektipeit Sudoku</Text>
        <Text>Username: {route.params.username}</Text>
        <Text>Difficulty: {route.params.difficulty}</Text>
      </View>
      <StatusBar style="auto" />
        <View style={styles.board}>
          {
            board.length !== 0 ? board.map((row, index) => {
              return <BoardRow row={row} i={index} key={index} 
              setTheBoard={setTheBoard}
              initialBoardI={initialBoard[index]}
              />
              
            })
            : <Text>Loading Board...</Text>
          }
        </View>
        <View style={styles.containerBtn}>
          {/* <TouchableOpacity
            style={styles.btn}
            onPress={submitPress}
            // color="white"
          >
            <Text>validate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={solvePress}
          >
            <Text>Give up?</Text>
          </TouchableOpacity> */}
          <View style={{margin: 10}}>
            <Button onPress={submitPress} title='validate board'></Button>
          </View>
          <View style={{margin: 10}}>
            <Button onPress={solvePress} title='solve board' color='#6b8e23'></Button>
          </View>
        </View>
        <TouchableOpacity
            style={styles.button}
            onPress={restartPress}
          >
            <Text>Load New Board</Text>
          </TouchableOpacity>
          {/* <Button style={styles.btn} color='#6b8e23' onPress={restartPress} title='Load New board'></Button> */}
    </View>
  );
}

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  heading: {
    fontSize: 30,
    color: '#caa472',
  },
  board: {
    borderWidth: 2,
    borderRadius: 6,
    padding: 7,
    backgroundColor: '#e5d3b3',
    width: windowWidth - 60,
    height: windowWidth - 60,
    alignItems: 'center', 
    justifyContent: 'center'

  },
  containerBtn: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  btn: {
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 17,
    paddingRight: 17,
    backgroundColor: '#007AFF',
    alignItems: "center",
    color: 'white',
    borderRadius: 2,
    fontSize: 20,
  },
  headingCont: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});
