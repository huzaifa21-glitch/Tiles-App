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
import * as FileSystem from 'expo-file-system';
// import TextInput from "./src/components/TextInput";
// import MaterialButtonDanger from "./src/components/MaterialButtonDanger";
// import Share from 'react-native-share';
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useEffect, useRef, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import * as Sharing from "expo-sharing";
var tileLenth;
var tileWidth;

var bb;

export default function Floor({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const scrollViewRef = useRef(null);

  const [myprice, setmyprice] = useState("");
  const [boxi, setboxii] = useState("");
 


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
  const [isVisiblex, setIsVisiblex] = useState(false);

  const options = ["1", "2", "3", "4", "5", "6"];

  const optiona = ["1.44", "1.5", "1.3", "1.21"];
  const optionc = ["12x24", "10x20", "8x26", "9x36"];

  const [type, setType] = useState(options[0]);

  const [result, setResult] = useState(false);
  const handleButtonClick = () => {};

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
    tilelength: null,
    tilewidth: null,
  });
  
  

  // const [tileWidth, setTileWidth] = useState('');
  const tiles = [
    { size: "10x20", sqm: 1.5, qty: "12" },
    { size: "10x30", sqm: 1.5, qty: "8" },
    { size: "24x24", sqm: 1.44, qty: "4" },
    { size: "24x48", sqm: 1.44, qty: "2" },
    { size: "32x32", sqm: 1.92, qty: "3" },
    { size: "8x12", sqm: 1.4, qty: "23" },
    { size: "9x36", sqm: 1.21, qty: "6" },
    { size: "12x24", sqm: 1.44, qty: "8" },
    { size: "8x26", sqm: 1.3, qty: "10" },
    { size: "16x16", sqm: 1.6, qty: "10" },
    { size: "8x48", sqm: 1.44, qty: "6" },
    { size: "16x32", sqm: 1.92, qty: "6" },
    { size: "6x37", sqm: 0.78, qty: "6" },
    {size: "others"}
  ];

  const [selectedValue, setSelectedValue] = useState("");

  const handlePickerChange = (value) => {
    setSelectedValue(value);

    if (value === ""|| value==='others') {
      setval((prevState) => ({
        ...prevState,
        tilelength:'',
        tilewidth:'',
        sqinbox: '',
      }));
    } else {
      const selectedTile = tiles.find((tile) => tile.size === value);
      const [width, height] = selectedTile.size.split("x");

      setval((prevState) => ({
        ...prevState,
        tilelength:width,
        tilewidth:height,
        // length: width,
        // width: height,
        sqinbox: selectedTile.sqm.toString(),
      }));

      // setTileW(height);
      // setTileL(width);
      // setTileSize();
      // settileinbox(selectedTile.qty);
    }
  };


  function calculateBoxesAndTiles(totalBoxes, tilesPerBox) {
    var p = totalBoxes.toString().split(".");
    p[1] = "." + p[1];
    var box = parseInt(p[0]);

    var tile = parseFloat(p[1]);
    // console.log(tile)
    tile = Math.ceil(tile * tilesPerBox);
    return {
      numberOfBoxes: box,
      additionalTiles: tile,
    };
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [at, setat] = useState(0);
  const [modalVisible1, setModalVisible1] = useState(false);

  const [groutprice, setgroutprice] = useState(0);

  


  const [bondbags, setbondbags] = useState(0);
  const [bondprice, setbondprice] = useState(0);
  const [realgrout, setrealgrout] = useState(0);

  const [lspacer, setlspacer] = useState(0);

  const [lspacerprice, setlspacerprice] = useState(0);

  const [spacer, setspacer] = useState(0);

  const [spacerprice, setspacerprice] = useState(0);

  // const scrollViewRef1 = useRef(null);
  // setTimeout(scrollToPosition, 2000);

  function handlePress() {
    Keyboard.dismiss();
    handleInputFocus();
    var areai = vals.length * vals.width;

    var meteri = areai / 10.76;
    meteri = meteri.toFixed(2);

    var boxi= Math.ceil(meteri / vals.sqinbox)
    setboxii ( Math.ceil(meteri / vals.sqinbox));

    var boxp = Math.ceil(meteri / vals.sqinbox);
    // console.log('line 224: '+boxp)
    console.log(boxi);
    meteri = boxi * vals.sqinbox;
   
    var totalpricei = boxi * vals.sqinbox * vals.price;
    totalpricei = Math.ceil(totalpricei);

    setout({
      meter: meteri,
      totalprice: totalpricei,
      box: boxi,
    });
    console.log(meteri);
  console.log('line 237: '+output.meter);
  var a = parseFloat(meteri);
  a = Math.round(a * 8);
  bb = Math.round(a / 20);
  console.log('line241: '+bb);
  setbondbags(bb);

  var ba = parseFloat(meteri);
  ba = Math.round(ba / 10);
  setrealgrout(ba);
   
  const resdata = { tl: vals.tilelength, tw: vals.tilewidth, totsqm: meteri, totbox: boxi,bond:bb, grout:ba, fl:vals.length,fw:vals.width, price:vals.price, sqb: vals.sqinbox };

  const readTextFile = async () => {
    const fileUri = FileSystem.documentDirectory + 'binaryais.txt'; // File path and name
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri); // Check if the file exists
  
      if (fileInfo.exists) {
        // Read the existing file content
        const fileContent = await FileSystem.readAsStringAsync(fileUri);
  
        console.log('Existing file content:', fileContent);
       
        await FileSystem.writeAsStringAsync(fileUri, parseInt(parseInt(fileContent)+1).toString());
        const fileContentx = await FileSystem.readAsStringAsync(fileUri);
  
        console.log('ADDED 1:', fileContentx);

        
        if(fileContentx>699)
        {
          Alert.alert("Update Required!","Turn On Your Internet Connection to update the application", [
            {
              text: 'OK',
              onPress: () => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  })
                );
              }
            }
          ]
          )
        }


        }
    } catch (error) {
      console.log('Error reading or creating text file:', error);
    }
  };
  readTextFile();
   
 navigation.navigate('Floor Results',{resdata});
    
  }
  const handleInputPress = () => {
    setResult(false);
  };

  const data = [
    { key: "1", value: "1" },
    { key: "2", value: "2" },
  ];


  const onShare = async () => {
    const ar = output.meter;
    const bx = output.box;
    // const tt = output.totaltiles;
    const tp = output.totalprice;
    const bd = (bondprice*bondbags)
    const gt = (groutprice*realgrout)
    const ls = (lspacer*lspacerprice)
    const sp = (spacerprice*spacer)
    const gtot =(
      parseFloat(output.totalprice) +
      parseInt(bondprice * bondbags) +
      parseInt(groutprice * realgrout) +
      parseInt(spacer * spacerprice) +
      parseInt(lspacer * lspacerprice))

    try {
      const result = await Share.share({
        message:
          "* FLOOR/FUTURE WALL ESTIMATE *\n" +
          "TOTAL AREA: " +
          ar +
          "\n" +
          "TOTAL BOXES: " +
          bx +
          "\n" +
          "TOTAL PRICE: " +
          tp+
          "\n" +
          "BOND PRICE: " +bd+
          "\n" +
          "GROUT PRICE: " +gt+
          "\n" +
          "LEVEL SPACER PRICE: " +ls+
          "\n" +
          "SPACER PRICE: " +sp+
          "\n" +
          "GRAND TOTAL: " +gtot,
          
          

          
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
    console.log("CLEARS");
    setval({
      length: null,
      width: null,
      sqinbox: null,
      tilesinbox: null,
      price: null,
    });
  };

  const handleInputFocus = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  

  

  const handleChangeText = (newText) => {
    setText(newText);
  };
  // setTimeout(() => scrollViewRef.current.scrollToEnd({duration: 2000, animated: true }) , 100); 


  return (
    <ScrollView 
    ref={scrollViewRef}
     style={{flex:1, backgroundColor: "#c8c4c4"}}>
    <SafeAreaView style={styles.area}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{alignItems:'center', justifyContent:'center'}}>
        <Text style={styles.heading}>Floor Size</Text>
        </View>
          <View style={styles.area}>
          
          <View style={styles.widthRow}>
          <Text style={styles.length}>Length</Text>
         
              <Text style={styles.width}>Width</Text>
             
            </View>
            <View style={styles.lengthRow}>

              <TextInput
                 onFocus={handleInputPress}
                keyboardType="numeric"
                textAlign="center"
                textAlignVertical="center"
                text={vals.length}
                value={vals.length}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => setval({ ...vals, length: text })}
                style={styles.TextInput1}
                
              ></TextInput>

              <TextInput
              onFocus={handleInputPress}
                keyboardType="numeric"
                textAlign="center"
                textAlignVertical="center"
                value={vals.width}
                multiline={true}
                numberOfLines={4}
                style={styles.TextInput2}
                onChangeText={(text) => setval({ ...vals, width: text })}
                
              ></TextInput>
            </View>

           
            <Text style={styles.heading}>Tile Size</Text>
          <View style={{borderRadius:7, borderWidth:2, borderColor:'#FFF',marginTop:10}}>
          
            <Picker
              style={styles.picker}
              selectedValue={selectedValue}
              onValueChange={handlePickerChange}
            >
              <Picker.Item
                style={{ fontWeight: "800" }}
                label="Select"
                value=""
              />
              {tiles.map((tile, index) => (
                <Picker.Item key={index} label={tile.size} value={tile.size} />
              ))}
            </Picker>
          </View>
          <View style={styles.widthRow}>
          <Text style={styles.tlength}>Tile Length</Text>
         
              <Text style={styles.twidth}>Tile Width</Text>
             
            </View>

          <View style={styles.lengthRow}>

              <TextInput
                 onFocus={handleInputPress}
                keyboardType="numeric"
                textAlign="center"
                textAlignVertical="center"
                value={vals.tilelength}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => setval({ ...vals, tilelength: text })}
                style={styles.TextInput1}
                
              ></TextInput>

              <TextInput
              onFocus={handleInputPress}
                keyboardType="numeric"
                textAlign="center"
                textAlignVertical="center"
                value={vals.tilewidth}
                multiline={true}
                numberOfLines={4}
                style={styles.TextInput2}
                onChangeText={(text) => setval({ ...vals, tilewidth: text })}
                
              ></TextInput>
            </View>

            <View style={styles.widthRow}>
            <Text style={styles.text2}>SqM in Box</Text>
            <Text style={styles.text3}>Price(SqM)</Text>
         
             
            </View>

            <View style={styles.lengthRow}>
             
              <TextInput
              onFocus={handleInputPress}
                keyboardType="numeric"
                textAlign="center"
                textAlignVertical="center"
                value={vals.sqinbox}
                multiline={true}
                numberOfLines={4}
                style={styles.TextInput1}
                onChangeText={(text) => setval({ ...vals, sqinbox: text })}
               
              ></TextInput>
             
              <TextInput
              onFocus={handleInputPress}
                keyboardType="numeric"
                textAlign="center"
                textAlignVertical="center"
                multiline={true}
                value={vals.price}
                numberOfLines={4}
                style={styles.TextInput2}
                onChangeText={(text) => setval({ ...vals, price: text })}
           
              ></TextInput>
            </View>


            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handlePress} style={styles.touchf}>
                <Text style={styles.touchte}>Calculate</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                style={styles.touchff}
                onPress={()=>{handleClearText}}
              >
                <Text style={styles.touchte}>Clear</Text>
              </TouchableOpacity> */}
            </View>
          </View>

         
         
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  area: {
    backgroundColor: "#c8c4c4",
    flex: 1,
    // paddingHorizontal: 10,
    alignItems:'center',
    // justifyContent:'center',
  },
  heading:{
    fontSize: 24,
    fontWeight: 'bold',
    // marginBottom: 10,
    color: 'black',
    marginTop:10
  },
  picker: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    height: 25,
    width: 140,
  },
  modalhead: {
    textAlign: "center",

    color: "#960018",
    fontWeight: "600",
    fontSize: 20,
    marginBottom: 10,
    // borderBottomWidth:1,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom:20,
  },

  touchff: {
    height: 50,
    width: 140,
    backgroundColor: "white",
    marginLeft: 50,
    color: "black",
    marginTop: 10,
    borderRadius: 10,
  },
  modalView: {
    width: 250,
    // padding: 40,
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#9e1b32",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

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
  },
  containeri: {
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    backgroundColor: "transparent",
    flexDirection: "row",
    paddingLeft: 16,
  },
  labeli: {
    fontSize: 16,
    lineHeight: 16,
    paddingTop: 16,
    paddingBottom: 8,
    color: "#000",
    opacity: 0.5,
    alignSelf: "flex-start",
  },
  inputStylei: {
    color: "#000",
    paddingRight: 5,
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    paddingTop: 14,
    paddingBottom: 8,
    paddingLeft: 30,
  },
  container: {
    flex: 1,
  },
  rect: {
    top: -2,
    left: 0,
    width: 400,
    height: 80,
    position: "absolute",
    backgroundColor: "#4d72a1",
  },
  tileCalculator: {
    // fontFamily: "roboto-700",
    // fontFamily: 'Arial',
    color: "white",
    fontSize: 19,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 3,
    marginTop: 15,
    marginLeft: 34,
  },
  byNaveedTraders: {
    // fontFamily: "roboto-italic",
    color: "rgba(255,255,255,1)",
    marginLeft: 165,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 60,
    height: 54,
    width: 41,
  },
  rectStack: {
    width: 300,
    height: 54,
    marginTop: 30,
  },

  length: {
    // fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "500",
    marginRight:10
  },
  tlength: {
    // fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "500",
  },
  twidth: {
    // fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "500",
    marginLeft:80
  },
  length1: {
    // fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 20,
    marginTop: 40,
    fontWeight: "500",
  },
  lengthRow: {
    // height: 44,
    flexDirection: "row",
    // marginTop: 5,
    justifyContent:'space-evenly',
    alignItems:'flex-start',
    marginBottom:10,
    
    // marginLeft: 37,
    // marginRight: 78,
  },
  width: {
    // fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "500",
    marginLeft:110
  },
  text2: {
    // fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "500",
  },
  text3: {
    // fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "500",
    marginLeft:70
  },
  widthRow: {
    height: 44,
    flexDirection: "row",
    marginTop: 10,

    // marginLeft: 37,
    // marginRight: 78,
  },
  sqMInBox: {
    // fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "500",
  },
  sqMInBoxRow: {
    height: 44,
    flexDirection: "row",
    marginTop: 11,
    fontWeight: "500",
    textAlign: "center",
  },
  tilesInBox: {
    // fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "500",
    textAlign: "center",
  },
  TextInput: {
    height: 45,
    width: 200,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 20,
    fontSize: 22,
    borderRadius: 10,
    textAlign: "center",
  },
  TextInput1: {
    height: 45,
    width: 120,
    backgroundColor: "rgba(255,255,255,1)",
    // marginLeft: 60,
    fontSize: 22,
    borderRadius: 10,
    textAlign: "center",
  },

  TextInput2: {
    height: 45,
    width: 120,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 50,
    fontSize: 22,
    borderRadius: 10,
    textAlign: "center",
  },
  tilesInBoxRow: {
    height: 44,
    flexDirection: "row",
    marginTop: 10,
  },
  priceSqM: {
    // fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "500",
  },
  TextInput3: {
    height: 44,
    width: 144,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 8,
    fontSize: 22,
    borderRadius: 12,
    textAlign: "center",
  },
  priceSqMRow: {
    height: 44,
    flexDirection: "row",
    marginTop: 20,
  },
  materialButtonDanger: {
    height: 36,
    width: 50,
    backgroundColor: "rgba(0,0,0,1)",
    marginTop: 45,
    marginLeft: 140,
  },
  rect3: {
    flexDirection: "row",
    top: 0,
    left: 0,
    width: 420,
    height: 31,
    position: "absolute",
    backgroundColor: "#E6E6E6",
    textAlign: "center",
  },
  floor: {
    // fontFamily: "roboto-700",
    color: "rgba(0,0,0,1)",
    fontSize: 18,
    marginTop: 4,
    marginLeft: "30%",
  },

  containerx: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    width: 120,
    marginLeft: 5,
    fontWeight: "500",
    fontSize: 18,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    backgroundColor: "white",
    borderRadius: 12,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalhead: {
    fontWeight: 'bold',
    fontSize: 24,
    // alignItems:'center'
  },
});