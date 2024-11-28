import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { db } from './firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native'; 

const UpdateStory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, title, content } = route.params; 

  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

 
  const handleUpdateStory = async () => {
    const storyRef = doc(db, 'stories', id);
    await updateDoc(storyRef, {
      title: newTitle,
      story: newContent,
    });
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.updateHeading}>Update Story</Text>

      <TextInput
        style={styles.input}
        value={newTitle}
        onChangeText={setNewTitle}
        placeholder="Update Title"
        placeholderTextColor="#888"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        value={newContent}
        onChangeText={setNewContent}
        placeholder="Update Content"
        placeholderTextColor="#888"
        multiline
      />
      <Button title="Save"color="grey"fontWeight="bold" onPress={handleUpdateStory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    marginBottom:30,
  },
  updateHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    marginTop:40,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color:'white',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color:'white',
    height:400,
  },
});

export default UpdateStory;
