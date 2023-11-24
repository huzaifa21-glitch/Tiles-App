import React, { useEffect, useState ,useRef} from "react";
import {
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  View,
  Modal,
  Share,
  Alert,
ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { RadioButton, RadioGroup } from 'react-native-paper';

import { useRoute,CommonActions,useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

const Bath4 = ({navigation}) => {
  const scrollViewRef = useRef(null);

  const route = useRoute();
  const { finaldata } = route.params;
  finaldata.totalboxw;
  finaldata.tb = parseInt(finaldata.tb);
  console.log(finaldata.lb, finaldata.lt, finaldata.tb);
  typeof finaldata.tb;

  const [dark,setDark] =useState(finaldata.db);
  const [motive,setMotive] =useState(finaldata.mb);
  const [light,setLight] =useState(finaldata.lb)

  const [lTiles, setLtiles] = useState(finaldata.lt);
  const [dTiles, setDtiles] = useState(finaldata.dt);
  const [mTiles, setMtiles] = useState(finaldata.mt);

  const [totboxes, setTotboxes] = useState(finaldata.tb)

  

  var motivesqM = parseInt(motive) * parseInt(totboxes) + parseInt(mTiles);
  var motivesqM1 = parseFloat(motivesqM) / parseInt(totboxes);
  var motivesqM2 = (parseFloat(motivesqM1) * parseFloat(finaldata.area)).toFixed(2);

  console.log(dark);
  console.log(totboxes);
  console.log(dTiles);
  console.log(finaldata.area);

  

  var darksqM = parseInt(dark) * parseInt(totboxes) + parseInt(dTiles);
  console.log(darksqM);
  var darksqM1 = parseFloat(darksqM) / parseInt(totboxes);
  console.log(darksqM1);
  var darksqM2 = (parseFloat(darksqM1) * parseFloat(finaldata.area)).toFixed(2);
  console.log(darksqM2);


  const [rate, setrate] = useState(finaldata.pricex);

  var lightsqM = parseInt(light) * parseInt(totboxes) + parseInt(lTiles);
  console.log(lightsqM);
  var lightsqM1 = parseFloat(lightsqM) / parseInt(totboxes);
  console.log(lightsqM1);
  var lightsqM2 = (parseFloat(lightsqM1) * parseFloat(finaldata.area)).toFixed(2);

  

  // const [tt,stt]=useState(finaldata.totalboxw)
  // const [tt, stt] = useState(
  //   finaldata.totallight + finaldata.totaldark + finaldata.totalmotive
  // );

  const [lspacer, setlspacer] = useState(0)
    
  const [lspacerprice, setlspacerprice] = useState(0)
    
  const [spacer, setspacer] = useState(0)
    
  const [spacerprice, setspacerprice] = useState(0)


  // useEffect(() => {
  //   if (dark !== finaldata.db) {
  //     setDtiles('0');
  //   }
  //   if (light !== finaldata.lb) {
  //     setLtiles('0');
  //   }
  //   if (motive !== finaldata.mb) {
  //     setMtiles('0');
  //   }
  // }, [dark, finaldata.db]);

  var t=(parseInt(mTiles) +
  parseInt(dTiles) +
  parseInt(lTiles))

  useEffect(() => {
  if (dark !== finaldata.db || light !== finaldata.lb || motive !== finaldata.mb) {
    if (dark !== finaldata.db) {
     
        setDtiles('0');
     
    }
    if (light !== finaldata.lb) {
    
        setLtiles('0');
      
    }
    if (motive !== finaldata.mb) {
      
        setMtiles('0');
    
    }
    
      setTotboxes(parseInt(finaldata.tb));
   
    console.log('dark tiles: '+dTiles);
    console.log('dark boxes:'+dark);
    console.log('total boxes: ',totboxes);
    console.log(('total area:'+finaldata.area));
    

      setallboxes(parseInt(dark)+parseInt(motive)+parseInt(light));
    
  
      setalltiles(parseInt(lTiles)+parseInt(mTiles)+parseInt(dTiles));
    


      setCount(count+1);
   

    

  }
}, [dark,light,motive]);
  
    


  const [sbox, setsbox] = useState(
    parseInt(motive) + parseInt(light) + parseInt(dark)
  );
  const [atiles, setatiles] = useState(
    parseInt(mTiles) + parseInt(dTiles) + parseInt(lTiles)
  );

  var b = (parseInt(dark) + parseInt(motive) + parseInt(light));

  const [allboxes, setallboxes] = useState(b)
  // console.log(allboxes);
  
 const [count, setCount] = useState(0);

  const [alltiles, setalltiles] = useState(t)
  useEffect(() => {

    console.log('count')
  
    if (t % parseInt(totboxes)==0) {
    var te= t/totboxes;

     setallboxes(allboxes+te)
      setalltiles (0);
    }
    if (parseInt(t) % parseInt(totboxes) > 0) {
      console.log("PAKIS"+ totboxes);
      console.log('t: ',t);

      let co = Math.floor(parseInt(t) / parseInt(totboxes));
      console.log('co: ',co);
  
      setallboxes(allboxes+co)
      setalltiles(alltiles % totboxes);
    }
  




    if (parseInt(atiles) > parseInt(totboxes)) {
      
      if (parseInt(atiles) % parseInt(totboxes) > 0) {
        console.log(atiles, totboxes);
        let co = Math.floor(parseInt(atiles) / parseInt(totboxes));
        // console.log("GRATER THAN 8")
        
        setsbox(sbox + co);
        setatiles(parseInt(atiles) % parseInt(totboxes));
      }
    }

    if (parseInt(atiles) % parseInt(totboxes) == 0) {

      let co = Math.floor(parseInt(atiles) / parseInt(totboxes));
      setsbox(sbox + co);
      setatiles(0);
    }





  }, [count]);





  const onShare1 = async () => {
    try {
      const result = await Share.share({
        message:
          `* ESTIMATE *\n\n` +
          `Total Area: ${(
            parseFloat(darksqM2) +
            parseFloat(lightsqM2) +
            parseFloat(motivesqM2)
          ).toFixed(2)}\n` +
          `Light Boxes: ${light}` +
          `(${lightsqM2} SqM) \n` +
          `Motive Boxes: ${motive}` +
          `(${motivesqM2} SqM) \n` +
          `Dark Boxes: ${dark}` +
          `(${darksqM2} SqM)\n` +
          `Total Boxes:${allboxes}\n` +
          `Additional Tiles:${
            parseInt(mTiles) +
            parseInt(dTiles) +
            parseInt(lTiles)

          }\n` +

          `Bond: ${
           bondbags+' KGs'

          }\n`+
          
          `Grout: ${
            realgrout+' Packets'
 
           }\n`
          +

          `Grand Total: ${Math.ceil(
            (parseFloat(darksqM2) +
              parseFloat(lightsqM2) +
              parseFloat(motivesqM2)) *
              rate
          ) + parseInt(bondprice*bondbags)+parseInt(groutprice*realgrout) + parseInt(spacer*spacerprice)+parseInt(lspacer*lspacerprice)
      } \n`,
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
  const handlePricePerBoxChange = (value) => {
    setrate(value);
  };
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: 'Home' }],});
    
  const goToHome = () => {
navigation.dispatch(resetAction);

  };
  const [temp, settemp] = useState('');
  
    var b=(
      parseFloat(darksqM2) +
      parseFloat(lightsqM2) +
      parseFloat(motivesqM2)
    ).toFixed(2)
    b=Math.round(b/10)

  const [realgrout, setrealgrout] = useState(b);


  const [manualgrout, setmanualGrout] = useState('');
  const [grout, setGrout] = useState('');
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [manualInput, setManualInput] = useState('');

  const handleRadioChange = (value) => {
    setSelectedRadio(value);
    setManualInput('');
  };

  const handleInputChange = (text) => {
    setSelectedRadio(null);
    setManualInput(text);
  };

  const [isVisible, setIsVisible] = useState(true);

  const [isVisiblex, setIsVisiblex] = useState(true);

  const [groutprice, setgroutprice] = useState(0);

  const [bondprice, setbondprice] = useState(0);
  var a=(
    parseFloat(darksqM2) +
    parseFloat(lightsqM2) +
    parseFloat(motivesqM2)
  ).toFixed(2)

  a = Math.round(a*8)
  // console.log("a"+a);
  var bb=Math.round(a/20)
  // console.log("AS ABB"+bondbags);
  const [bondbags, setbondbags] = useState(bb);


  const [gbags, setgbags] = useState(0);


  const [modalVisible1, setModalVisible1] = useState(false);

  const [uniqueName, setUniqueName] = useState(20);
  const [s, ss] = useState(1);

  const handleRadioPress = (value) => {
//     setUniqueName(value);
    
//     var a=(
//       parseFloat(darksqM2) +
//       parseFloat(lightsqM2) +
//       parseFloat(motivesqM2)
//     ).toFixed(2)

//     if(value==20)
//     {

//     ss(s+1)
   
//   };
// if(value==40)
// {
//   setbondbags(Math.round(bondbags/2))
// }
}

//   useEffect(() => {
    
// if(bondbags==0){
//     var a=(
//       parseFloat(darksqM2) +
//       parseFloat(lightsqM2) +
//       parseFloat(motivesqM2)
//     ).toFixed(2)

//     a = Math.round(a*8)
//     // console.log("a"+a);
//     var bb=Math.round(a/20)
//     setbondbags(bb)
    

//     var b=(
//       parseFloat(darksqM2) +
//       parseFloat(lightsqM2) +
//       parseFloat(motivesqM2)
//     ).toFixed(2)
//     b=Math.round(b/10)
//     setrealgrout(b)
//     settemp(b)
   
// }
// else{
//     setbondbags(bondbags*2)
// }

//     setIsVisible(true)
   
    
   
//   }, [s]);

  function handleadd(){

    setIsVisiblex(true)
   
    // console.log(uniqueName);
    setModalVisible1(false)

  }

  const handleInputFocus = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };
  const handleInputFocus1 = () => {
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 100);
  };

  
  return (
    <ScrollView ref={scrollViewRef}
    contentContainerStyle={{ flexGrow: 1 }}
    keyboardShouldPersistTaps="handled">
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

{/* //MODEL BEGINS */}
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
        setModalVisible1(!modalVisible1);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

          <Text style={styles.mytext}>Bond Bag:</Text>

          {/* <View style={styles2.container}>
                <TouchableOpacity
                  style={styles2.radioButton}
                  onPress={() => handleRadioPress(20)}
                >
                  <View style={styles2.radioButtonOuter}>
                    {uniqueName == "20" && (
                      <View style={styles2.radioButtonInner} />
                    )}
                  </View>
                  <Text style={styles2.radioButtonLabel}>20KG</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles2.radioButton}
                  onPress={() => handleRadioPress(40)}
                >
                  <View style={styles2.radioButtonOuter}>
                    {uniqueName == "40" && (
                      <View style={styles2.radioButtonInner} />
                    )}
                  </View>
                  <Text style={styles2.radioButtonLabel}>40KG</Text>
                </TouchableOpacity>

           
               
              </View>
              */}





           {/* <Text style={styles.mytext}>Grout Price(1 Packet):</Text> */}
           <View style={{flexDirection:'row',alignContent:"center",marginLeft:7}}>




            <Pressable
              style={[styles.button, styles.buttonClose,{height:42,textAlign:'center',fontSize:12}]}
              onPress={() => setModalVisible1(!modalVisible1)}
            >
              <Text style={styles.textStyle}><Icon style={{marginRight:15}}name="close" size={18} color="yellow" /> Close </Text>
            </Pressable>

            </View>


          </View>
        </View>
      </Modal>



      {/* MODEL ENDS */}









        <View style={{alignItems:'center', justifyContent:'center'}}>
        <Text style={styles.title}>Calculation Results</Text>  
                            
        
        </View> 
        <Text style={{fontSize:17,color:'black'}}>  Bath/Room {finaldata.len+''} x {finaldata.wid+""} x {finaldata.whh+""}  ||  Tile Size {finaldata.ww+"''"} x {finaldata.ll+"''"}</Text>

        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}></Text>
            <Text style={styles.tableHeader}>Boxes</Text>

            <Text style={styles.tableHeader}>Tiles</Text>
            <Text style={styles.tableHeader}>SqM</Text>
            <Text style={styles.tableHeader}>Amount</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Light:</Text>
            <TextInput
            // onFocus={handleInputFocus}
            onChangeText={(text)=>{setLight(text)}}
            value={''+light}
            keyboardType="numeric"
            style={styles.inputt}
  
            />
            {/* <Text style={styles.tableValue}>{finaldata.lb}</Text> */}
            <Text style={styles.tableValue1}>{lTiles}</Text>
            <Text style={styles.tableValue}>{lightsqM2}</Text>
            <Text style={styles.tableValue}>
              {Math.ceil(parseFloat(lightsqM2) * rate)}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Dark:</Text>
            <TextInput
            // onFocus={handleInputFocus}
            onChangeText={(text)=>{setDark(text)}}
            value={''+dark}
            keyboardType="numeric"
            style={styles.inputt}
  
            />
            {/* <Text style={styles.tableValue}>{finaldata.db}</Text> */}
            <Text style={styles.tableValue1}>{dTiles}</Text>

            <Text style={styles.tableValue}>{darksqM2}</Text>
            <Text style={styles.tableValue}>
              {Math.ceil(parseFloat(darksqM2) * rate)}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Motive:</Text>
            <TextInput
            // onFocus={handleInputFocus}
              onChangeText={(text)=>{setMotive(text)}}
              value={''+motive}
              keyboardType="numeric"
              style={styles.inputt}
             

            />
            {/* <Text style={styles.tableValue}>{finaldata.mb}</Text> */}
            <Text style={styles.tableValue1}>{mTiles}</Text>
            <Text style={styles.tableValue}>{motivesqM2}</Text>
            <Text style={styles.tableValue}>
              {Math.ceil(parseFloat(motivesqM2) * rate)}
            </Text>
          </View>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel1}>Total:</Text>
          <Text style={styles.totalValue1}>{''+(allboxes)}</Text>

          <Text style={styles.totalValue1}>
            {alltiles}
          </Text>

          <Text style={styles.totalValue1}>
            {(
              parseFloat(darksqM2) +
              parseFloat(lightsqM2) +
              parseFloat(motivesqM2)
            ).toFixed(2)}
          </Text>

          <Text style={styles.totalValue1}>
            {Math.ceil(
              (parseFloat(darksqM2) +
                parseFloat(lightsqM2) +
                parseFloat(motivesqM2)) *
                rate
            )}
          </Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabelx}>Rate SqM:</Text>

          {/* <Text style={styles.totalValue1}>{rate}</Text>
           */}
          <View style={styles.inputContainer}>
            <TextInput
             onFocus={handleInputFocus1}
              style={styles.input}
              value={rate}
              onChangeText={handlePricePerBoxChange}
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.totalValue}></Text>

          <Text style={styles.totalValue}></Text>
        </View>


        <View style={styles.tableRow}>
            <Text style={styles.tableHeader}></Text>
            <Text style={styles.tableHeader}>Quantity</Text>

            <Text style={styles.tableHeader}>Price</Text>

            <Text style={styles.tableHeader}>Amount</Text>
          </View>

        

        <View>
  {isVisible && (
    <View style={styles.totalRow}>
      <Text style={styles.totalLabelx}>Bond:</Text>
      {/* <Text style={styles.totalValue}>{grout} KGs</Text> */}
      
      {/* <Text style={styles.totalValue}></Text> */}
     
            <TextInput
              onFocus={handleInputFocus}
              onChangeText={(text)=>{setbondbags(text)}}
              value={''+bondbags}
              keyboardType="numeric"
              style={styles.inputx}
             

            />
         
          <TextInput
            onFocus={handleInputFocus}
            style={[styles.inputx
            
                  ,{marginBottom:0,width:65}]}
                  keyboardType="numeric"
                  value={bondprice}

                  onChangeText={(text) => setbondprice(text)}
                />
      <Text style={styles.totalValue}></Text>
      
      
      <Text style={styles.totalValue}>{bondprice*bondbags} </Text>
    </View>
  )}
  {/* Additional content */}
