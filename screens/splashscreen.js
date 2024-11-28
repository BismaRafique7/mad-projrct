import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0, 
        routes: [{ name: 'Login' }], 
      });
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('E:/login - Copy/my-app/img/istockphoto-1411701868-612x612.jpg')}
      style={styles.background}
    >
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
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
  loaderContainer: {
    position: 'absolute',
    bottom: 50, 
  },
});

export default SplashScreen;
