import React from "react";
import { Image , Pressable , StyleSheet , View , Text} from "react-native";

export default function AnimalListCard({img , aname , setModalVisible}){

    return (
        
        <View>
            <Pressable onPress={() => setModalVisible(true)}>
                <View style={styles.listbox}>
                    <View style={styles.listimg}>
                    {
                        img === null ? <Image style={styles.imgBox} />:
                        <Image style={styles.imgBox} source={{ uri: img }} />
                    }
                    </View>
                    <Text style={styles.listtext}>
                        {aname}
                    </Text>

                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    imgBox : {
        resizeMode: "cover", 
        width: 100, 
        height: 100, 
        borderRadius: 50, 
        borderWidth: 3
    },
    listbox:{
        flexDirection: 'row', 
    },
    listimg:{
        borderWidth:1,
        height:100,
        width:100,
        marginLeft:'5%',
        marginTop:"3%"
    },
    listtext:{
        borderWidth:1,
        height:80,
        width:200,
        margin:'2%',
        marginTop:"4%"
    },

})