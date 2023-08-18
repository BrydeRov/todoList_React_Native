import React, { useState, useRef } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Input, Text, Button } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const Create = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState(null);

  async function saveTask() {
    try {
      const listString = await AsyncStorage.getItem('list');
      const list = JSON.parse(listString) || [];
      let date = new Date().toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      const newTodo = {
        title: title,
        content: content,
        date: date,
        imageUri: imageUri,
      };
      list.push(newTodo);
      await AsyncStorage.setItem('list', JSON.stringify(list));
    } catch (error) {
      console.error('Error saving task:', error);
    }
    setTitle('');
    setContent('');
    setImageUri(null);
  }

  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Text category="h4" style={styles.inputLabel}>
          Crear Tarea
        </Text>
        <Input
          style={styles.inputMargin}
          placeholder="Título"
          value={title}
          onChangeText={(nextValue) => setTitle(nextValue)}
        />
        <Input
          style={styles.inputMargin}
          multiline={true}
          textStyle={styles.inputTextStyle}
          placeholder="Contenido de la tarea"
          value={content}
          onChangeText={(nextValue) => setContent(nextValue)}
        />
        <Button style={styles.inputMargin} onPress={openImagePicker}>Seleccionar Imagen</Button>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
        <Button onPress={saveTask}>Guardar Tarea</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  input: {
    marginTop: '5%',
    marginHorizontal: '5%',
  },
  inputTextStyle: {
    minHeight: 80,
  },
  inputLabel: {
    marginBottom: 15,
  },
  inputMargin: {
    marginVertical: 15,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

export default Create;
