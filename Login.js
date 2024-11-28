import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const navigation = useNavigation();
  const [isNewUser, setIsNewUser] = useState(false);

  const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
    const { email, password } = values;

    if (isNewUser) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigation.navigate('Login'); 
        })
        .catch((err) => setErrors({ form: err.message }))
        .finally(() => setSubmitting(false));
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user.email.toLowerCase() === 'bisma@gmail.com' && password === 'admin123') {
            navigation.navigate('AdminHome');
          } else {
            navigation.navigate('UserHome');
          }
        })
        .catch((err) => setErrors({ form: err.message }))
        .finally(() => setSubmitting(false));
    }
  };

  return (
    <ImageBackground
      source={require('E:/login - Copy/my-app/img/world-book-day-stack-of-colorful-books-with-open-book-on-teal-background-education-photo.jpg')}
      style={styles.background}
    >
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting, touched }) => (
          <View style={styles.container}>
             <Text style={styles.heading}>
              {isNewUser ? 'Register' : 'Sign-in'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            {errors.form && <Text style={styles.error}>{errors.form}</Text>}

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>{isNewUser ? 'Register' : 'Login'}</Text>
            </TouchableOpacity>

            <Text
              style={styles.toggleText}
              onPress={() => setIsNewUser(!isNewUser)}
            >
              {isNewUser ? "Already have an account? Login" : "Don't have an account? Register"}
            </Text>
          </View>
        )}
      </Formik>
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  container: {
    width: '70%', 
    maxWidth: 500, 
    minHeight:100,
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 200, 
    marginRight:200,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    width: '100%',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
  toggleText: {
    color: 'black',
    marginTop: 15,
    textAlign: 'center',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Login;
