import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native'
import * as Contacts from 'expo-contacts'

const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const [reRender, setreRender] = useState(false)
    const searchFilter=(text)=>{
        console.log(text);
        if(text){
            // console.log(contacts);rr
            const newData=contacts.filter((item)=>{
                // console.log(item.name);
                const itemData=item.name ?
                item.name.toUpperCase()
                :''.toUpperCase();
                const textData=text.toUpperCase();
            
                return itemData.indexOf(textData)>-1;
            })
             console.log(newData);
             setContacts(newData)
             
           
        
       
    }
        else{
                setreRender(true)

        }
}
    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers]
                })
                if (data.length > 0) {
                    setContacts(data);
                }
            }
        })()
    },[reRender])
    return (
        <View style={{ width: '100%', padding: 20, marginTop: 50 }}>
            <TextInput
            style={styles.searchBar}
               
                placeholder="Enter customer Name to add enteries"
                underlineColorAndroid="transparent"
                onChangeText={(text)=>searchFilter(text)}
                
            />

            <FlatList


                data={contacts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={{ borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 14 }}>{item.name}</Text>
                            <Text style={{ fontSize: 12 }}>{item.phoneNumbers && item.phoneNumbers[0].number}</Text>
                        </View>
                    )
                }}
            />
        </View>

    )
}
const styles = StyleSheet.create({

    searchBar: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,

        marginBottom: 40,
        borderRadius: 5,
        marginTop: 20,

    },
})
export default Contact


