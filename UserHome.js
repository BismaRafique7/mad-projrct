import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ImageBackground } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const UserHome = () => {
  const [stories, setStories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchStories = async () => {
      const querySnapshot = await getDocs(collection(db, 'stories'));
      const allStories = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStories(allStories);
    };
    fetchStories();
  }, []);

  return (
    <ImageBackground
      source={require('E:/login - Copy/my-app/img/dark-grunge-textured-concrete-stone-wall-background-photo.jpg')} 
      style={styles.background}
    ><Text style={styles.heading}>Story List</Text>
      <View style={styles.container}>
        
        

        <FlatList
          data={stories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.storyContainer}>
              <Text
                style={styles.title}
                onPress={() => navigation.navigate('StoryDetail', { storyId: item.id })}
              >
                {item.title}
              </Text>
            </View>
          )}
          style={styles.list}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    width: '90%',
    maxHeight: 1100,
    height:600, 
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    maxHeight: 700, 
    width: '100%',
    height: 400,
  },
  storyContainer: {
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:6,
  },
  title: {
    fontSize: 18,
    
    color: 'white',
    
  },
});

export default UserHome;
