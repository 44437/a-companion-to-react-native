import React from "react";
import {View,Text,Image,StyleSheet, FlatList,TouchableOpacity,TextInput,SafeAreaView } from "react-native";
import firestore from '@react-native-firebase/firestore';
import CardF from "./CardF";
import { BallIndicator } from "react-native-indicators";
export default class FireBaseList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            text:''
        }
        this.getData();
    }
    renderItem = ({item})=>{
        return <CardF item={item}/>
    }
    getData=async()=>{
       firestore().collection("Texts").orderBy('time')
        .onSnapshot(docs=>{
            let arr=[];
            docs.forEach(doc=>{
                arr.push({
                    id:doc.id,
                    content:doc.data().content,
                    time:doc.data().time,
                });
            })
            this.setState({
                data:arr,
                text:""
            })
        })
     }
     addValue=async()=>{
         const {text}=this.state;
         if(text!==""){
            firestore().collection("Texts").add({
                content:text,
                time: new Date()
            })
         } 
     }
    render(){
        const {data,text}=this.state;
        return(
            <SafeAreaView style={{flex:1}} >
            <View style={{flex:1}}>
            <Image style={{ height: 200, marginTop: 20, alignSelf: "center" ,width:"100%"}} 
          resizeMode={"center"} source={{uri:"https://cdn.pixabay.com/photo/2013/07/13/01/20/cacti-155567_960_720.png"}} />
            <View>
                <TextInput style={style.input} placeholder="Text Area" value={text} onChangeText={(text)=>
                {
                    this.setState({text})
                }}/>
                <TouchableOpacity style={style.save} onPress={this.addValue}>
                    <Text style={style.text}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{borderColor:"black",borderWidth:StyleSheet.hairlineWidth,marginBottom:20,margin:10}}></View>
            <FlatList 
                data={data}
                numColumns={1}
                contentContainerStyle={{flexDirection : "column-reverse", }} 
                keyExtractor={(item)=>item.time.toString()}
                renderItem={this.renderItem}
                ListEmptyComponent={()=>
                    <BallIndicator color="#3366ff" margin={20}/>
                }>
            </FlatList>
            </View>
            </SafeAreaView>
        )
    }
  }
const style = StyleSheet.create({
    input: {
      borderWidth: 1,
      padding: 15,
      margin: 10,
      borderColor: "black",
      borderRadius: 6,
      fontSize:18
    },
    save:{
    borderWidth: 1,
      padding: 15,
      borderColor: "black",
      borderRadius: 6,
      margin: 10,
      fontSize:18,
      backgroundColor:"#004f99"
    },
    text:{
        color:"white",
        textAlign:"center",
        fontSize:18,
        fontFamily:'Trebuchet MS', 
    }
  })
