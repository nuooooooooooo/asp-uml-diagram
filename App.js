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
  return(
    <View style={styles.container}>
      
      <View style={styles.segment}>
        <Text style={styles.appName}>Cat Nutrition Guide</Text>
      </View>
      
      {/* Button to log in. on press navigates to Login screen*/}
      <View style={styles.segment}>
        <View style={[styles.button, styles.neuButtonSecondShadow]}></View>
        <TouchableOpacity style={[styles.button, styles.neuButton]} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.neuLabel}>Log In</Text>
        </TouchableOpacity>
      </View>

      {/* Button to register. On press navigates to Register screen*/}
      <View style={styles.segment}>
        <View style={[styles.button, styles.neuButtonSecondShadow]}></View>
        <TouchableOpacity style={[styles.button, styles.neuButton]} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.neuLabel}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.segment}></View>

      <StatusBar style='auto'/>
    </View>
  )
}

function AddCat({navigation}) {
  //Screen to add a new cat profile
  return(
    <View style={styles.container}>

      <View style={styles.segment}>
        <Text style={styles.appName}>Your cat's profile</Text>
      </View>

      {/*Input the name, weight, age values and if the cat is neutered and the cat's activity.
      The function InputValue is in the helpers.js source file*/}
      <InputValue title='Name' />
      <InputValue title='Weight(lbs)' initialValue='cat.weight'/>
      <InputValue title='Age' />
      <NeuteredValue />
      <ActivityValue />
      <BodyCondition/>
      <LifeStage />

      {/*Button to create the profile. This navigates to the home screen. LoadCat is a function in profile.js source file. 
      It needs to be used as the functions to store the above values are async, the values first need to be loaded to make sure they are 
      shown in the profile*/}
      <View style={styles.segment}>
        <View style={[styles.button, styles.neuButtonSecondShadow]}></View>
        <TouchableOpacity style={[styles.button, styles.neuButton]} onPress={() => {
          loadCat();
          navigation.navigate('HomeScreen');
          }}>
          <Text style={styles.neuLabel}>Create profile</Text>
        </TouchableOpacity>
      </View>
 

      <StatusBar style='auto'/>

    </View>
  )
}

function Register({navigation}) {
  //Page to register a new user
  const [username, onChaneUsername] = useState('');
  const [password, onChangePassword] = useState('');
  return (
    <View style={styles.container}>

    <View style={styles.segment}>
        <Text style={styles.appName}>Register</Text>
    </View>
    
    {/*Create user name */}
    <View style={styles.segment}>
        <View style={[styles.input, styles.neuInputSecondShadow]}>
        <TextInput	
        style={styles.input}	
        placeholder="Username"	
        onChangeText={username => {
          onChaneUsername(username);
        }}
        value={username}
        />
        </View>
    </View>

    {/*Create password */}
    <View style={styles.segment}>
        <View style={[styles.input, styles.neuInputSecondShadow]}>
        <TextInput 
        style={styles.input} 
        secureTextEntry={true}
        autoComplete='off'
        onChangeText={(password) => {
          onChangePassword(password);
        }}
        value={password}
        placeholder = "Password" 
        />
        </View>
    </View>

    {/*Button to encrypt and save the username and password. The register function is in the helpers.js source file */}
    <View style={styles.segment}>
      <Button 
        title='Register'
        onPress = {() => {
          register(username, password);
          navigation.navigate('Add Cat');
        }}
      />
    </View>

    {/*To cancel, this is basically a link to the Login screen */}
    <View style={styles.segment}>
    <TouchableOpacity>
        <Text 
        style={styles.register}
        onPress={() => {
          navigation.navigate('Login');
        }}
        >Cancel</Text>
      </TouchableOpacity>

      <StatusBar style='auto'/>
    </View>
    </View>
  )
}

