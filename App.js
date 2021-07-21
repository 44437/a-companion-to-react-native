import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CardDesign from './component/cardDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      arr: []
    }
  }
  showAlert(key){
    const {arr}=this.state;
    Alert.alert(
      "Hey",
      "Do you want to delete?",
      [
        {
          text:"No",
          style:"destructive"
        },
        {
          text:"Yes",
            onPress:()=>{
            arr.splice(key, 1);
            AsyncStorage.setItem('key', JSON.stringify(arr));
            this.setState({ arr })
          }
          
        }
      ]
    )
  }
  componentDidMount = async () => {
    const d = await AsyncStorage.getItem('key');
    if (d!==null){
      this.setState({ arr: JSON.parse(d) });
    }
  }
  render() {
    const { text, arr } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ justifyContent: "center", }}>
          <Image style={{ height: 200, margin: 10, alignSelf: "center" }} 
          resizeMode={"center"} source={require("./images/amsterdam.jpg")} />
          <TextInput value={text}
            placeholder="Text Area" style={style.input} onChangeText={(text) => {
              this.setState({ text })
            }} />
          <TouchableOpacity style={style.butonS} onPress={() => {
            console.log(text);
            if (text !== "") {
              arr.push(text);
              AsyncStorage.setItem('key', JSON.stringify(arr));
              this.setState({ arr, text: "" });
            }
          }}>
            <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>Save</Text>
          </TouchableOpacity>
          <View style={{
            margin: 20,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: "black",
          }}/>

          <ScrollView>
            <View style={{flexDirection:"column-reverse"}}>
              {
                arr !== null && arr !== "undefined" && arr.length > 0 ? arr.map((item, key) => (
                  <TouchableOpacity key={key} onPress={()=>this.showAlert(key)}>
                    <CardDesign key={key} body={item} />
                  </TouchableOpacity>)) : <CardDesign body={"No registered notes !"}/>
              }
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}
const style = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderColor: "black",
    borderRadius: 6
  },
  butonS: {
    backgroundColor: "#123",
    borderColor: "red",
    padding: 10,
    borderRadius: 10,
    margin: 10
  }
})