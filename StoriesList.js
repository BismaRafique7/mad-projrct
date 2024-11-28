import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const StoriesList = () => {
  const [stories, setStories] = useState([]);

  const fetchStories = async () => {
    const querySnapshot = await getDocs(collection(db, 'stories'));
    const allStories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStories(allStories);
  };

  const handleDeleteStory = async (storyId) => {
    await deleteDoc(doc(db, 'stories', storyId));
    fetchStories();
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={stories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.storyContainer}>
            <Text style={styles.storyTitle}>{item.title}</Text>
            <Text style={styles.storyContent}>{item.story}</Text>
            <Button title="Delete" onPress={() => handleDeleteStory(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#333',
  },
  storyContainer: {
    marginBottom: 15,
    padding: 15,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  storyTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  storyContent: {
    fontSize: 16,
    color: '#ddd',
  },
});

export default StoriesList;