</View>


<View>
  {isVisible && (
    <View style={styles.totalRow}>
      <Text style={styles.totalLabelx}>Grout:</Text>
      {/* <Text style={[styles.totalValue,{width:150,marginRight:5}]}></Text> */}

      
            <TextInput
            onFocus={handleInputFocus}
            
              style={styles.inputx}
              value={''+realgrout}
          
              onChangeText={(text)=>{setrealgrout(text)}}
              keyboardType="numeric"
            />
      <TextInput
      onFocus={handleInputFocus}
            
                  style={[styles.inputx
                    
                    ,{marginBottom:0,width:65}]}
                  keyboardType="numeric"
                  value={groutprice}
                 
                  onChangeText={(text) => setgroutprice(text)}
                />
          
      
      <Text style={styles.totalValue}></Text>

      
      <Text style={styles.totalValue}>{groutprice*realgrout} </Text>
    </View>
  )}
  {/* Additional content */}
</View>



<View>
  {isVisible && (
    <View style={styles.totalRow}>
      <Text style={[styles.totalLabelx,{}]}>L Spacer:</Text>
     

      
            <TextInput
            onFocus={handleInputFocus}
              style={styles.inputx}
              value={lspacer}
              onChangeText={(text)=>{setlspacer(text)}}
              
              keyboardType="numeric"
            />
      <TextInput
        onFocus={handleInputFocus}
                  style={[styles.inputx
                    
                    ,{marginBottom:0,width:65}]}
                  keyboardType="numeric"
                  value={lspacerprice}
                

                  onChangeText={(text) => setlspacerprice(text)}
                />
          
      
      <Text style={styles.totalValue}></Text>

      
      <Text style={styles.totalValue}>{lspacer*lspacerprice} </Text>
    </View>
  )}
  {/* Additional content */}
