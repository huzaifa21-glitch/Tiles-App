import React from "react";
import Floor from "./screens/floor";
import Bath from "./screens/bath";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Bath2 from "./screens/bath2";
import Bath3 from "./screens/bath3";
import Bath4 from "./screens/bath4";
import Home from "./screens/home";
import FloorRES from "./screens/floorresult";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  // const Stack = createStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">

    <Stack.Screen name="Home" component={Home} 
    options={{
     headerShown:false,
      }} />
      <Stack.Screen name="Select Data" component={Bath2} options={{
        headerStyle: {
          backgroundColor: '#516A97',
        },headerTintColor: 'white'
      }} />
      <Stack.Screen name="Choose Steps" component={Bath3} 
      options={{
        headerStyle: {
          backgroundColor: '#516A97',
          
        },headerTintColor: 'white'}}
        
      />
      <Stack.Screen name="Result" component={Bath4} options={{
        headerStyle: {
          backgroundColor: '#516A97',
        },headerTintColor: 'white'
      }} />
      <Stack.Screen name="Bath1" component={Bath} options={{
        headerStyle: {
          backgroundColor: '#516A97',
        },headerTintColor: 'white'
      }} />
      <Stack.Screen name="Floor" component={Floor}
       options={{
        headerStyle: {
          backgroundColor: '#516A97',
        },headerTintColor: 'white'
      }}
   />

<Stack.Screen name="Floor Results" component={FloorRES}
       options={{
        headerStyle: {
          backgroundColor: '#516A97',
        },headerTintColor: 'white'
      }}
   />
    </Stack.Navigator>
  </NavigationContainer>
 
  );
}

// const Tabs =()=>{
//   return(
    
// <Tab.Navigator  initialRouteName="Floor"


// screenOptions={{
//   headerTintColor: '#FFF',
//   headerStyle: {
//     backgroundColor: '#516a97',
    
    
//   },

//   tabBarActiveTintColor: "#000",
//   tabBarActiveBackgroundColor:"#F0E68C",
//   tabBarHideOnKeyboard:true,
//   tabBarInactiveTintColor: "#000",
 
//   tabBarLabelStyle: {
   
//     fontSize: 16,
//     fontWeight:'600'
//   },
//   "tabBarStyle": [
//     {
//       backgroundColor: '#516a97',
     
//     },]
// }}
// inactiveColor="#FFF"
// labeled={false}
// >
//    <Tab.Screen name="Floor" component={Floor}  options={{
//           tabBarLabel: 'Floor',
//           tabBarIcon: () => (
//             <MaterialCommunityIcons name="floor-plan" color='#000' size={30} />
//           ),
//         }}
//  />
//     <Tab.Screen name="Bathroom Walls" component={Bath} 
//      options={{
//       tabBarLabel: 'Bathroom Walls/Room',
//      tabBarIcon: () => (
//       <MaterialCommunityIcons name="bathtub" color='#000' size={30} />
//     ),
//   }}

//     />
// </Tab.Navigator>

//   )
// }
