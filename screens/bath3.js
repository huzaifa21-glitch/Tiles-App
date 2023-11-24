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
import { useRoute } from "@react-navigation/native";

// import TextInput from "./src/components/TextInput";
// import MaterialButtonDanger from "./src/components/MaterialButtonDanger";
// import Share from 'react-native-share';
import React, { useEffect, useRef, useState } from "react";
import * as Sharing from "expo-sharing";
import { CommonActions } from '@react-navigation/native';

// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { Picker } from "@react-native-picker/picker";
// import { ScrollView } from 'react-native-web';

export default function Bath3({ navigation }) {
  const route = useRoute();
  const { data2 } = route.params;
  // console.log(data2);
  const [isEnabled, setIsEnabled] = useState(false);

  const [length, setLength] = useState(data2.l2);
  //   console.log(length);
  const [width, setWidth] = useState(data2.w2);
  const [door, setDoor] = useState(data2.d2);
  const [wallHeight, setWallHeight] = useState(data2.wall2);

  const [prosteps, sprosteps] = useState(data2.ms2);
  const [floorsq, setfloorsq] = useState(data2.farea);

  const [wallsq, setwallsq] = useState(data2.warea);

  const [totalsq, settotalsq] = useState(data2.totalarea);

  const MAX_STEPS = prosteps;

  const [tilearea, setTileArea] = useState(data2.ts2);
  const [lh, setLH] = useState(data2.td2);

  const [priceBox, setPriceBox] = useState(data2.pb2);
  //   console.log(priceBox);
  const [tl, setTL] = useState(data2.tl2);
  const [th, setTH] = useState(data2.th2);
  const [ds, setDS] = useState("");
  const [ms, setMS] = useState("");
  const [ls, setLS] = useState("");

  const [tileinbox, settileinbox] = useState(data2.tinbox);

  const [m, setm] = useState("");
  const [d, setd] = useState("");
  const [l, setl] = useState("");
  const [b, setb] = useState("");
  const [p, setp] = useState("");

  function calculateTotalTileArea(totalTiles, tw, th) {
    const tileWidthInches = tw;
    const tileHeightInches = th;

    // Convert tile dimensions from inches to meters
    const tileWidthMeters = tileWidthInches * 0.0254;
    const tileHeightMeters = tileHeightInches * 0.0254;

    // Calculate the area of a single tile in square meters
    const tileArea = tileWidthMeters * tileHeightMeters;

    // Calculate the total area of tiles in square meters
    const totalArea = totalTiles * tileArea;

    return totalArea;
  }

  const options = ["Select", "0", "1", "2", "3", "4", "5", "6"];

  const optiona = ["Select", "1.44", "1.5", "1.3", "1.21"];
  const optionc = ["Select", "12x24", "10x20", "8x26", "9x36"];
  function decimalround(number) {
    let roundedNum = Math.floor(number * 10) / 10; // Round down to the nearest tenth

    let secondDecimalPlace = Math.floor(number * 100) % 10; // Get the second decimal place digit

    if (secondDecimalPlace > 0) {
      roundedNum += 0.1; // Round up to the nearest tenth if the second decimal place is greater than 0
    }

    return roundedNum.toFixed(1);
  }
  
function calculateBoxesAndTiles(totalBoxes, tilesPerBox) {
  var p=(totalBoxes.toString().split('.'))
  p[1]='.'+p[1]
  var box=parseInt(p[0])
  
  
  var tile=parseFloat(p[1])
  // console.log(tile)
  tile=Math.ceil(tile*tilesPerBox)
  return {
    numberOfBoxes: box,
    additionalTiles: tile
  };
  
}


function findTiles(floorArea, tilesPerBox, boxesPerM2 ) {
 var fbx=decimalround(floorArea/boxesPerM2)
const result = calculateBoxesAndTiles(fbx, tilesPerBox);
return result
  };

  const [type, setType] = useState(options[0]);
  function calculateTiles(
    boxtiles,
    floortype,
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
    ls,
    floorsq,
    wallsq,
    totalsq
  ) {
    var first = length * 2 + width * 2;
    var first1 = first - door;
    var f = first1 * 12;
    var tileinrow = f / tl;
    console.log("OK " + tileinrow);
    var dtiles = tileinrow * ds;
    var ltiles = tileinrow * ls;
    var mtiles = tileinrow * ms;
    dtiles = decimalround(dtiles);
    mtiles = decimalround(mtiles);
    ltiles = decimalround(ltiles);
// console.log("CHECK THIS :" +dtiles,mtiles,ltiles);
var tileHeightMeters = th / 39.37;
var tileWidthMeters = tl / 39.37;
var tileAreaSqM = tileHeightMeters * tileWidthMeters;
var totalTilesRequired = totalsq / tileAreaSqM;
var totalwalltiles = wallsq / tileAreaSqM;
var totalfloortiles = floorsq / tileAreaSqM;
//EACH CATORTY REQUIRED

var totalsteps = ls + ms + ds;
var persteptiles = totalwalltiles / totalsteps;

var lightTilesRequired = persteptiles * ls;
var darkTilesRequired = persteptiles * ds;
var motiveTilesRequired = persteptiles * ms;

dtiles=darkTilesRequired
ltiles=lightTilesRequired
mtiles=motiveTilesRequired



    var dbx = decimalround(dtiles / boxtiles);

    var mbx = decimalround(mtiles / boxtiles);

    var lbx = decimalround(ltiles / boxtiles);
    console.log("CHECK THIS NO OF BOXES DML :" +dbx,mbx,lbx);

    var rd=calculateBoxesAndTiles(dbx,boxtiles);
    var dbx1=rd.numberOfBoxes
    var dbx2=rd.additionalTiles
      


    var rl=calculateBoxesAndTiles(lbx,boxtiles);
    var lbx1=rl.numberOfBoxes
    var lbx2=rl.additionalTiles


   
    var rm=calculateBoxesAndTiles(mbx,boxtiles);
    var mbx1=rm.numberOfBoxes
    var mbx2=rm.additionalTiles


    console.log("LIGHT TILES BOXES " + lbx1 + "AND TILES " + lbx2);
    console.log("DARK TILES BOXES " + dbx1 + "AND TILES " + dbx2);

    console.log("MOTIVE TILES BOXES " + mbx1 + "AND TILES " + mbx2);
    // total tiles req


    // var lightboxes = Math.ceil(lightTilesRequired / tileinbox)
    // var darkboxes = Math.ceil(darkTilesRequired / tileinbox)
    // var motiveboxes = Math.ceil(motiveTilesRequired / tileinbox)
    var sqinstep = wallsq / totalsteps;

    var lightboxes = Math.ceil((ls * sqinstep) / tilearea);
    var darkboxes = Math.ceil((ds * sqinstep) / tilearea);
    var motiveboxes = Math.ceil((ms * sqinstep) / tilearea);
    console.log(totalsq, tilearea);
    var totalboxes = totalsq / tilearea;
    totalboxes = Math.ceil(totalboxes);
    console.log("total boxes " + totalboxes);
    // var totalboxes = lightboxes + darkboxes + motiveboxes
    var boxesinsqm = totalboxes * tilearea;

    var totalprice = boxesinsqm * pricebox;

    //floor
    var tileHeightMetersf = th / 39.37;
    var tileWidthMetersf = tl / 39.37;
    var tileAreaSqMf = tileHeightMetersf * tileWidthMetersf;
    var totalTilesRequiredfloor = Math.ceil(floorsq / tileAreaSqMf);

    var floorboxes = decimalround(floorsq / tilearea);
    var fbx = decimalround(floorsq / tilearea);

    console.log("f boxes " + floorboxes);


    
 var r=findTiles(floorsq, boxtiles, tilearea);
 var fbx1=r.numberOfBoxes
 var fbx2=r.additionalTiles
    

    console.log("FLOOR BOXES " + fbx1 + " FLOOR TILES " + fbx2);

    if (uniqueName == "Light") {
      lbx1 = parseFloat(lbx1) + parseFloat(fbx1);
      lbx2 = parseFloat(lbx2) + parseFloat(fbx2);

      // console.log("light tiles: "+lbx2)
      // console.log('boxtiles: '+boxtiles);
      if (lbx2 == boxtiles) {
        console.log("os");
        lbx1 = lbx1 + 1;
        lbx2 = 0;
      }
      if (lbx2 % boxtiles > 0) {
        let co = Math.floor(lbx2 / boxtiles);
        //   console.log(co)

        lbx1 = lbx1 + co;
        lbx2 = lbx2 % boxtiles;
      }
    }

    if (uniqueName == "Dark") {
      dbx1 = parseFloat(dbx1) + parseFloat(fbx1);
      dbx2 = parseFloat(dbx2) + parseFloat(fbx2);

      if (dbx2 == boxtiles) {
        console.log("os");
        dbx1 = dbx1 + 1;
        dbx2 = 0;
      }
      if (dbx2 % boxtiles > 0) {
        let co = Math.floor(dbx2 / boxtiles);
        //   console.log(co)

        dbx1 = dbx1 + co;
        dbx2 = dbx2 % boxtiles;
      }
      darkboxes = darkboxes + floorboxes;
    }
    // console.log("dark tiles: " + dbx2);
    // console.log("boxtiles: " + boxtiles);
    if (uniqueName == "Motive") {
      mbx1 = parseFloat(mbx1) + parseFloat(fbx1);
      mbx2 = parseFloat(mbx2) + parseFloat(fbx2);

      if (mbx2 == boxtiles) {
        // console.log('os')
        mbx1 = mbx1 + 1;
        mbx2 = 0;
      }
      if (mbx2 % boxtiles > 0) {
        let co = Math.floor(mbx2 / boxtiles);
        //   console.log(co)

        mbx1 = mbx1 + co;
        mbx2 = mbx2 % boxtiles;
      }

     
    }

    if (dbx2 % boxtiles==0) {
      console.log("os");
      let co = Math.floor(dbx2 / boxtiles);
      dbx1 = parseInt(dbx1) + parseInt(co);
      dbx2 = 0;
    }

    if (mbx2 % boxtiles==0) {
      // console.log('os')
      let co = Math.floor(mbx2 / boxtiles);
      mbx1 = parseInt(mbx1) + parseInt(co);
      mbx2 = 0;
    }
    if (lbx2 % boxtiles==0) {
      let co = Math.floor(lbx2 / boxtiles);
      lbx1 = parseInt(lbx1) + parseInt(co);
      // lbx1 = parseInt(lbx1) + 1;
      lbx2 = 0;
    }

    var areads = darkboxes * tilearea;
    var areals = lightboxes * tilearea;
    var areams = motiveboxes * tilearea;

    var floorsqms = floorboxes * tilearea;
    var floorprice = floorsqms * pricebox;
    var finalsum = floorprice + totalprice;
    const finaldata = {
      ads: areads,
      als: areals,
      ams: areams,
      floorarea: floorsq,
      wallarea: wallsq,
      totalarea: totalsq,
      totallight: lightboxes,
      totaldark: darkboxes,
      totalmotive: motiveboxes,
      totalboxw: totalboxes,
      wallprice: totalprice,
      floorb: floorboxes,
      floorpri: floorprice,
      amount: finalsum,
      pricex: pricebox,
      lb: lbx1,
      lt: lbx2,
      ll: tl,
      ww: th,
      mb: mbx1,
      mt: mbx2,
      whh: data2.wh,
      db: dbx1,
      dt: dbx2,
      tb: boxtiles,
      area: tilearea,
      len: length,
      wid: width,
      dor: data2.d2,
      
    };
    console.log("DATA CACLCULATED:  " + JSON.stringify(finaldata));
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
  
    navigation.navigate("Result", { finaldata });

    // const area =
    //   parseFloat(length) +
    //   parseFloat(length) +
    //   parseFloat(width) +
    //   parseFloat(width) -
    //   parseFloat(door);

    // let areainmeter = area * parseFloat(wallheight);
    // areainmeter = areainmeter / 10.76;
    // // console.log("Area in M: " + areainmeter.toFixed(2));

    // const boxes = Math.ceil(areainmeter / parseFloat(tilearea));
    // const totalprice = boxes * parseFloat(pricebox);

    // const motive = (area * parseFloat(th)) / parseFloat(tl);
    // const dark = (area * parseFloat(th)) / parseFloat(tl);
    // const light = (area * parseFloat(th)) / parseFloat(tl);

    // setm(Math.ceil(motive * parseFloat(ms)));
    // setd(Math.ceil(dark * parseFloat(ds)));
    // setl(Math.ceil(light * parseFloat(ls)));
    // setb(boxes);
    // setp(totalprice);
    // console.log(m + "MOY " + d + "FST " + l + " " + b + " " + p + " ");
    // setModalVisible1(true);
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
          "*** *FLOOR/FUTURE WALL TRADERS* ***\n" +
          "TOTAL AREA: " +
          ar +
          "\n" +
          "TOTAL BOXES: " +
          bx +
          "\n" +
          "TOTAL TILES: " +
          tt +
          "\n" +
          "*TOTAL PRICE*: " +
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
          "*** *WALL ESTIMATE* ***\n" +
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
          "*TOTAL PRICE:* " +
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
  const [ds12, setDS12] = useState(0); // Dark steps
  const [ms12, setMS12] = useState(0); // Motive steps
  const [ls12, setLS12] = useState(0); // Light steps

  const handleIncrement = (type) => {
    if (type === "ds12" && ds12 < MAX_STEPS && ds12 + ms12 + ls12 < MAX_STEPS) {
      setDS12(ds12 + 1);
    } else if (
      type === "ms12" &&
      ms12 < MAX_STEPS &&
      ds12 + ms12 + ls12 < MAX_STEPS
    ) {
      setMS12(ms12 + 1);
    } else if (
      type === "ls12" &&
      ls12 < MAX_STEPS &&
      ds12 + ms12 + ls12 < MAX_STEPS
    ) {
      setLS12(ls12 + 1);
    }
  };
  const [uniqueName, setUniqueName] = useState("");

  const handleRadioPress = (value) => {
    setUniqueName(value);
  };
  const handleDecrement = (type) => {
    if (type === "ds12" && ds12 > 0) {
      setDS12(ds12 - 1);
    } else if (type === "ms12" && ms12 > 0) {
      setMS12(ms12 - 1);
    } else if (type === "ls12" && ls12 > 0) {
      setLS12(ls12 - 1);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.labelh}>
              You Can Choose Upto {prosteps} Steps (Wall)!
            </Text>

            <View style={styles12.container}>
              <View style={styles12.inputContainer}>
                <Text style={styles12.label}>Total Dark Steps:</Text>
                <View style={styles12.numberInputContainer}>
                  <TouchableOpacity
                    style={styles12.button}
                    onPress={() => handleDecrement("ds12")}
                  >
                    <Text style={styles12.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles12.numberInput}>{ds12}</Text>
                  <TouchableOpacity
                    style={styles12.button}
                    onPress={() => handleIncrement("ds12")}
                  >
                    <Text style={styles12.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles12.inputContainer}>
                <Text style={styles12.label}>Total Motive Steps:</Text>
                <View style={styles12.numberInputContainer}>
                  <TouchableOpacity
                    style={styles12.button}
                    onPress={() => handleDecrement("ms12")}
                  >
                    <Text style={styles12.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles12.numberInput}>{ms12}</Text>
                  <TouchableOpacity
                    style={styles12.button}
                    onPress={() => handleIncrement("ms12")}
                  >
                    <Text style={styles12.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles12.inputContainer}>
                <Text style={styles12.label}>Total Light Steps:</Text>
                <View style={styles12.numberInputContainer}>
                  <TouchableOpacity
                    style={styles12.button}
                    onPress={() => handleDecrement("ls12")}
                  >
                    <Text style={styles12.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles12.numberInput}>{ls12}</Text>
                  <TouchableOpacity
                    style={styles12.button}
                    onPress={() => handleIncrement("ls12")}
                  >
                    <Text style={styles12.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  marginBottom: 6,
                  fontWeight: "600",
                }}
              >
                Select Floor Type(Optional)
              </Text>
              <View style={styles2.container}>
                <TouchableOpacity
                  style={styles2.radioButton}
                  onPress={() => handleRadioPress("Light")}
                >
                  <View style={styles2.radioButtonOuter}>
                    {uniqueName === "Light" && (
                      <View style={styles2.radioButtonInner} />
                    )}
                  </View>
                  <Text style={styles2.radioButtonLabel}>Light</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles2.radioButton}
                  onPress={() => handleRadioPress("Motive")}
                >
                  <View style={styles2.radioButtonOuter}>
                    {uniqueName === "Motive" && (
                      <View style={styles2.radioButtonInner} />
                    )}
                  </View>
                  <Text style={styles2.radioButtonLabel}>Motive</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles2.radioButton}
                  onPress={() => handleRadioPress("Dark")}
                >
                  <View style={styles2.radioButtonOuter}>
                    {uniqueName === "Dark" && (
                      <View style={styles2.radioButtonInner} />
                    )}
                  </View>
                  <Text style={styles2.radioButtonLabel}>Dark</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.touchf}
                onPress={() => {
                  if (ds12 + ls12 + ms12 === MAX_STEPS ) {
                    calculateTiles(
                      tileinbox,
                      uniqueName,
                      length,
                      width,
                      door,
                      wallHeight,

                      tilearea,
                      priceBox,
                      tl,
                      th,
                      ds12,
                      ms12,
                      ls12,
                      floorsq,
                      wallsq,
                      totalsq
                    );
                  } else {
                    if (false) {
                      Alert.alert("Floor Type", "Please Choose Floor Type");
                    } else {
                      Alert.alert(
                        "Invalid Steps",
                        "Please Choose upto " +
                          MAX_STEPS +
                          " steps to Continue!"
                      );
                    }
                  }
                }}
              >
                <Text style={styles.touchte}>Calculate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
}
const styles2 = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
    marginLeft: 8,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#000",
  },
  radioButtonLabel: {
    fontSize: 16,
    fontWeight: "400",
  },
  selectedValueText: {
    fontSize: 18,
    marginTop: 10,
  },
});
const styles12 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  numberInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#012169",
    paddingHorizontal: 20,
    paddingVertical: 3,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  numberInput: {
    fontSize: 22,
    backgroundColor: "#0077c0",
    color: "white",
    borderRadius: 20,
    paddingHorizontal: 25,
    fontWeight: "bold",
  },
});

const styles = StyleSheet.create({
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
    width: 140,
    backgroundColor: "white",

    color: "black",
    marginTop: 10,
    borderRadius: 10,
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
  container: {
    flex: 1,
    backgroundColor: "#c8c4c4",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 20,
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
  labelh: {
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 300,
    color: "red",
    marginBottom: 18,
    fontWeight: "800",
    fontSize: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    backgroundColor: "white",
    borderRadius: 12,
  },
});