</View>

<View>
  {isVisible && (
    <View style={styles.totalRow}>
      <Text style={[styles.totalLabelx,{}]}>Spacer:</Text>
     

      
            <TextInput
                onFocus={handleInputFocus}
              style={styles.inputx}
              value={spacer}
              onChangeText={(text)=>{setspacer(text)}}
          
              keyboardType="numeric"
            />
      <TextInput
        onFocus={handleInputFocus}
                  style={[styles.inputx
                    
                    ,{marginBottom:0,width:65}]}
                    
                  keyboardType="numeric"
                
                  value={spacerprice}

                  onChangeText={(text) => setspacerprice(text)}
                />
          
      
      <Text style={styles.totalValue}></Text>

      
      <Text style={styles.totalValue}>{spacer*spacerprice} </Text>
    </View>



  )}
  {/* Additional content */}
  <View style={styles.totalRow}>
      <Text style={[styles.totalLabelx,{}]}>Total:</Text>
    
      <Text style={styles.totalValue}></Text>
      
      <Text style={styles.totalValue}></Text>
      
      <Text style={styles.totalValue}></Text>
      <Text style={styles.totalValue}></Text>

      
      <Text style={styles.totalValue}>{(spacer*spacerprice)+(lspacer*lspacerprice)+(bondbags*bondprice)+(realgrout*groutprice)} </Text>
    </View>

