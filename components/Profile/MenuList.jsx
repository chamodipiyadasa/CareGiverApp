import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Share, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useAuth } from '@clerk/clerk-react';
import { useRouter } from 'expo-router';

export default function MenuList() {

  const { signOut } = useAuth();
  const menuList = [
    {
      id: 1,
      name: 'Share App',
      icon: require('../../assets/images/share.png'), // You can add the correct icon here
      path: 'share',
    },
    {
      id: 2,
      name: 'Logout',
      icon: require('../../assets/images/logout.png'),
      path: 'logout',
    },
  ];

  const router = useRouter();
  const onMenuClick = (item) => {
    if (item.path === 'logout') {
      signOut(); // Logs out the user
      return;
    }
    if (item.path === 'share') {
      Share.share({
        message: "Download the caregiver App",
      });
      return;
    }
    router.push(item.path); // For other paths, navigate normally
  };

  return (
    <View>
      <FlatList 
        data={menuList}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => onMenuClick(item)} // Use onMenuClick here
            style={styles.menuItem}
          >
            <Image
              source={item.icon}
              style={styles.icon}
            />
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 300,
    backgroundColor: '#fff',
    borderColor: Colors.PRIMARY,
    marginLeft: 10,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    flex: 1,
  },
});
