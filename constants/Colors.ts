/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    buttons :"#019992",
    grey1 : "#43484d",
    grey2 : "#5e6977",
    grey3 : "#86939e",
    grey4 : "#bdc6cf",
    grey5 : "#e1e8ee",
    cardComment : "#86939e",
    cardbackground : "white",
    statusbar : "#019992",
    headerText: "black"
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  PRIMARY:'#019992',
  SECONDARY:'#B2E0DE'
};

export const parameters ={
  headerHeight : 50,

  styleButton:{
          backgroundColor:"#019992",
          alignContent:'center',
          justifyContent: 'center',
          borderRadius:12,
          borderWidth:1,
          borderColor:"#019992",
          height:50,
          paddingHorizontal:20,
          width:' 100%'
  },

  buttonTitle:{
      color:"white",
      fontSize:20,
      fontWeight:"bold",
      alignItem:"center",
      justifyContent:"center",
      marginTop: -3
  }

}