function Login({navigation}){
  //Page to log in with credentials
  const [username, onChaneUsername] = useState('');
  const [password, onChangePassword] = useState('');
  return (
    <View style={styles.container}>

    <View style={styles.segment}>
        <Text style={styles.appName}>Login</Text>
    </View>
      
    {/*Input username */}
    <View style={styles.segment}>
        <View style={[styles.input, styles.neuInputSecondShadow]}>
        <TextInput	
        style={styles.input}	
        placeholder="Username"	
        onChangeText={username => {
          onChaneUsername(username);
        }}
        value={username}
        />
        </View>
    </View>

    {/*Input password */}
    <View style={styles.segment}>
        <View style={[styles.input, styles.neuInputSecondShadow]}>
        <TextInput 
        style={styles.input} 
        secureTextEntry={true}
        autoComplete='off'
        onChangeText={(password) => {
          onChangePassword(password);
        }}
        value={password}
        placeholder = "Password" 
        />
        </View>
    </View>

    {/* Button to log in. On press it checks if there is an encrypted password to the username. If not, navigates back to Login screen,
    if yes, then logs in and redirects to the home screen*/}
    <View style={styles.segment}>
        <View style={[styles.button, styles.neuButtonSecondShadow]}></View>
        <TouchableOpacity 
        style={[styles.button, styles.neuButton]} 
        onPress={() => {
          submit(username, password).then(() => {
            if (login.loggedin) {
              navigation.navigate('HomeScreen');
            }else {navigation.navigate('LoginScreen');}})
        }}>
        <Text style={styles.neuLabel}>Submit</Text>
        </TouchableOpacity>
    </View>

    {/*Option to go to the register screen straight fom the login screen */}
    <View style={styles.segment}>
    <TouchableOpacity>
        <Text 
        style={styles.register}
        onPress={() => {
          navigation.navigate('Register');
        }}
        >Not registered?</Text>
      </TouchableOpacity>

      <StatusBar style='auto'/>
    </View>
    </View>
  )
}

function Profile({navigation}){
  /*Page to see the profile. First it calls the loadCat function from the profile.js source file 
  to load the figures from the async encrypted function, then it shows on screen*/
  loadCat();
  return(
    <View style={styles.container}>

      <View style={styles.segment}>
          <Text style={styles.appName}>Profile Settings</Text>
      </View>
      <View style={styles.segment}>
          <Text style={styles.otherText}>Weight(lbs): {cat.weight}</Text>
      </View>

      <View style={styles.segment}>
          <Text style={styles.otherText}>Age: {cat.age}</Text>
      </View>

      <View style={styles.segment}>
          <Text style={styles.otherText}>Neutered/Intact: {cat.neutered}</Text>
      </View>

      <View style={styles.segment}>
          <Text style={styles.otherText}>Activity: {cat.activity}</Text>
      </View>

      <View style={styles.segment}>
          <Text style={styles.otherText}>Body Condition: {cat.bodyCondition}</Text>
      </View>

      <View style={styles.segment}>
          <Text style={styles.otherText}>Life Stage: {cat.lifeStage}</Text>
      </View>

      {/*Button which takes the user to the Add Cat page, where the cat profile can be edited */}
      <View style={styles.segment}>
        <View style={[styles.button, styles.neuButtonSecondShadow]}></View>
        <TouchableOpacity style={[styles.button, styles.neuButton]} onPress={() => navigation.navigate('Add Cat')}>
          <Text style={styles.neuLabel}>Edit profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.segment}>
          <Text style={styles.appName}>General Settings</Text>
      </View>
      {/*Button which logs out the user and takes them to the log in screen */}
      <View style={styles.segment}>
        <View style={[styles.button, styles.neuButtonSecondShadow]}></View>
        <TouchableOpacity style={[styles.button, styles.neuButton]} onPress={() => {
          navigation.navigate('LoginScreen');
          login.loggedin = false;
          }}>
          <Text style={styles.neuLabel}>Log out</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
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
  return(
    <View style={styles.container}>

      <View style={styles.segment}>
        <Text style={styles.appName}>Cat Nutrition Guide</Text>
      </View>

      <View style={styles.segment}>
        {catName !== null ? (
          <Text style={styles.appName}>Welcome, {catName}!</Text>
        ): ( <Text>Loading ...</Text>
          )}
      </View>

      <View style={styles.segment}>
        <View style={[styles.button, styles.neuButtonSecondShadow]}></View>
        <TouchableOpacity style={[styles.button, styles.neuButton]} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.neuLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.segment}>
        <View style={[styles.button, styles.neuButtonSecondShadow]}></View>
        <TouchableOpacity style={[styles.button, styles.neuButton]} onPress={() => navigation.navigate('Calculator')}>
          <Text style={styles.neuLabel}>Calculator</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.segment}></View>

      <StatusBar style='auto'/>
    </View>
  )
}

function Calculator({navigation}){

  let caloricRequirement = calculateCaloricRequirement(cat);
  return(
    <View style={styles.container}>

      <View style={styles.segment}>
        <Text style={styles.otherText}>Daily required calory intake: {caloricRequirement}</Text> 
      </View>

      <View style={styles.segment}></View>

      <StatusBar style='auto'/>
    </View>
  )
}

export default function App() {
  //function to render the navigation container
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="Add Cat" component={AddCat} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Calculator" component={Calculator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
