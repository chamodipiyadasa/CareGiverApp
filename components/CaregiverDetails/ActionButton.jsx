import { View, Text, FlatList, Image, Linking } from 'react-native'
import React from 'react'
import mg from './../../assets/images/phone-call.png'
import { TouchableOpacity } from 'react-native'

export default function ActionButton({caregiver}) {

  const actionButtonMenu=[
    {
      id:1,
      name:'Call',
      icon:require("./../../assets/images/phone-call.png"),
      url:"tel:"+caregiver?.phone
    },
    {
      id:2,
      name:'Location',
      icon:require("./../../assets/images/placeholder.png"),
      url:"https://www.google.com/maps/search/?api=1&query"+caregiver?.address
    },
    {
      id:3,
      name:'Web',
      icon:require("./../../assets/images/world-wide-web.png"),
      url:""
    },
    {
      id:4,
      name:'Share',
      icon:require("./../../assets/images/share.png"),
      url:""
    }
  ]

  const OnPressHandle=(item)=>{
    if(item.name == 'share'){
      return;
    }
    Linking.openURL(item.url);
  }
  return (
    <View style={{
      backgroundColor:'#fff',
      padding:20
    }}>
      <FlatList 
        data={actionButtonMenu}
        columnWrapperStyle={{justifyContent:'space-between'}}
        numColumns={4}
        renderItem={({item,index})=>(
          <TouchableOpacity key={index}
          onPress={()=>OnPressHandle(item)}
          >
            <Image source={item?.icon}
            style={{width:50,
              height:50
            }}
            
            />

            <Text style={{fontFamily:'outfit-medium',textAlign:'center',marginTop:3}}>{item.name}</Text>
            </TouchableOpacity>
        )}
      
      />
    </View>
  )
}