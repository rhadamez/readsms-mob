import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Button } from 'react-native';

import { styles } from './styles'

export default function App() {
  const [totalInputs] = useState(4)
  const inputRef = useRef<TextInput[]>([])

  const [paste, setPaste] = useState(false)

  useEffect(() => {
    if(paste) {
      Array.from({ length: totalInputs }, (_, index) => index+1).map(item => {
        inputRef.current[item].setNativeProps({ text: 'char'.charAt(item-1)})
      })
    }
  }, [paste])

  function handleTextChange(text: string, index: number) {
    if(text === '') return
    else if(text.length === 1) {
      inputRef.current[index].setNativeProps({ text: text.charAt(0) })
      if(index < totalInputs) inputRef.current[index+1].focus()
      else inputRef.current[index].blur()
    }
    else if(index <= totalInputs) {
      let nextIndex = index
      let currentIsFilled = false
      for(let i = 0; i <= text.length; i++) {
        const currentChar = text.charAt(i)
        if(!currentIsFilled) {
          inputRef.current[index].setNativeProps({ text: currentChar })
          if(nextIndex <= totalInputs) inputRef.current[nextIndex].focus()
          currentIsFilled = true
        } else if(nextIndex <= totalInputs) {
          inputRef.current[nextIndex].setNativeProps({ text: currentChar })
          if(nextIndex+1 <= totalInputs) inputRef.current[nextIndex+1].focus()
        }
        nextIndex++
      }
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <Button title='Emit' onPress={() => setPaste(!paste)}/>
      {Array.from({ length: totalInputs }, (_, index) => index+1).map(item => (
        <TextInput
          ref={(ref) => { inputRef.current[item] = ref }}
          onChange={(text) => handleTextChange(text.nativeEvent.text, item)}
          key={item}
          style={styles.input} />
      ))}
    </View>
  );
}
