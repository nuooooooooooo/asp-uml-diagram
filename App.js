import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { register, submit, InputValue, NeuteredValue, ActivityValue, LifeStage, BodyCondition} from './helpers.js' //Helpers.js contains functions to login and register and to verify
import { styles } from './styles.js';
import { cat, loadCat } from './profile.js';
import * as login from './helpers.js';
import { calculateCaloricRequirement } from './CatCaloricCalculator.js';

/* 
kg/lbs done
logout
colours done
navigation closer to the wireframe
food profile

save username to profile.user to SecureStore user and cat as object
*/

const Stack = createStackNavigator();

function LoginScreen({navigation}) {
//Main screen to log in or sign up
  return 1;
}

function AddCat({navigation}) {
  //Screen to add a new cat profile
  return 1
}

function Register({navigation}) {
  //Page to register a new user
  const [username, onChaneUsername] = useState('');
  const [password, onChangePassword] = useState('');
  return 1
}

function Login({navigation}){
  //Page to log in with credentials
  const [username, onChaneUsername] = useState('');
  const [password, onChangePassword] = useState('');
  return 1
}

function Profile({navigation}){
  /*Page to see the profile. First it calls the loadCat function from the profile.js source file 
  to load the figures from the async encrypted function, then it shows on screen*/
  loadCat();
  return 1
}

function HomeScreen({navigation}){
  //This is the home screen, from here there is an access button to the profile and calculator. Again, first loafing the cat profile.
  
  const  [catName, setCatName] = useState(null);

  // the useEffect function enables the rendering of the cat name only when cat name is not null, a loading message is displayed otherwise
  useEffect(() => {
    async function fetchCat() {
      await loadCat();

      setCatName(cat.name)
    }

    fetchCat();
  }, []);
  
  loadCat();
  return 1
}

function Calculator({navigation}){

  let caloricRequirement = calculateCaloricRequirement(cat);
  return 1
}

export default function App() {
  //function to render the navigation container
  return 1
}
