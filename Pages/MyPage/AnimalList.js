import axios from 'axios';
import React from "react";
import { Text, View, StyleSheet, Alert, Modal, Pressable, Image } from 'react-native';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ServerPort from '../../Components/ServerPort';
import AnimalListCard from '../../Components/AnimalListCard';

//navigation사용할 때 필요
import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";

// 버튼 스타일 적용
import { Button } from '@rneui/themed';

const Stack = createStackNavigator();
const IP = ServerPort();

//동물 info가져오기
export default function AnimalList({ navigation: { navigate } }) {

    const [id,setId] = React.useState("");
    const [data, setData] = React.useState();
    // 모달
    const [modalVisible, setModalVisible] = React.useState(false);
    // 모달에 보이는 데이터 값
    const [modalData, setModalData] = React.useState("");
    const [mImg, setMImg] = React.useState("");


    const save = async () => {
        try {
            setId(await AsyncStorage.getItem('id'));
        } catch (e) {
            console.log("유저 세션 안불러와짐");
        }
    }

    // 로그인 유지
    const getId = async () =>{
        try {
            const value = await AsyncStorage.getItem('id');
            if (value !== null) {
                console.log("id---: ", value);
                return value;
            }
        } catch (e) {
            console.log("not session... ", e);
        }
    }

    const removeAnimal = (id, aName) => //반려동물 삭제
    {
        console.log("removeAnimal--------------------",id,", aname----------",aName);
        axios.post(`${IP}/animal/remove`, null, {
        params: {
            id: id,
            aName: aName
        }
        })
        .then(function(res) {
        console.log("removeAnimal--",res.data);
        animalList(id);
        })
        .catch(function(error) {
        console.log("반려동물 삭제 실패- ", error)
        })
    }

    const animalList = (id) => {
        axios.post(`${IP}/animal/list`, null, {
            params: {
                id: id //sessionStorage에 있는 id값
            }
        })
        .then(function (res) {
            console.log(res);
            console.log("animalList--",res.data);
            setData(res.data);
            setId(id);

        })
        .catch(function (error) {
            console.log(error)
        })
    }

    React.useEffect(() => {
        const info = async () => {
            await save();
            // 서버에 요청
            // 애완동물 목록 불러오기
            console.log("axios하기전: ",id);
            await axios.post("http://192.168.2.94:5000/animal/list", null, {
                params: {
                    id: "user" //sessionStorage에 있는 id값
                }
            })
                .then(function (res) {
                    console.log(res);
                    console.log("AnimallList 값이지롱: ",res.data);
                    setData(res.data);
    
                })
                .catch(function (error) {
                    console.log("AnimallList DB연동 실패,,,,",error);
                })
        }
        info();

    }, []);

    


    return (

        <View style={styles.container}>
            <View style={styles.box1}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View>
                                <View style={{ alignContent: 'center', flexDirection: 'row' }}>
                                </View>
                                <View style={{ flexDirection: 'row', backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ borderRightWidth: 1, padding: 10, alignItems: 'center', width: "40%", backgroundColor: 'yellow' }}>
                                        <Text style={{ fontSize: 15 }}>생일</Text>
                                    </View>
                                    <View style={{ padding: 10, alignItems: 'center', width: "60%", backgroundColor: 'lightgreen' }}>
                                        <Text style={{ fontSize: 15 }}>{modalData.abirth}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ borderRightWidth: 1, padding: 10, alignItems: 'center', width: "40%", backgroundColor: 'yellow' }}>
                                        <Text style={{ fontSize: 15 }}>성별</Text>
                                    </View>
                                    <View style={{ padding: 10, alignItems: 'center', width: "60%", backgroundColor: 'lightgreen' }}>
                                        <Text style={{ fontSize: 15 }}>{modalData.abreed}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ borderRightWidth: 1, padding: 10, alignItems: 'center', width: "40%", backgroundColor: 'yellow' }}>
                                        <Text style={{ fontSize: 15 }}>중성화</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: "60%", alignItems: 'center', }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', width: "100%", backgroundColor: 'lightgreen', justifyContent:'center' }}>
                                            <Checkbox style={styles.checkbox} value={modalData.aneut} />
                                            <Text style={styles.paragraph}>중성화 여부</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', padding: 10 }}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        setModalVisible(!modalVisible)
                                        navigate("ModifyAnimal", {
                                            info: [modalData.aname, modalData.asex, modalData.abirth, modalData.abreed, modalData.aneut, modalData.aphoto, id],
                                            title: modalData.aName,
                                            id: id,
                                            animalList: animalList
                                        })
                                    }}>
                                    <Text style={styles.textStyle}>Modify</Text>
                                </Pressable>
                                <Text>     </Text>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {setModalVisible(!modalVisible); removeAnimal(id, modalData.aname);}}>
                                    <Text style={styles.textStyle}>Remove</Text>
                                </Pressable>
                                <Text>     </Text>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>Close</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>



            <View style={styles.animalbox}>
                <Text style={styles.introtext}> 애완동물 목록 </Text>
            </View>
            <View style={styles.animalinfobox}>
                {/* map형식으로 계속 부름 */}
                {
                    data && data.map((e, index) => {
                        return (
                            <AnimalListCard
                            key = {index}
                            img = {e.aphoto}
                            aname = {e.aname}
                            setModalVisible = {setModalVisible}
                            />
                        )
                    })
                }


            </View>
            
                <View style={styles.addanimal}>
                    <Button title="추가" onPress={() => {
                        navigate("AddAnimal", {
                            id: id
                        })
                    }} />
                </View>

            <View >

            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 24,
        backgroundColor: '#EBE3D7',
    },
    red:{
        padding: 10,
         backgroundColor: "red"
    },
    redbox:{
        borderBottomWidth: 1,
         flexDirection: 'row',
          width: '100%'
    },
    textsize:{
        fontSize: 20
    },

    box1:{
        alignContent: 'center',
        justifyContent: 'center'
    },
    title: {
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: '#20232a',
        borderRadius: 6,
        backgroundColor: '#61dafb',
        color: '#20232a',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    infoName: {
        padding: 10,
        alignItems: 'center',
        width: "30%",
    },
    infoNum: {
        backgroundColor: "white",
        padding: 10,
        alignItems: 'center',
        width: "20%"
    },
    info: {
        backgroundColor: "blue",
        padding: 10,
        width: "50%",
        alignItems: 'center',
    },
    checkbox: {
        margin: 8,
    },
    paragraph: {
        fontSize: 15,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },




  



    animalbox:{
        flex:1,
        borderWidth:1,
        justifyContent: "center",
        alignItems: "center"
    },
    introtext:{
        fontSize:20
    },
    animalinfobox:{
        flex:10,
        borderWidth:1
    },
    listbox:{
        // flex:1,
        flexDirection: 'row', 
    },
    listimg:{
        borderWidth:1,
        height:100,
        width:100,
        // margin:'2%',
        marginLeft:'5%',
        marginTop:"3%"
    },
    listtext:{
        borderWidth:1,
        height:80,
        width:200,
        margin:'2%',
        // marginRight:"100%",
        marginTop:"4%"
    },

    addanimal:{
        flex:1,
        height:100,
        borderWidth:1
    }








});
