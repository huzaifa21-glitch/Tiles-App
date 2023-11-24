import {React,useState,useEffect} from 'react';
import { View,Alert,ActivityIndicator, Image, StyleSheet,AppState, BackHandler, Platform, Pressable, Text } from 'react-native';
import axios from "axios";
import NetInfo from '@react-native-community/netinfo';
import * as FileSystem from 'expo-file-system';
axios.defaults.timeout = 5000;

const Home = ({ navigation }) => {
  const [updated, setupdated] = useState(false);
  const [count, setcount] = useState('');
  const handleButton1Press = () => {
    navigation.navigate('Floor');
  };

  const handleButton2Press = () => {
    navigation.navigate('Bath1');
  };

const updatestatus=async()=>{
  const fileUri = FileSystem.documentDirectory + 'binaryais.txt'; // File path and name
  await FileSystem.writeAsStringAsync(fileUri, '0');
  return true;
}
const quitf=async()=>{
  const fileUri = FileSystem.documentDirectory + 'binaryais.txt'; // File path and name
  await FileSystem.writeAsStringAsync(fileUri, '1000');
  return true;
}



  const readTextFile = async () => {
    const fileUri = FileSystem.documentDirectory + 'binaryais.txt'; // File path and name
  // console.log(FileSystem.documentDirectory);
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri); // Check if the file exists
  
      if (fileInfo.exists) {
        // Read the existing file content
        const fileContent = await FileSystem.readAsStringAsync(fileUri);
        // HEREEE TO ADD 

        console.log('Existing file content:', fileContent);
        setcount( fileContent );
        return fileContent;

      } else {

        await FileSystem.writeAsStringAsync(fileUri, '0');
        return '0';

      }
    } catch (error) {
      console.log('Error reading or creating text file:', error);
    }
  };
  const [isLoading, setIsLoading] = useState('1');


  useEffect(() => {
    const fetchData = async () => {
      const co = await readTextFile();

  axios.post("https://curious-tick-gaiters.cyclic.app/checkversion",{ timeout: 4000 })
  .then((response) => {
    if (response.data == "1") {
      console.log("COUNTTTT "+co);
      if(co>699)   
      {
        updatestatus()
        var a=true
        if(a){
        Alert.alert('Status Updated!',"Updated Your Application Data, You may need to Update application later on!")
        }

      }   

      setupdated(true);
      setIsLoading('0')
    }
    
    else {

            if(response.data=='0')
            {
                quitf();
            }
      // console.log("OK");

      setupdated(false);
      setIsLoading('0')
      Alert.alert("Update Required!","Contact AI Studio at +92311 5270759 For New Update With New Features! Closing Application", [
        {
          text: 'OK',
          onPress: () => {
            BackHandler.exitApp();
          }
        }
      ]
    );

    }
  })
  .catch((error) => {
    console.log('errr');
    if(co>699)
    {
      // console.log("AA");
      setIsLoading('0')
      setupdated(false)

      Alert.alert(
        'Update Required!!',
        'You Must Turn On Internet Connection To Update Settings! Application Closing!',
        [
          {
            text: 'OK',
            onPress: () => {
              BackHandler.exitApp();
            }
          }
        ]
      );
    }
    if(co<=699)
    {
setupdated(true)
setIsLoading('0')
    }
else{
    if (error.response) {
       
    } else if (error.request) {

    } else {
      // Other errors occurred
      alert('Error:', error.message);
    }

  }
  
});
    }

    fetchData();






}, []);

// useEffect(() => {
//   const unsubscribe = navigation.addListener('focus', () => {
//     setupdated(false);
//   });

//   return unsubscribe;
// }, [navigation]);


if(updated==true){
  return (
    <View style={styles.container}>
      <Image source={require('../assets/tiles.png')} style={styles.Image} />
      <Text style={styles.welcomeText}>Tiles Calculator by AIS</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={handleButton1Press}
        >
          <Text style={[styles.buttonText, styles.buttonText1]}>Floor</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={handleButton2Press}
        >
          <Text style={[styles.buttonText, styles.buttonText2]}>Bath/Room</Text>
        </Pressable>
      </View>
    </View>
  );
};

if(isLoading==1)
{
return(
  <View style={styles1.container}>
  
  <View style={styles1.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles1.loaderText}>AI Studio is loading...</Text>
        </View>

   
  </View>
)
}

}
const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    // Other styles for the container
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // White background color
  },
  loaderText: {
    marginTop: 10, // Add margin to separate text from the loader
    color: '#000000', // Black text color
    fontSize: 16, // Adjust the font size as needed
    fontWeight: '500'
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#101531"
  },
  Image: {
    height:120,
    width:300,
    marginBottom:15
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 10,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText1: {
    color: '#101531',
  },
  buttonText2: {
    color: '#101531',
  },
});

export default Home;
