import * as SecureStore from "expo-secure-store"
import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from './styles.js';

//for start, set loggedin as false, so the profile is not shown to anyone
export let loggedin = false;

export async function register (username, password) {
  //asyncronised function to encrypt the password to the specific username
    await SecureStore.setItemAsync(username, password);
}
  
export async function submit(username, password){
  /*Async function to retrieve the encrypted password for the given username and to compare it with the entered password.
  If they match, an alert welcomes the user and the loggedin changes to true. If it does not, en error alert informs about the incorrect credentials.*/
    let result = await SecureStore.getItemAsync(username).then ((result) => {
    if (result==password) {
      loggedin = true;
      Alert.alert("Welcome!", "You are now logged in!");
    } else {
      Alert.alert ("Wrong credentials!", "Not yet registered or wrong password!");
      loggedin = false;
    }
  })
}

export const InputValue = (props) => {

  /*Function to securely store the value inputs for the profiles */
  const [pick, onChangePick] = useState('');
  
  return 1
}


export async function savePick (label, item) {
  //asyncronised function to encrypt the item to the specific label when editting or creating profile
    await SecureStore.setItemAsync(label, item);
}

export async function loadPick(label){
  /*Async function to retrieve the encrypted item for the given label. If there is no such label or item, returns blank*/
    let result = await SecureStore.getItemAsync(label);
    if (result != null){
    return result;
  }else {return '';}
}

export const NeuteredValue = () => {
  //Dropdown picker for the neutered value. Labels and choices hard coded in the function
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
            {label: 'Neutered', value: 'neutered'},
            {label: 'Intact', value: 'intact'}
        ]);
    return 1
}

export const ActivityValue = () => {
  //Dropdown picker for the activity value. Labels and choices hard coded in the function
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
            {label: 'Indoor', value: 'indoor'},
            {label: 'Outdoor', value: 'outdoor'}
        ]);
    return 1
}

export const LifeStage = () => {
  //Dropdown picker for the life stage of the cat. Labels and choices hard coded in the function
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
            {label: 'Kitten', value: 'kitten'},
            {label: 'Adult', value: 'adult'},
            {label: 'Senior', value: 'senior'}
        ]);
    return 1
}

export const BodyCondition = () => {
  //Dropdown picker for the life stage of the cat. Labels and choices hard coded in the function
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
            {label: 'Underweight', value: 'under'},
            {label: 'Ideal', value: 'ideal'},
            {label: 'Overweight', value: 'over'}
        ]);
    return 1
}