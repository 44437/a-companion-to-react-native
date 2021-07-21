import React from "react";
import { View, StyleSheet,Text } from "react-native";

const CardDesign =({body})=>{
    return(
        <View style={style.card}>
            <Text style={[style.text,{textAlign:"justify"}]}>{body}</Text>
        </View>
    )
}
export default CardDesign

const style=StyleSheet.create({
    card:{
        backgroundColor:"#2496F2",
        padding:15,
        margin:5,
        marginLeft:10,
        marginRight:10,
        borderRadius:20,
    },
    text:{
        color:"white",
        fontSize:16,
    }
})

