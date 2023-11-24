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
import Icon from "react-native-vector-icons/FontAwesome";
// import TextInput from "./src/components/TextInput";
// import MaterialButtonDanger from "./src/components/MaterialButtonDanger";
// import Share from 'react-native-share';

import React, { useEffect, useRef, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  useRoute,
  CommonActions,
  useNavigation,
} from "@react-navigation/native";
import * as Sharing from "expo-sharing";
var tileLenth;
var tileWidth;

var bb;

export default function FloorRES({ route, navigation }) {
  const { resdata } = route.params;
  var tlength = resdata.tl;

  const scrollViewRef = useRef(null);
  const [vals, setval] = useState({
    length: 0,
    width: 0,
    sqinbox: 0,
    tilesinbox: 0,
    price: 0,
    tilelength: 0,
    tilewidth: 0,
  });

  const [groutprice, setgroutprice] = useState("");

  const [bondbags, setbondbags] = useState(resdata.bond);
  const [bondprice, setbondprice] = useState("");
  const [realgrout, setrealgrout] = useState(resdata.grout);
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: "Home" }],
  });
  const goToHome = () => {
    navigation.dispatch(resetAction);
  };
  const [lspacer, setlspacer] = useState("");

  const [lspacerprice, setlspacerprice] = useState("");

  const [spacer, setspacer] = useState("");

  const [spacerprice, setspacerprice] = useState("");
  const [rate, setrate] = useState(resdata.price > 0 ? resdata.price : "");

  var finamount = Math.round(10 * rate * parseFloat(resdata.sqb));

  const handlePricePerBoxChange = (value) => {
    setrate(value);
  };
  const handleInputFocus = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };
  const handleInputFocus1 = () => {
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 100);
  };

  const onShare = async () => {
    const ar = resdata.totsqm;
    const bx = resdata.totbox;
    // const tt = output.totaltiles;
    const tp = finamount;
    const bd = bondprice * bondbags;
    const gt = groutprice * realgrout;
    const ls = lspacer * lspacerprice;
    const sp = spacerprice * spacer;
    const gtot =
    Math.ceil(
      Math.round(
        parseInt(resdata.totbox) * rate * parseFloat(resdata.sqb)
      ) +
        parseInt(bondprice * bondbags) +
        parseInt(groutprice * realgrout) +
        parseInt(spacer * spacerprice) +
        parseInt(lspacer * lspacerprice)
    )
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
          Math.round(
            parseInt(resdata.totbox) * rate * parseFloat(resdata.sqb)
          ) +
          "\n" +
          "BOND PRICE: " +
          bd +
          "\n" +
          "GROUT PRICE: " +
          gt +
          "\n" +
          "LEVEL SPACER PRICE: " +
          ls +
          "\n" +
          "SPACER PRICE: " +
          sp +
          "\n" +
          "GRAND TOTAL: " +
          gtot,
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

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.centeredView}>
        <View style={styles.tableRow}>
          <View
            style={[
              styles.tableCell,
              { alignItems: "center", justifyContent: "center" },
            ]}
          >
            <Text style={[styles.tableHeader, styles.modalhead]}>Results!</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.tableHeader}>Tile Size:</Text>
            <Text style={styles.tableData}>
              {tlength} x {resdata.tw}
            </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.tableHeader}>Floor:</Text>
            <Text style={styles.tableData}>
              {resdata.fl} x {resdata.fw}
            </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.tableHeader}>Total SqM:</Text>
            <Text style={styles.tableData}>{(resdata.totsqm).toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.tableHeader}>Total Boxes:</Text>
            <Text style={styles.tableData}>{resdata.totbox}</Text>
          </View>
        </View>
        <View style={styles.tableRow1}>
          <View style={styles.tableCell1}>
            <Text style={styles.tableHeader1}>Rate(SqM):</Text>

            <TextInput
              keyboardType="numeric"
              textAlign="center"
              textAlignVertical="center"
              multiline={true}
              value={"" + rate}
              numberOfLines={4}
              style={styles.resinput1}
              onChangeText={handlePricePerBoxChange}
              onFocus={handleInputFocus}
            ></TextInput>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={[styles.tableHeader, styles.totalAmount]}>
              Total Amount:
            </Text>
            <Text style={[styles.tableData, styles.totalAmount]}>
              {Math.round(
                parseInt(resdata.totbox) * rate * parseFloat(resdata.sqb)
              )}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, padding: 0, width: "100%" }}>
          <View style={[styles.tableRow2,{paddingVertical:5}]}>
            <View style={styles.tableCell2}>
              {/* <Text style={styles.tableHeader}>              </Text> */}
              <Text style={[styles.heading, { marginLeft: 76 }]}>Quantity</Text>
              <Text style={[styles.heading, { marginLeft: 20, }]}>Price</Text>
              <Text style={[styles.heading, { marginLeft: 40,marginRight:10 }]}>Amount</Text>
            </View>
          </View>
          <View style={styles.tableRow2}>
            <View style={styles.tableCell2}>
              <Text style={styles.tableHeader1}>Bond: {"\n"}20KG</Text>

              <TextInput
                style={[styles.resinput, { marginLeft: 14 }]}
                value={"" + bondbags}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setbondbags(text);
                }}
                onFocus={handleInputFocus}
              />

              <TextInput
                style={[styles.resinput, { marginLeft: 35 }]}
                value={bondprice}
                keyboardType="numeric"
                onChangeText={(text) => setbondprice(text)}
                onFocus={handleInputFocus}
              />
              <Text style={[styles.totalValue, { marginLeft: 80,marginRight:10 }]}>
                {bondprice * bondbags}{" "}
              </Text>
            </View>
          </View>
          <View style={[styles.tableRow2,{paddingVertical:8}]}>
            <View style={styles.tableCell2}>
              <Text style={styles.tableHeader1}>Grout:</Text>
              {/* <Text style={styles.tableHeader}></Text> */}
              <TextInput
                style={[styles.resinput, { marginLeft: 19 }]}
                value={"" + realgrout}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setrealgrout(text);
                }}
                onFocus={handleInputFocus}
              />

              <TextInput
                style={[styles.resinput, { marginLeft: 35 }]}
                value={groutprice}
                keyboardType="numeric"
                onChangeText={(text) => setgroutprice(text)}
                onFocus={handleInputFocus}
              />
              <Text style={[styles.totalValue, { marginLeft: 80 }]}>
                {groutprice * realgrout}{" "}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow2}>
            <View style={styles.tableCell2}>
              <Text style={styles.tableHeader1}>
                Level{"\n"}
                Spacer:
              </Text>
              <TextInput
                style={styles.resinput}
                value={lspacer}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setlspacer(text);
                }}
                onFocus={handleInputFocus}
              />

              <TextInput
                style={[styles.resinput, { marginLeft: 35 }]}
                value={lspacerprice}
                keyboardType="numeric"
                onChangeText={(text) => setlspacerprice(text)}
                onFocus={handleInputFocus}
              />
              <Text style={[styles.totalValue, { marginLeft: 80 }]}>
                {lspacer * lspacerprice}{" "}
              </Text>
            </View>
          </View>

          <View style={[styles.tableRow2,{paddingVertical:8}]}>
            <View style={[styles.tableCell2]}>
              <Text style={styles.tableHeader1}>Spacer:</Text>
              <TextInput
                onFocus={handleInputFocus1}
                style={styles.resinput}
                value={spacer}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setspacer(text);
                }}
              />

              <TextInput
                onFocus={handleInputFocus1}
                style={[styles.resinput, { marginLeft: 35 }]}
                value={spacerprice}
                keyboardType="numeric"
                onChangeText={(text) => setspacerprice(text)}
              />
              <Text style={[styles.totalValue, { marginLeft: 80 }]}>
                {spacer * spacerprice}{" "}
              </Text>
            </View>
          </View>

          <View style={[styles.tableRow2,{paddingVertical:8}]}>
            <View style={[styles.tableCell2]}>
              <Text style={styles.tableHeader1}>Total:</Text>

              <Text style={[styles.totalValue1, { marginLeft: 260 }]}>
                {Math.ceil(
                  parseInt(bondprice * bondbags) +
                    parseInt(groutprice * realgrout) +
                    parseInt(spacer * spacerprice) +
                    parseInt(lspacer * lspacerprice)
                )}{" "}
              </Text>
            </View>
          </View>
        </View>

        <View>
          {/* {isVisiblex && ( */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeader, styles.totalAmount]}>
              GRAND TOTAL:
            </Text>
            {/* <Text style={styles.totalValue}>{grout} KGs</Text> */}

            <Text style={[styles.tableData, styles.totalAmount]}>
              {Math.ceil(
                Math.round(
                  parseInt(resdata.totbox) * rate * parseFloat(resdata.sqb)
                ) +
                  parseInt(bondprice * bondbags) +
                  parseInt(groutprice * realgrout) +
                  parseInt(spacer * spacerprice) +
                  parseInt(lspacer * lspacerprice)
              )}{" "}
            </Text>
          </View>
          {/* )} */}
          {/* Additional content */}
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {/* <View style={styles.tableCell}> */}

          <Pressable
            style={[
              styles.button,
              styles.buttonShare,
              {
                marginRight: 5,
                marginTop: 20,
                width: 130,
                height: 50,
                padding: 0,
              },
            ]}
            onPress={goToHome}
          >
            <Text style={styles.textStyle}>
              <Icon
                style={{ marginRight: 15 }}
                name="home"
                size={20}
                color="yellow"
              />{" "}
              Home
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.button,
              styles.buttonshare,
              { width: 130, height: 50 },
            ]}
            onPress={onShare}
          >
            <Text style={styles.textStyle}>
              <Icon
                style={{ marginRight: 15 }}
                name="share"
                size={20}
                color="yellow"
              />{" "}
              Share
            </Text>
          </Pressable>

          {/* </View> */}
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    margin:5,
    // marginHorizontal: 10,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 0,
    // marginBottom: 20,
    // marginTop: 20,
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "flex-start", // Align rows vertically
    marginBottom: 5,
    width: "100%",

    // flexWrap: 'wrap', // Wrap rows to next line if needed
  },
  tableCell: {
    width: "100%", // Set 2 cells per row
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingHorizontal: 5,
    paddingVertical: 10, // Adjust the cell height as needed
    flexDirection: "row", // Align contents of cell horizontally
    alignItems: "center", // Align contents of cell vertically
    justifyContent: "space-around",
    minHeight: 40, // Set a minimum height for the cell
  },

  tableRow1: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    width: "100%",
    flexWrap: "wrap",
  },
  tableCell1: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Adjust the text alignment to the left
    minHeight: 40,
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 5, // Add a small margin to separate the text and input
  },
  resinput: {
    borderWidth: 1,
    width: 60,
    height: 30,
    borderColor: "black",
    backgroundColor: "white",
    borderRadius: 7,
    fontSize: 16,
    fontWeight: "600",
  },

  tableHeader1: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 20, // Add a small margin to separate the text and input
  },
  resinput1: {
    borderWidth: 1,
    width: 60,
    height: 30,
    borderColor: "black",
    backgroundColor: "white",
    borderRadius: 7,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  tableHeader: {
    fontWeight: "bold",
    fontSize: 16, // Adjust the font size as needed
    flex: 1, // Allow text to wrap within the cell
  },
  tableData: {
    marginLeft: 10,
    fontSize: 16, // Adjust the font size as needed
    fontWeight: "600",
    flex: 1, // Allow text to wrap within the cell
  },
  totalAmount: {
    color: "#7C0A02",
    fontSize: 18,
    fontWeight:'600',
     // Adjust the font size as needed
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#007AFF",
    width: 200,
  },
  buttonshare: {
    marginTop: 20,
  },
  totalValue: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  totalValue1: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  resinput: {
    marginLeft: 10,
    borderWidth: 1,
    width: 60,
    height: 30,
    borderColor: "black",
    backgroundColor: "white",
    borderRadius: 7,
    fontSize: 16, // Adjust the font size as needed
    textAlign: "center",
    fontWeight: "600",
    // marginRight:500,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  modalhead: {
    fontWeight: "bold",
    fontSize: 24,
    // alignItems:'center'
  },

  tableRow2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    // marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    // width:'100%'
  },
  tableCell2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableHeader2: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
  },
  heading: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  cell: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});