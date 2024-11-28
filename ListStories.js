import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { db } from './firebaseConfig';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';

const ListStories = () => {
  const [stories, setStories] = useState([]);
  const navigation = useNavigation(); 

  
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
      
      <Text style={styles.pageTitle}>Stories</Text>

      <ScrollView style={styles.scrollContainer}>
        <FlatList
          data={stories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.storyContainer}>
              <Text style={styles.storyTitle}>{item.title}</Text>
              
              <View style={styles.buttonContainer}>
                <Button
                  title="Update"
                  color="grey"
                  onPress={() =>
                    navigation.navigate('UpdateStory', {
                      id: item.id,
                      title: item.title,
                      content: item.story,
                    })
                  }
                />
                <Button title="Delete"color="grey"onPress={() => handleDeleteStory(item.id)} />
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={true} 
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop:50,
    marginBottom:40, 
  },
  scrollContainer: {
    maxHeight: 900, 
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default ListStories; 