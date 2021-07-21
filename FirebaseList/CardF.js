import React from "react";
import {View , Text,StyleSheet, TouchableOpacity} from "react-native";
import firestore from '@react-native-firebase/firestore';
import { SwipeListView } from "react-native-swipe-list-view";
const CardF =({item})=>{
    deleteValue=async()=>{
        await firestore().collection('Texts').doc(item.id).delete();
    }
    return (
        <SwipeListView
        data={[item]}
        stopLeftSwipe={true}
        closeOnScroll={true}
        swipeRow={1}
        renderItem={()=>(
            <View style={style.card}>
                <Text style={style.text}>
                    {item.content}
                </Text>
            <Text style={style._time}>
            { 
            `${
            (item.time.toDate().getMonth()+1).toString().padStart(2, '0')}/${
            item.time.toDate().getDate().toString().padStart(2, '0')}/${
            item.time.toDate().getFullYear().toString().padStart(4, '0')} ${
            item.time.toDate().getHours().toString().padStart(2, '0')}:${
            item.time.toDate().getMinutes().toString().padStart(2, '0')}:${
            item.time.toDate().getSeconds().toString().padStart(2, '0')}`
             }
            </Text>
            </View>
        )}
        renderHiddenItem={()=>(
             <TouchableOpacity style={style.touchableCard} onPress={deleteValue}>
                <Text style={style.delete}>Delete</Text>
            </TouchableOpacity>
        )}
        rightOpenValue={-75}
        />
    )
}
const style=StyleSheet.create({
    card:{
        shadowColor:"black",
        shadowOpacity:0.4,
        borderRadius:10,
        marginRight:10,
        marginLeft:10,
        marginTop:10,
        backgroundColor:"#b3d9ff",
        padding:15
    },
    text:{
        fontWeight:"bold",
        color:"#001a33",
        fontSize:18,
        fontFamily:'Trebuchet MS', 
    },
    delete:{
        fontFamily:'Trebuchet MS',
        shadowColor:"black",
        shadowOpacity:0.6,
        alignSelf:"center",
    },
    touchableCard:{
        flex:1,
        flexDirection:"row",
        borderRadius:10,
        marginRight:10,
        marginLeft:10,
        justifyContent:"flex-end",
        marginTop:10,
        padding:17,
    },
    _time:{
        marginTop:5,
        color:"#001a33",
        fontSize:13,
        alignSelf:"flex-end",
        fontFamily:'Trebuchet MS', 
    },
})
export default CardF;