// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserHome from './UserHome';
import StoryDetail from './StoryDetail';
import Login from './Login';
import Registration from './Registration';
import AdminHome from './AdminHome';
import SplashScreen from './screens/splashscreen';
import ListStories from './ListStories';const Stack = createStackNavigator();
import UpdateStory from './UpdateStory';
const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="UserHome" component={UserHome} />
        <Stack.Screen name="StoryDetail" component={StoryDetail} />
        <Stack.Screen name="AdminHome" component={AdminHome} />
        <Stack.Screen name="ListStories" component={ListStories} />
        <Stack.Screen name="UpdateStory" component={UpdateStory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;