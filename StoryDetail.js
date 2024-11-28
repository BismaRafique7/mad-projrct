import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db } from './firebaseConfig';


const backgroundImage = require('E:/login - Copy/my-app/img/dark-grunge-textured-concrete-stone-wall-background-photo.jpg');

const StoryDetail = ({ route, navigation }) => {
  const { storyId } = route.params; 
  const [story, setStory] = useState(null);
  const [comment, setComment] = useState('');

  
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const storyDocRef = doc(db, 'stories', storyId); 
        const storyDoc = await getDoc(storyDocRef);
        if (storyDoc.exists()) {
          setStory({ id: storyDoc.id, ...storyDoc.data() }); 
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log('Error fetching story:', error);
      }
    };
    fetchStory();
  }, [storyId]);

  
  const handleAddComment = async () => {
    if (comment) {
      try {
        await addDoc(collection(db, 'stories', storyId, 'comments'), {
          comment,
          createdAt: new Date(),
        });
        setComment(''); 
      } catch (error) {
        console.log('Error adding comment:', error);
      }
    }
  };

  if (!story) {
    return <Text>Loading...</Text>; 
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView style={styles.container}>
        
        <Text style={styles.title}>{story.title}</Text>

       
        <View style={styles.storyContainer}>
          <Text style={styles.storyText}>{story.story}</Text>
        </View>

        
        <FlatList
          data={story.comments || []}
          keyExtractor={(comment) => comment.id}
          renderItem={({ item }) => <Text>{item.comment}</Text>}
        />

        <TextInput
          style={styles.input}
          placeholder="Add a comment"
          value={comment}
          onChangeText={setComment}
        />
        <View style={styles.buttonContainer}>
        <Button title="Comment" color="gold"borderRadius=" 50"onPress={handleAddComment} />
        <Button title="Back to Stories" color="gold"borderRadius="10" onPress={() => navigation.goBack()} />
        </View>

      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.1)', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', 
    marginBottom: 10,
    marginTop:50,
    color:"white",
  },
  storyContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 1, 
    borderColor: '#ddd', 
    height:500,
  },
  storyText: {
    fontSize: 16,
    textAlign: 'justify', 
    lineHeight: 22, 
    color:'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    color:'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginBottom: 20,
  },
});

export default StoryDetail;
