import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Switch,
  Share,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  Button,
  SafeAreaView,
} from "react-native";
// import TextInput from "./src/components/TextInput";
// import MaterialButtonDanger from "./src/components/MaterialButtonDanger";
// import Share from 'react-native-share';
import React, { useEffect, useRef, useState } from "react";
import * as Sharing from "expo-sharing";

// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { Picker } from "@react-native-picker/picker";
// import { ScrollView } from 'react-native-web';

export default function Bath({ navigation }) {

  const submitHandle =()=>{
    if(door==''){
      setDoor('0');
    } 

  }
  const pressHandler = () => {
    const data1 = { l1: length, w1: width, d1: door, wall1: wallHeight };

    if (!length || !width || !wallHeight) {
   
      Alert.alert("Invalid Data", "Please Fill All Fields to Continue");
    }
    else {
      navigation.navigate("Select Data", { data1 });
    }
  };

 

  const [isEnabled, setIsEnabled] = useState(false);

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [door, setDoor] = useState("");
  const [wallHeight, setWallHeight] = useState("");
  const [tilearea, setTileArea] = useState("");
  const [lh, setLH] = useState("");

  const [priceBox, setPriceBox] = useState("");
  const [tl, setTL] = useState("");
  const [th, setTH] = useState("");
  const [ds, setDS] = useState("");
  const [ms, setMS] = useState("");
  const [ls, setLS] = useState("");
  const [m, setm] = useState("");
  const [d, setd] = useState("");
  const [l, setl] = useState("");
  const [b, setb] = useState("");
  const [p, setp] = useState("");

  const options = ["Select", "0", "1", "2", "3", "4", "5", "6"];

  const optiona = ["Select", "1.44", "1.5", "1.3", "1.21"];
  const optionc = ["Select", "12x24", "10x20", "8x26", "9x36"];

  const [type, setType] = useState(options[0]);
  function calculateTiles(
    length,
    width,
    door,
    wallheight,
    tilearea,
    pricebox,
    tl,
    th,
    ds,
    ms,
    ls
  ) {
    const area =
      parseFloat(length) +
      parseFloat(length) +
      parseFloat(width) +
      parseFloat(width) -
      parseFloat(door);

    let areainmeter = area * parseFloat(wallheight);
    areainmeter = areainmeter / 10.76;
    // console.log("Area in M: " + areainmeter.toFixed(2));

    const boxes = Math.ceil(areainmeter / parseFloat(tilearea));
    const totalprice = boxes * parseFloat(pricebox);

    const motive = (area * parseFloat(th)) / parseFloat(tl);
    const dark = (area * parseFloat(th)) / parseFloat(tl);
    const light = (area * parseFloat(th)) / parseFloat(tl);

    setm(Math.ceil(motive * parseFloat(ms)));
    setd(Math.ceil(dark * parseFloat(ds)));
    setl(Math.ceil(light * parseFloat(ls)));
    setb(boxes);
    setp(totalprice);
    console.log(m + "MOY " + d + "FST " + l + " " + b + " " + p + " ");
    setModalVisible1(true);
  }

  const [output, setout] = useState({
    meter: null,

    totalprice: null,
    totaltiles: null,
    box: null,
  });
  // const roboto = require('./fonts/roboto-700.ttf');

  // const roboto_italic = require('./fonts/roboto-italic.ttf');
  const [vals, setval] = useState({
    length: null,
    width: null,
    sqinbox: null,
    tilesinbox: null,
    price: null,
  });

  const [modalVisible, setModalVisible] = useState(false);

  const [modalVisible1, setModalVisible1] = useState(false);
  function handlePress() {
    var areai = vals.length * vals.width;

    meteri = areai / 10.76;
    meteri = meteri.toFixed(2);

    var boxi = meteri / vals.sqinbox;
    boxi = Math.round(boxi);

    var complete = boxi * vals.sqinbox;

    var totalpricei = complete * vals.price;
    totalpricei = Math.round(totalpricei);

    var totaltilesi = vals.tilesinbox * boxi;
    setout({
      totaltiles: totaltilesi,
      meter: meteri,
      totalprice: totalpricei,
      box: boxi,
    });

    setModalVisible(true);
  }

  const data = [
    { key: "1", value: "1" },
    { key: "2", value: "2" },
  ];

  const onShare = async () => {
    const ar = output.meter;
    const bx = output.box;
    const tt = output.totaltiles;
    const tp = output.totalprice;

    try {
      const result = await Share.share({
        message:
          "* FLOOR/FUTURE WALL TRADERS *\n" +
          "TOTAL AREA: " +
          ar +
          "\n" +
          "TOTAL BOXES: " +
          bx +
          "\n" +
          "TOTAL TILES: " +
          tt +
          "\n" +
          "TOTAL PRICE: " +
          tp,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const onShare1 = async () => {
    try {
      const result = await Share.share({
        message:
          "* WALL ESTIMATE *\n" +
          "TOTAL LIGHT: " +
          l +
          "\n" +
          "TOTAL DARK: " +
          d +
          "\n" +
          "TOTAL MOTIVE: " +
          m +
          "\n" +
          "\n*TOTAL BOXES*: " +
          b +
          "TOTAL PRICE: " +
          p,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleClearText = () => {
    setLength("");
    setLH("");
    setTileArea("");
    setWallHeight("");
    setDoor("");
    setWidth("");
    setPriceBox("");
  };

  return (
    <View style={styles.container}>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.innerContainer}>
      <View style={styles.rowContainer}>
        <View style={styles.column}>
          <Text style={styles.label}>Length(f)</Text>
          <TextInput
            style={styles.input}
            value={length}
            onChangeText={setLength}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Width(f)</Text>
          <TextInput
            style={styles.input}
            value={width}
            onChangeText={setWidth}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.column}>
          <Text style={styles.label}>Door(SqM)</Text>
          <TextInput
            style={styles.input}
            value={door}
            onChangeText={setDoor}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Wall Height(f)</Text>
          <TextInput
            style={styles.input}
            value={wallHeight}
            onChangeText={setWallHeight}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.touchf} onPressIn={submitHandle}  onPressOut={pressHandler}>
          <Text style={styles.touchte}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchff} onPress={handleClearText}>
          <Text style={styles.touchte}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableWithoutFeedback>
</View>


// OlD CODE
// <View style={styles.container}>
    //     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    //       <View style={styles.container}>
    //         <View style={styles.labelcontainer}>
    //         <Text style={styles.label}>Length(f)</Text>
    //         <Text style={styles.label1}>Width(f)</Text>
    //         </View>
    //         <View style={styles.inputContainer}>
             
    //           <TextInput
    //             style={styles.input}
    //             value={length}
    //             onChangeText={setLength}
    //             keyboardType="numeric"
    //           />
    //            <TextInput
    //             style={styles.input1}
    //             value={width}
    //             onChangeText={setWidth}
    //             keyboardType="numeric"
    //           />

    //         </View>

    //         <View style={styles.labelcontainer}>
    //         <Text style={styles.label2}>Door(SqM)</Text>
    //         <Text style={styles.label3}>Wall Height(f)</Text>
    //         </View>

    //         <View style={styles.inputContainer}>
             
    //           <TextInput
    //             style={styles.input}
    //             value={door}
    //             onChangeText={setDoor}
    //             keyboardType="numeric"
    //           />

    //           <TextInput
    //             style={styles.input1}
    //             value={wallHeight}
    //             onChangeText={setWallHeight}
    //             keyboardType="numeric"
    //           />
    //         </View>

    //         <View style={styles.buttonContainer}>
    //           <TouchableOpacity style={styles.touchf} onPress={pressHandler}>
    //             <Text style={styles.touchte}>Continue</Text>
    //           </TouchableOpacity>

    //           <TouchableOpacity
    //             style={styles.touchff}
    //             onPress={handleClearText}
    //           >
    //             <Text style={styles.touchte}>Clear</Text>
    //           </TouchableOpacity>
    //         </View>
    //       </View>

    //       {/* <View
    //             style={{
    //               flexDirection: "row",
    //               alignItems: "center",
    //             }}
    //           >
    //             <Text style={{ marginRight: 10, fontWeight: "500" }}>
    //               {isEnabled ? "Bathroom" : "Floor/Future Wall"}
    //             </Text>
    //             <Switch
    //               trackColor={{ false: "#767577", true: "#81b0ff" }}
    //               thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
    //               onValueChange={(value) => {
    //                 setIsEnabled(!isEnabled);
    //               }}
    //               value={isEnabled}
    //             />
    //           </View> */}
    //     </TouchableWithoutFeedback>
    // </View>

  );
}

const styles = StyleSheet.create({


  touchte: {
    color: "blue",
    fontSize: 18,
    paddingTop: 12,
    textAlign: "center",
    fontWeight: "500",
  },
  touch: {
    height: 40,
    width: 140,
    backgroundColor: "#4d72a1",

    color: "black",
    marginTop: 20,
    marginLeft: 130,
    borderRadius: 15,
  },

  touchf: {
    height: 50,
    width: 140,
    backgroundColor: "white",

    color: "black",
    marginTop: 10,
    borderRadius: 10,
    marginRight:10
  },
  touchff: {
    height: 50,
    width: 140,
    backgroundColor: "white",
    color: "black",
    marginTop: 10,
    borderRadius: 10,
  },

  input: {
    // flex: 1,
    borderWidth: 1,
    width:150,
    borderColor: "gray",
    padding: 5,
    backgroundColor: "white",
    borderRadius: 12,
    fontSize: 21,
    textAlign: "center",
  },
  container: {
    flex: 1,
    paddingTop:50,
    backgroundColor: "#c8c4c4",
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  innerContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize:16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

});