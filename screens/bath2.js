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
import { useRoute } from "@react-navigation/native";

// import TextInput from "./src/components/TextInput";
// import MaterialButtonDanger from "./src/components/MaterialButtonDanger";
// import Share from 'react-native-share';
import React, { useEffect, useRef, useState } from "react";
import * as Sharing from "expo-sharing";

// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { Picker } from "@react-native-picker/picker";
// import { ScrollView } from 'react-native-web';

export default function Bath2({ navigation }) {
  const scrollViewRef = useRef(null);
  const handleInputFocus = () => {
    setTimeout(() => scrollViewRef.current.scrollToEnd({duration: 5000, animated: true }) , 100);

    

  };

  
 
  const route = useRoute();
  const { data1 } = route.params;

  const [isEnabled, setIsEnabled] = useState(false);

  const [length, setLength] = useState(data1.l1);
  // console.log(length);
  const [width, setWidth] = useState(data1.w1);
  const [door, setDoor] = useState(data1.d1);
  const [wallHeight, setWallHeight] = useState(data1.wall1);
  const [tilearea, setTileArea] = useState("");
  const [lh, setLH] = useState("");
  const [priceBox, setPriceBox] = useState("");
  const [tl, setTL] = useState("");
  const [th, setTH] = useState("");
  const [ds, setDS] = useState("");
  const [ms, setMS] = useState("");
  const [ls, setLS] = useState("");

  const [floorsq, setfloorsq] = useState();

  const [wallsq, setwallsq] = useState();

  const [totalsq, settotalsq] = useState();

  const [m, setm] = useState("");
  const [d, setd] = useState("");
  const [l, setl] = useState("");
  const [b, setb] = useState("");
  const [p, setp] = useState("");

  const f = () => {
    var areai = length * width;
    var meteri = parseFloat(areai / 10.76).toFixed(2);

    // Calculate wall area in square meters
    var len = parseFloat(length);
    var wid = parseFloat(width);
    var wall = parseFloat(wallHeight);
    var dr = parseFloat(door);

    // var wall_area_in_sqm = parseFloat(((2 * (len + wid) * wall) / 10.76)-dr);

    var wall_area_in_sqm = parseFloat((len + wid) * 2);
    var wall_area_in_sqm1 = wall_area_in_sqm;
    var wall_area_in_sqm2 = wall_area_in_sqm1 * wall;
    var wall_area_in_sqm3 = wall_area_in_sqm2 / 10.76;
    wall_area_in_sqm = wall_area_in_sqm3;
    wall_area_in_sqm=wall_area_in_sqm-dr;

    var total_area_in_sqm = (parseFloat(meteri) + wall_area_in_sqm).toFixed(2);
    setfloorsq(meteri);
    setwallsq(parseFloat(wall_area_in_sqm).toFixed(2));
    settotalsq(total_area_in_sqm);
  };
  useEffect(() => {
    f();
  }, []);

  const options = ["Select", "0", "1", "2", "3", "4", "5", "6"];

  const optiona = ["1.44", "1.5", "1.3", "1.21"];
  const optionc = ["12x24", "10x20", "8x26", "9x36"];

  const [type, setType] = useState(options[0]);
  // function calculateTiles(
  //   length,
  //   width,
  //   door,
  //   wallheight,
  //   tilearea,
  //   pricebox,
  //   tl,
  //   th,
  //   ds,
  //   ms,
  //   ls
  // ) {
  //   const area =
  //     parseFloat(length) +
  //     parseFloat(length) +
  //     parseFloat(width) +
  //     parseFloat(width) -
  //     parseFloat(door);

  //   let areainmeter = area * parseFloat(wallheight);
  //   areainmeter = areainmeter / 10.76;
  //   // console.log("Area in M: " + areainmeter.toFixed(2));

  //   const boxes = Math.ceil(areainmeter / parseFloat(tilearea));
  //   const totalprice = boxes * parseFloat(pricebox);

  //   const motive = (area * parseFloat(th)) / parseFloat(tl);
  //   const dark = (area * parseFloat(th)) / parseFloat(tl);
  //   const light = (area * parseFloat(th)) / parseFloat(tl);

  //   setm(Math.ceil(motive * parseFloat(ms)));
  //   setd(Math.ceil(dark * parseFloat(ds)));
  //   setl(Math.ceil(light * parseFloat(ls)));
  //   setb(boxes);
  //   setp(totalprice);
  //   console.log(m + "MOY " + d + "FST " + l + " " + b + " " + p + " ");
  //   setModalVisible1(true);
  // }

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

  const [selectedOption, setSelectedOption] = useState(null);
  const [pricePerBox, setPricePerBox] = useState(" ");
  const [selectedOptionx, setSelectedOptionx] = useState(null);
  const [tileinbox, settileinbox] = useState("");
  function handleCalculate() {
    console.log("SA");
    try {
      const [variable1, variable2] = tileDem.split("x");
      setTH(variable1);
      setTL(variable2);

      const ms = totalstepsreq(variable1, wallHeight);

      const data2 = {
        l2: length,
        w2: width,
        wall2: wallHeight,
        d2: door,
        td2: tileDem,
        th2: variable1,
        tl2: variable2,
        ts2: tileSize,
        ms2: ms,
        pb2: pricePerBox,
        farea: floorsq,
        warea: wallsq,
        totalarea: totalsq,
        tinbox: tileinbox,
        wh: wallHeight
      };

      console.log("SA 1");
      if (Object.values(data2).some((value) => value === "" || value == null && value !== data2.pb2)) {
        Alert.alert("Invalid Data", "Please Fill All Fields to Continue");
        console.log("HERE");
      } else {
        console.log("HERE 1");

        navigation.navigate("Choose Steps", { data2 });
      }
    } catch (e) {
      console.log(" ee " + e);
      Alert.alert(
        "Invalid Data",
        "Please Enter Tile Dimention in Proper Format (12x24)"
      );
    }
  }

  const handleOptionSelect = async (option) => {
    setSelectedOption(option);
  };

  const handleOptionSelectx = async (option) => {
    setSelectedOptionx(option);
  };

  const handlePricePerBoxChange = (value) => {
    setPricePerBox(value);
  };
  function totalstepsreq(tileHeightInches, wallHeightFeet) {
    const INCHES_PER_FOOT = 12;

    const wallHeightInches = wallHeightFeet * INCHES_PER_FOOT;
    const totalSteps = Math.ceil(wallHeightInches / tileHeightInches);

    return totalSteps;
  }

  const [tileSize, setTileSize] = useState("");
  const [tileDem, setTileDem] = useState("");
  const [tileL, setTileL] = useState("");
  const [tileW, setTileW] = useState("");

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
    {size: 'others'}
  ];

  const [selectedValue, setSelectedValue] = useState("");

  const handlePickerChange = (value) => {
    setSelectedValue(value);

    if (value === "" || value==='others') {
      setTileW("");
      setTileL("");
      setTileSize("");
      settileinbox("");
    } 
    else {
      const selectedTile = tiles.find((tile) => tile.size === value);
      const [width, height] = selectedTile.size.split("x");
      setTileW(height);
      setTileL(width);
      setTileSize(selectedTile.sqm.toString());
      settileinbox(selectedTile.qty);
    }
  };

  console.log(tileL, tileW, tileSize);
  console.log(typeof (tileL, tileW, tileSize));
  
  return (
    <ScrollView ref={scrollViewRef} style={styles.scroll}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.imgContainer}>
            <Image
              source={require("../assets/floortiles.png")}
              style={styles.img}
            ></Image>
            <Text style={styles.ftitle}>Floor Area(SqM): </Text>
            <Text style={styles.ftitle2}>{floorsq} </Text>
          </View>
          <View style={styles.imgContainer}>
            <Image
              source={require("../assets/walltiles.png")}
              style={styles.img}
            ></Image>
            <Text style={styles.ftitle}>Wall Area(SqM):  </Text>
            <Text style={styles.ftitle2}>{wallsq} </Text>
          </View>
          <View style={styles.imgContainer}>
            <Image
              source={require("../assets/area.png")}
              style={styles.img}
            ></Image>
            <Text style={styles.ftitle}>Total Area(SqM): </Text>
            <Text style={styles.ftitle2}>{totalsq} </Text>
          </View>

          <View
            style={{
              fontWeight: "800",
              // marginLeft: 10,
              marginBottom: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}
            >
              Tile Length and Width:
            </Text>
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
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 5,
                  }}
                >
                  TILE LENGTH
                </Text>
                <TextInput
                  style={{
                    backgroundColor: "white",
                    fontWeight: "bold",
                    borderRadius: 10,
                    width: 130,
                    height: 40,
                    borderWidth: 1,
                    borderColor: "gray",
                    textAlign: "center",
                    fontSize:19,
                  }}
                  keyboardType="numeric"
                  value={tileL}
                  onChangeText={(text) => setTileL(text)}
                />
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 5,
                  }}
                >
                  TILE WIDTH
                </Text>
                <TextInput
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    fontWeight: "bold",
                    width: 130,
                    height: 40,
                    fontSize:19,
                    borderWidth: 1,
                    borderColor: "gray",
                    textAlign: "center",
                  }}
                  keyboardType="numeric"
                  value={tileW}
                  onChangeText={(text) => setTileW(text)}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 5,
                  }}
                >
                  SQM IN BOX
                </Text>
                <TextInput
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    fontWeight: "bold",
                    width: 130,
                    height: 40,
                    fontSize:19,
                    borderWidth: 1,
                    borderColor: "gray",
                    textAlign: "center",
                  }}
                  keyboardType="numeric"
                  value={tileSize}
                  onChangeText={(text) => setTileSize(text)}
                />
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 5,
                  }}
                >
                  TILES IN EACH BOX
                </Text>
                <TextInput
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    fontWeight: "bold",
                    width: 130,
                    height: 40,
                    fontSize:19,
                    borderWidth: 1,
                    borderColor: "gray",
                    textAlign: "center",
                  }}
                  keyboardType="numeric"
                  value={tileinbox}
                  onChangeText={(value) => settileinbox(value)}
                />
              </View>
            </View>

            <View style={{ flexDirection: "column", alignItems: "center", justifyContent:'center' }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                  flex: 1,
                }}
              >
                PRICE PER SQM
              </Text>
              <TextInput
                
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  fontWeight: "bold",
                  width: 130,
                  marginBottom: 10,
                  height: 40,
                  fontSize:19,
                  borderWidth: 1,
                 
                  borderColor: "gray",
                  textAlign: "center",
                }}
                keyboardType="numeric"
                value={pricePerBox}

                onChangeText={handlePricePerBoxChange}
                onFocus={handleInputFocus}

                
              />

        <TouchableOpacity
              style={styles.touchf}
              onPressIn={() => {
                var cx = tileL + "x" + tileW;
                setTileDem(cx);
              }}
              onPressOut={handleCalculate}
            >
              <Text style={styles.touchte}>Continue</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    marginVertical:20,
    marginHorizontal: 10,
    // marginLeft:20
  },
  picker: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    height: 25,
    width: 140,
  },
  scroll: {
    flex: 1,
    backgroundColor: "#c8c4c4",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rowContainerx: {
    flexDirection: "row",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 10,
  },
  imgContainer: {
    flexDirection: "row",
    justifyContent:'center',
    // marginHorizontal: 10,
    marginVertical: 20,
  },
  img: {
    height: 20,
    width: 20,
  },
  buttonw: {
    flex: 1,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 50,
    paddingVertical: 10,
  },
  selectedButton: {
    backgroundColor: "yellow",
  },
  selectedButtonx: {
    backgroundColor: "yellow",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedButtonText: {},
  inputContainer: {
    marginVertical: 20,
    marginTop: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    width: 100,
  },
  labelx: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    width: 110,
    marginLeft: 35,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    fontSize: 21,
    justifyContent: "center",
  },
  calculateButton: {
    backgroundColor: "blue",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 20,
    alignItems: "center",
  },
  calculateButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

  modalhead: {
    textAlign: "center",

    color: "#960018",
    fontWeight: "600",
    fontSize: 20,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: 250,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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

  buttonshare: {
    backgroundColor: "#2196F3",
    marginBottom: 15,
    width: 100,
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
    width: 150,
    backgroundColor: "white",
    color: "black",
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 50,
    // marginLeft: 5,
  },
  touchff: {
    height: 50,
    width: 140,
    backgroundColor: "white",
    marginLeft: 50,
    color: "black",
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 20,
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
  // container: {
  //   flex: 1,
  // },
  // rect: {
  //   top: -2,
  //   left: 0,
  //   width: 400,
  //   height: 80,
  //   position: "absolute",
  //   backgroundColor: "#4d72a1",
  // },

  rect2: {
    width: "100%",
    height: 705,
    // position: "absolute",

    backgroundColor: "rgba(155,155,155,1)",
    marginTop: 8,
  },
  length: {
    // fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "500",
  },
  TextInput: {
    height: 44,
    width: 144,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 48,
    fontSize: 22,
    borderRadius: 12,
  },
  lengthRow: {
    height: 44,
    flexDirection: "row",
    marginTop: 27,
    marginLeft: 37,
    marginRight: 78,
  },
  width: {
    // fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "500",
  },
  TextInput1: {
    height: 44,
    width: 144,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 58,
    textAlign: "center",
    fontSize: 22,
    borderRadius: 12,
  },
  widthRow: {
    height: 44,
    flexDirection: "row",
    marginTop: 11,
    marginLeft: 37,
    marginRight: 78,
  },
  sqMInBox: {
    // fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "500",
  },
  TextInput2: {
    height: 44,
    width: 144,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 9,
    fontSize: 22,
    borderRadius: 12,
  },
  sqMInBoxRow: {
    height: 44,
    flexDirection: "row",
    marginTop: 11,
    marginLeft: 37,
    marginRight: 78,
    fontWeight: "500",
  },
  tilesInBox: {
    // fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "500",
  },
  TextInput4: {
    height: 44,
    width: 144,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 6,
    fontSize: 22,
    borderRadius: 12,
  },
  tilesInBoxRow: {
    height: 44,
    flexDirection: "row",
    marginTop: 12,
    marginLeft: 37,
    marginRight: 78,
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
  },
  priceSqMRow: {
    height: 44,
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 37,
    marginRight: 78,
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
  buttonContainer: {
    // marginTop:10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  containerx: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "left",
    marginBottom: 10,
  },

  labeld: {
    marginRight: 10,
    width: 200,
    marginLeft: 0,
    fontWeight: "500",
    fontSize: 18,
  },
  ftitle: {
    // marginRight: 10,
    // width: 200,
    marginLeft: 5,
    fontWeight: "500",
    fontSize: 18,
  },
  ftitle2: {
    // marginRight: 10,
    width: 100,
    height: 30,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#FFF",
    marginLeft: 5,
    fontWeight: "500",
    fontSize: 18,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  label: {
    marginRight: 10,
    width: 120,
    marginLeft: 5,
    fontWeight: "500",
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    backgroundColor: "white",
    borderRadius: 12,
    fontSize: 19,
    textAlign: "center",
    marginLeft: 3,
    marginRight: 58,
    width: 120,
  },
  inputx: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    backgroundColor: "white",
    borderRadius: 12,
    fontSize: 19,
    textAlign: "center",

    width: 120,
  },
});