import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Text, View, SafeAreaView, StyleSheet, FlatList, TextInput, Button, Dimensions, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import FreeView from '../../Components/FreeView';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import MasonryList from '@react-native-seoul/masonry-list';


export default function Main({ navigation }) {



  const [frData, setFrData] = React.useState([]);
  const isFocused = useIsFocused(); // isFoucesd Define

  const selectList = () => {
    axios.post("http://192.168.2.94:5000/board/search", null, {
      params: {
        page: 1,
        size: 10,
        type: "type",
        keyword: "자유게시판"
      }
    })
      .then(function (res) {
        setFrData(res.data.dtoList);
        console.log("리스폰스데이터:", res.data.dtoList[0].bno);
      })
      .catch(function (error) {
        console.log("게시판 전체 데이터 가져오기 실패: ", error)
      })
  }
  React.useEffect(() => {
    selectList();
  }, [isFocused])

  const onDetail = () => {
    navigation.navigate("FreeBoardDetail", { no: frData.bno });
  }




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

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ width: "100%" }}>
          <View style={{ width: "100%", height: Dimensions.get('window').height * 0.4 }}>
            <View style={{ width: "100%", height: "30%", flexDirection: "row", justifyContent: "center", marginBottom: 5 }}>
              <TouchableOpacity style={{ width: "30%", height: "100%", borderWidth: 2.5, alignItems: "center", justifyContent: "center", margin: 7 }}
                onPress={() => navigation.navigate('MainBoard')}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>게시판들!</Text>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Board</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: "30%", height: "100%", borderWidth: 2.5, borderColor: "white", alignItems: "center", justifyContent: "center", marginTop: 7, marginBottom: 7 }}
                onPress={() => navigation.navigate('CalenderMain')}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>캘린더</Text>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Calender</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: "30%", height: "100%", borderWidth: 2.5, alignItems: "center", justifyContent: "center", margin: 7 }}
              onPress={() => navigation.navigate('MapInfo')}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>함께하는공간</Text>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Map</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "100%", height: "30%", flexDirection: "row", justifyContent: "center", marginBottom: 5 }}>
              <TouchableOpacity style={{ width: "30%", height: "100%", borderWidth: 2.5, borderColor: "white", alignItems: "center", justifyContent: "center", margin: 7 }}
                onPress={() => navigation.navigate('Walk')}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>산책해요</Text>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Walk</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: "30%", height: "100%", borderWidth: 2.5, alignItems: "center", justifyContent: "center", marginTop: 7 }}
                onPress={() => navigation.navigate('News')}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>애완뉴스</Text>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>News</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: "30%", height: "100%", borderWidth: 2.5, alignItems: "center", justifyContent: "center", margin: 7 }}
                onPress={() => navigation.navigate('Ranking')}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>최고의 견주</Text>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Ranking</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "100%", height: "30%", flexDirection: "row", justifyContent: "center", marginBottom: 5 }}>
              <TouchableOpacity style={{ width: "30%", height: "100%", borderWidth: 2.5, borderColor: "white", alignItems: "center", justifyContent: "center", margin: 7 }}
                onPress={() => navigation.navigate('SkinMain')}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>피부검사</Text>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Skin</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: "30%", height: "100%", borderWidth: 2.5, alignItems: "center", justifyContent: "center", marginTop: 7 }}
                onPress={() => navigation.navigate('Food')}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>밥챙겨주기</Text>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Food</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: "30%", height: "100%", borderWidth: 2.5, alignItems: "center", justifyContent: "center", margin: 7 }}
                onPress={() => navigation.navigate('Play')}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>놀아주세요</Text>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Play</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 맵을 2개 돌려서 id가 짝수는 왼쪽 홀수는 오른쪽에 렌더링해주기 */}
          <View style={{flexDirection:"row",justifyContent:"center"}}>
          <View style={{ padding: 10, marginTop: 10 }}>
            {frData.filter((_, i) => i % 2 === 0).map((e) => (
              <FreeView key={e.id} {...e} />
            )
            )
            }
          </View>
          <View style={{ padding: 10, marginTop: 10}}>

            {frData.filter((_, i) => i % 2 !== 0).map((e) => (
              <FreeView key={e.id} {...e} />
            )
            )
            }
          </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {

    flexWrap: "wrap",
    marginTop: 8,
    backgroundColor: "aliceblue",
    maxHeight: 400,
  },
})