</View>


<View>
  {isVisiblex && (
    <View style={[styles.totalRow,{}]}>
      <Text style={styles.totalLabelx}>GRAND TOTAL: </Text>
      {/* <Text style={styles.totalValue}>{grout} KGs</Text> */}
      
      

      
      

      
      
      <Text style={styles.totalValue}>{Math.ceil(
              (parseFloat(darksqM2) +
                parseFloat(lightsqM2) +
                parseFloat(motivesqM2)) *
                rate
            ) + parseInt(bondprice*bondbags)+parseInt(groutprice*realgrout) + parseInt(spacer*spacerprice)+parseInt(lspacer*lspacerprice)} </Text>
    </View>
  )}
  {/* Additional content */}
</View>


<View style={{flexDirection:'row',justifyContent:'center'}}>

        <Pressable
          style={[styles.button, styles.buttonShare,{marginRight:5}]}
          onPress={goToHome}
        >
   <Text style={styles.textStyle}><Icon style={{marginRight:15}}name="home" size={20} color="yellow" />  Home</Text>
        </Pressable>
        
     
        <Pressable
          style={[styles.button, styles.buttonShare]}
          onPress={onShare1}
        >
          <Text style={styles.textStyle}><Icon style={{marginRight:15}}name="share" size={20} color="yellow" />  Share</Text>
        </Pressable>
        </View>
       


       
      </View>
    </TouchableWithoutFeedback>
    </ScrollView>
  );
};

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

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 20,
    marginTop: 8,
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
    backgroundColor: "#F5FEFD",
    borderRadius: 20,
    width: 250,
    padding: 20,
    alignItems: "flex-start",
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
    borderRadius: 0,
    padding: 5,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius:5,
    fontSize:2
    
  },

  buttonshare: {
    backgroundColor: "#2196F3",
    marginBottom: 15,
    width: 70,
    borderRadius:5,

  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",

  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
        fontSize:2
  },
  mytext:{
    marginBottom: 15,
    textAlign: "left",
    fontSize:17,
    fontWeight:'700'
    
  },

  label: {
    fontSize: 13,
    fontWeight: "bold",
    width: 100,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    width:100,
    height:30,
    marginTop: 0,
    marginBottom: 0,
    fontWeight:'500',
    fontSize: 18,
    textAlign: "center",
  },
  
  inputx: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    width:70,
    height:30,
    marginTop: 0,
    marginBottom: 0,
    margin:5,
    fontWeight:'500',
    fontSize: 18,
    textAlign: "center",
    marginLeft:15
  },
  inputt: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    width:50,
    height:30,
    marginTop: 0,
    marginBottom: 0,
    margin:5,
    fontWeight:'500',
    fontSize: 18,
    textAlign: "center",
    marginLeft:10
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color:'red',
    textAlign: "center",
  },
  tableContainer: {
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingVertical: 10,
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "left",
  },
  tableValue: {
    fontSize: 16,
    flex: 1,
    textAlign: "left",
  },
  tableValue1: {
    fontSize: 16,
    flex: 1,
    textAlign: "left",
    marginLeft:20,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    // marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#97233F",
    flex: 1,
    textAlign: "left",
    // marginBottom: 10,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "left",
    // marginBottom: 10,
  },
  totalLabel1: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#97233F",
    flex: 1,
    textAlign: "left",
    marginBottom: 10,
  },

  totalLabelx: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#97233F",
    flex: 1,
    textAlign: "left",
    marginBottom: 10,
    marginRight: 5,
  },
  totalValue1: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "left",
    marginBottom: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonShare: {
    backgroundColor: "#2196F3",
    marginTop: 12,
    width: 120,
    alignSelf: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
  },
});
// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign:'center'
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: 'gray',
//     paddingBottom:4
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   labelw: {
//     fontSize: 16,
//     color:"blue",
//     fontWeight: 'bold',
//   },
//   labelf: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color:'red',
//     marginBottom:10,
//   },
//   value: {
//     fontSize: 16,
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//     fontSize: 17
//   },
// button: {
// borderRadius: 20,
// padding: 10,
// elevation: 2,
// },
// buttonshare: {
// backgroundColor: "#2196F3",
// marginBottom: 30,
// width: 120,
// alignSelf:'center'

// },
// });

export default Bath4;