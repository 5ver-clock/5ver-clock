import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View , SafeAreaView, StyleSheet, TextInput , Button, Alert,ScrollView,TouchableOpacity  } from 'react-native';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import FreeView from '../../Components/FreeView';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';


export default function Main({ navigation}){

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert("Hold on!", "앱을 종료하시겠습니까?", [
          {
            text: "취소",
            onPress: () => null,
          },
          { text: "확인", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();

    }, []))

        
    return(
    <View style={{width:"100%",height:"100%",borderWidth:1}}>
      <View style={{width:"100%",height:"18%",flexDirection:"row",justifyContent:"center",marginBottom:5}}>
        <TouchableOpacity style={{width:"30%",height:"100%",borderWidth:2.5,alignItems:"center",justifyContent:"center",margin:7}}
        onPress={() => navigation.navigate('MainBoard')}
        >
        <Text style={{fontWeight:"bold",fontSize:20}}>게시판들!</Text>
        <Text style={{fontWeight:"bold",fontSize:20}}>Board</Text>
        </TouchableOpacity>   
        <TouchableOpacity style={{width:"30%",height:"100%",borderWidth:2.5,borderColor:"white",alignItems:"center",justifyContent:"center",marginTop:7,marginBottom:7}}
        onPress={() => navigation.navigate('CalenderMain')}
        >
        <Text style={{fontWeight:"bold",fontSize:20}}>캘린더</Text>
        <Text style={{fontWeight:"bold",fontSize:20}}>Calender</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width:"30%",height:"100%",borderWidth:2.5,alignItems:"center",justifyContent:"center",margin:7}}>
        <Text style={{fontWeight:"bold",fontSize:20}}>함께하는공간</Text>
        <Text style={{fontWeight:"bold",fontSize:20}}>Map</Text>
        </TouchableOpacity> 
      </View>
      <View style={{width:"100%",height:"18%",flexDirection:"row",justifyContent:"center",marginBottom:5}}>
        <TouchableOpacity style={{width:"30%",height:"100%",borderWidth:2.5,borderColor:"white",alignItems:"center",justifyContent:"center",margin:7}}
        onPress={() => navigation.navigate('Walk')}
        >
        <Text style={{fontWeight:"bold",fontSize:20}}>산책해요</Text>
        <Text style={{fontWeight:"bold",fontSize:20}}>Walk</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={{width:"30%",height:"100%",borderWidth:2.5,alignItems:"center",justifyContent:"center",marginTop:7}}
        onPress={() => navigation.navigate('News')}
        >
        <Text style={{fontWeight:"bold",fontSize:20}}>애완뉴스</Text>
        <Text style={{fontWeight:"bold",fontSize:20}}>News</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={{width:"30%",height:"100%",borderWidth:2.5,alignItems:"center",justifyContent:"center",margin:7}}
        onPress={() => navigation.navigate('Ranking')}
        >
        <Text style={{fontWeight:"bold",fontSize:20}}>최고의 견주</Text>
        <Text style={{fontWeight:"bold",fontSize:20}}>Ranking</Text>
        </TouchableOpacity> 
      </View>
      <View style={{width:"100%",height:"18%",flexDirection:"row",justifyContent:"flex-start",marginBottom:5,marginLeft:5}}>
        <TouchableOpacity style={{width:"30%",height:"100%",borderWidth:2.5,borderColor:"white",alignItems:"center",justifyContent:"center",margin:7}}
        onPress={() => navigation.navigate('SkinMain')}
        >
        <Text style={{fontWeight:"bold",fontSize:20}}>피부검사</Text>
        <Text style={{fontWeight:"bold",fontSize:20}}>Skin</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={{width:"30%",height:"100%",borderWidth:2.5,alignItems:"center",justifyContent:"center",marginTop:7}}
        onPress={() => navigation.navigate('MyPage')}
        >
        <Text style={{fontWeight:"bold",fontSize:20}}>내정보</Text>
        <Text style={{fontWeight:"bold",fontSize:20}}>MyPage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width:"30%",height:"100%",borderWidth:2.5,alignItems:"center",justifyContent:"center",margin:7}}
        onPress={() => navigation.navigate('Play')}
        >
        <Text style={{fontWeight:"bold",fontSize:20}}>놀아주세요</Text>
        <Text style={{fontWeight:"bold",fontSize:20}}>Play</Text>
        </TouchableOpacity>          
      </View>
      <View style={{width:"100%",height:"18%",flexDirection:"row",justifyContent:"flex-start",marginBottom:5,marginLeft:5}}>
        <TouchableOpacity style={{width:"30%",height:"100%",borderWidth:2.5,alignItems:"center",justifyContent:"center",margin:7}}
        onPress={() => navigation.navigate('Food')}
        >
        <Text style={{fontWeight:"bold",fontSize:20}}>밥챙겨주기</Text>
        <Text style={{fontWeight:"bold",fontSize:20}}>Food</Text>
        </TouchableOpacity>
      </View>
      <View style={{width:"100%",height:"100%",marginTop:10,flexDirection:"row"}}>
      </View>
    </View>
    )

    
}