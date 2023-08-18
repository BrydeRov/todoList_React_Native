import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Text, StatusBar, ScrollView, StyleSheet, View, Keyboard, Image } from 'react-native';
import { Card, List, Button, Input, Icon, Layout } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const Home = () => {
  const [taskList, setTaskList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    async function getList() {
      try {
        const listString = await AsyncStorage.getItem('list');
        const list = JSON.parse(listString) || [];
        setTaskList(list);
      } catch (error) {
        console.error('Error loading task list:', error);
      }
    }

    getList();
  }, []);

  const deleteTask = async (index) => {
    try {
      const updatedList = taskList.filter((_, i) => i !== index);
      await AsyncStorage.setItem('list', JSON.stringify(updatedList));
      setTaskList(updatedList);
      if (editIndex === index) {
        setEditIndex(-1);
        setEditTitle('');
        setEditContent('');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const saveEditedTask = async (index) => {
    try {
      const updatedList = [...taskList];
      let date = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
      updatedList[index] = {
        title: editTitle,
        content: editContent,
        date: date
      };
      await AsyncStorage.setItem('list', JSON.stringify(updatedList));
      setTaskList(updatedList);
      setEditIndex(-1);
      setEditTitle(''); setEditContent('');
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const titleInputRef = useRef(null);

  const enterEditMode = (index) => {
    const selectedTask = taskList[index];
    setEditIndex(index);
    setEditTitle(selectedTask.title);
    setEditContent(selectedTask.content);
  };

  const openImagePicker = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const updatedList = [...taskList];
      updatedList[index].imageUri = result.uri;
      await AsyncStorage.setItem('list', JSON.stringify(updatedList));
      setTaskList(updatedList);
    }
  };

  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps}>
      {editIndex === info.index ? (
        <Input
          value={editTitle}
          onChangeText={setEditTitle}
          placeholder="Titulo"
        />
      ) : (
        <View style={styles.rowContainer}>
          <Text style={styles.h6Text}>{info.item.title}</Text>
          <Text style={styles.h6Text}>{info.item.date}</Text>
        </View>
      )}
    </View>
  );

  const renderItemFooter = (footerProps, info) => (
    <View {...footerProps}>
      {editIndex === info.index ? (
        <Button onPress={() => saveEditedTask(info.index)}>Guardar</Button>
      ) : (
        <>
          <Layout level='1'>
            <View style={styles.rowContainer}>
              <View style={styles.rowDirection}>
                <Button
                  onPress={() => deleteTask(info.index)}
                  appearance='ghost'
                  status='danger'
                  accessoryLeft={<Icon name='trash-outline'/>}
                />
                <Button
                  onPress={() => enterEditMode(info.index)}
                  appearance='ghost'
                  status='warning'
                  accessoryLeft={<Icon name='edit-2-outline'/>}
                />
              </View>
            </View>
          </Layout>
        </>
      )}
    </View>
  );

  const renderItem = (info) => (
    <Card
      style={styles.item}
      status="basic"
      header={(headerProps) => renderItemHeader(headerProps, info)}
      footer={(footerProps) => renderItemFooter(footerProps, info)}
    >
      {editIndex === info.index ? (
        <Input
          multiline={true}
          textStyle={styles.inputTextStyle}
          value={editContent}
          onChangeText={setEditContent}
          placeholder="Contenido de la tarea"
        />
      ) : (
        <>
          <Text>{info.item.content}</Text>
          {info.item.imageUri && <Image source={{ uri: info.item.imageUri }} style={styles.imagePreview} />}
        </>
      )}
    </Card>
  );

  return (
    <View>
      <Text style={styles.title}>
        Tareas Creadas
      </Text>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <List
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={taskList}
            renderItem={renderItem}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  contentContainer: {},
  item: {},
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center'
  },
  scrollView: {},
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    maxHeight: '79vh'
  },
  inputTextStyle: {
    minHeight: 80,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowDirection: {
    flexDirection: 'row',
  },
  h6Text: {
    fontSize: 17
  },
  imagePreview: {
    width: 400,
    height: 400,
    marginTop: 10,
  },
});

export default Home;
