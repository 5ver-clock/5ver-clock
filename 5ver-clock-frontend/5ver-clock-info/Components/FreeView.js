
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, useWindowDimensions,Dimensions, Button, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HTML from 'react-native-render-html';
export default function FreeView({ bno, btitle, bcontent, id,btext ,bphoto,bviewCount, nickname }) {
  // export default function FreeView({ item }) {
  const contentWidth = useWindowDimensions().width;
  // const [cardInfo,setCardInfo] = useState(props.items);

  // console.log("보드 메인에서 보낸 bno:", bno);
  const navigation = useNavigation();

  const onDetail = () => {
    navigation.navigate("FreeBoardDetail", { no: bno });
  }
  // console.log("서버에서 온 item.bno", item.bno);
  // console.log("서버에서 온 btext", btext);
  return (
    // <TouchableOpacity onPress={onDetail} style={{borderWidth:1}}>
    <>
      {bphoto ?
        <TouchableOpacity onPress={onDetail}>
        <View style={styles.container}>
          <View style={styles.imageView} >
            <Image
              source={{ uri:bphoto }}
              style={styles.image}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.contentBox}>
            <View style={styles.title}>
              <Text style={styles.titleText} numberOfLines={1}>{btitle}</Text>
              <View style={{margin:0,height:"120%",padding:5}}>
              <Text style={{fontSize: 10,fontWeight:"bold",width: Dimensions.get('window').width * 0.1,height:"100%" }}  numberOfLines={1}> {nickname}</Text>
              </View>
            </View>

            <View style={styles.content}>
            <Text style={{ fontWeight: "bold" }} numberOfLines={3} ellipsizeMode="tail">{btext}</Text>
            </View>
            <View style={styles.bottomContent}>
              <Text style={{fontWeight:"normal",fontSize:10,color:"gray"}}>조회수 {bviewCount}</Text>
            </View>
          </View>
        </View>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={onDetail}>
        <View style={styles.container2}>
          <View style={styles.noneimageView} />
          <View style={styles.contentBox2}>
            <View style={styles.title2}>
              <Text style={styles.titleText} numberOfLines={1}>{btitle}</Text>
              <Text style={{ fontSize: 10,fontWeight:"bold",width: Dimensions.get('window').width * 0.1,}} numberOfLines={1}> {nickname}</Text>
            </View>
            <View style={styles.content2}>
           
              <Text style={{ fontWeight: "bold" }} numberOfLines={2} ellipsizeMode="tail">{btext}</Text>
            </View>
            <View style={styles.bottomContent2}>
              <Text style={{fontWeight:"normal",fontSize:10,color:"gray"}}>조회수 {bviewCount}</Text>
            </View>
          </View>
        </View>
        </TouchableOpacity>
      }
     </>
    
  )
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: Dimensions.get('window').width * 0.45,
    maxHeight: Dimensions.get('window').height * 0.5,
    marginTop: 0,
    padding: 5,
    marginLeft:-Dimensions.get('window').width * 0.02,
    marginRight:-Dimensions.get('window').width * 0.02,
    paddingBottom:15,
    position: "relative",
  },
  container2: {
    alignItems: "center",
    width: Dimensions.get('window').width * 0.45,
    maxHeight: Dimensions.get('window').height * 0.2,
    marginTop: 0,
    padding: 5,
    marginLeft: -Dimensions.get('window').width * 0.02,
    marginRight:-Dimensions.get('window').width * 0.02,
    paddingBottom:15,
    position: "relative",
    
  },
  imageView: {
    alignItems: "center",
    width: "100%",
    maxHeight: "50%",
    borderWidth: 3,
    borderBottomWidth: 0,
    borderColor: "black"
  },
  noneimageView: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "0%",
    borderWidth: 3,
    borderBottomWidth: 0,
    borderColor: "black"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  contentBox: {
    alignItems: "center",
    width: "100%",
    height: "50%",
    borderWidth: 3,
    borderTopWidth: 0,
    borderColor: "black",
    backgroundColor: "#F1E7DD",
    padding: 10,
  },
  contentBox2: {
    alignItems: "center",
    width: "100%",
    maxHeight: "100%",
    borderWidth: 3,
    borderTopWidth: 0,
    borderColor: "black",
    backgroundColor: "#F1E7DD",
    padding: 10,
    
  },
  title: {
    flexDirection: "row",
    // justifyContent: 'space-between',
    // alignItems: "center",
    width:"100%",
    height:  Dimensions.get('window').height * 0.025,
    backgroundColor: "#F1E7DD",
  },
  title2: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    width: "100%",
    height: "30%",
    backgroundColor: "#F1E7DD",
  },
  titleText: {
    width: Dimensions.get('window').width * 0.25,
    maxHeight:"100%",
    fontWeight: "bold",
    fontSize: 15,
  },
  content: {
    width: "100%",
    height: "50%",
    backgroundColor: "#F1E7DD",
    marginTop:10
  },
  content2: {
    width: "100%",
    maxHeight: "50%",
    backgroundColor: "#F1E7DD",
    marginTop:10,
  },
  bottomContent: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    width: "100%",
    height: "35%",
    backgroundColor: "#F1E7DD",
  
  },
  bottomContent2: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    width: "100%",
    height: "15%",
    backgroundColor: "#F1E7DD",
    marginTop:10
  },
});