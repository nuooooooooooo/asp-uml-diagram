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
  
  return(
    
    <View style={styles.segment}>
          <View style={[styles.input, styles.neuInputSecondShadow]}>
          <TextInput	
          style={styles.input}
          placeholder={props.title}	
          onChangeText={pick => {
            onChangePick(pick);
            savePick(props.title, pick).then(() => {
              return});
          }}
          value={pick}
          />
          </View>
    </View>
  )
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
    return(
        <View style={styles.segment}>
            <View style={styles.neuInputSecondShadow}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                labelStyle={styles.dropLabelStyle}
                style={{
                    backgroundColor: '#f0f0f0',
                  }}
                textStyle={styles.dropTextStyle}
                maxHeight={500}
                onChangeValue={(value) => {
                    savePick('Neutered', value);
                  }}
                placeholder='Neutered/Intact'
                />
            </View>
        </View>
      )
}

export const ActivityValue = () => {
  //Dropdown picker for the activity value. Labels and choices hard coded in the function
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
            {label: 'Indoor', value: 'indoor'},
            {label: 'Outdoor', value: 'outdoor'}
        ]);
    return(
        <View style={styles.segment}>
            <View style={[styles.neuInputSecondShadow]}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                labelStyle={styles.dropLabelStyle}
                style={{
                    backgroundColor: '#f0f0f0',
                  }}
                textStyle={styles.dropTextStyle}
                maxHeight={500}
                onChangeValue={(value) => {
                    savePick('Activity', value);
                  }}
                placeholder='Activity'
                />
            </View>
        </View>
      )
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
    return(
        <View style={styles.segment}>
            <View style={[styles.neuInputSecondShadow]}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                labelStyle={styles.dropLabelStyle}
                style={{
                    backgroundColor: '#f0f0f0',
                  }}
                textStyle={styles.dropTextStyle}
                maxHeight={500}
                onChangeValue={(value) => {
                    savePick('LifeStage', value);
                  }}
                placeholder='Life Stage'
                />
            </View>
        </View>
      )
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
    return(
        <View style={styles.segment}>
            <View style={[styles.neuInputSecondShadow]}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                labelStyle={styles.dropLabelStyle}
                style={{
                    backgroundColor: '#f0f0f0',
                  }}
                textStyle={styles.dropTextStyle}
                maxHeight={500}
                onChangeValue={(value) => {
                    savePick('BodyCondition', value);
                  }}
                placeholder='Body Condition'
                />
            </View>
        </View>
      )
}