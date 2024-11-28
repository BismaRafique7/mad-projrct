import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const AdminHome = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');

  
  const handleAddStory = async () => {
    if (!title || !story) {
      Alert.alert('Error', 'Both fields are required!');
      return;
    }
    
    try {
      await addDoc(collection(db, 'stories'), {
        title,
        story,
        createdAt: new Date(),
      });
      setTitle('');
      setStory('');
      
    } catch (e) {
      console.error('Error adding story: ', e);
      Alert.alert('Error', 'Failed to add the story. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={require('E:/login - Copy/my-app/img/dark-grunge-textured-concrete-stone-wall-background-photo.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Admin Dashboard</Text>

        <TextInput
          style={styles.input1}
          placeholder="Story Title"
          placeholderTextColor="#d1d1d1"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Story Content"
          placeholderTextColor="#d1d1d1"
          value={story}
          onChangeText={setStory}
          multiline
          textAlignVertical="top"
        />

          <View style={styles.buttonRow}>
         <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleAddStory}>
         <Text style={styles.buttonText}>Add Story</Text>
        </TouchableOpacity>

         <TouchableOpacity
         style={[styles.button, styles.viewButton]}
         onPress={() => navigation.navigate('ListStories')}
         >
        <Text style={styles.buttonText}>View Stories</Text>
        </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingLeft:10,
    paddingRight:10,
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
  },
  heading: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom:40,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  input: {
    height: 350,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 25,
    padding: 15,
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    fontFamily: 'Arial',
    transition: 'all 0.3s ease-in-out',
  },
  input1: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 20,
    paddingLeft: 15,
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    fontFamily: 'Arial',
    transition: 'all 0.3s ease-in-out',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    width: '100%',
    marginTop: 10,
  },
  button: {
    flex: 1, 
    backgroundColor: 'grey',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    opacity: 0.9,
    marginHorizontal: 5, 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputFocus: {
    borderColor: '#28a745', 
  },
});

export default AdminHome;