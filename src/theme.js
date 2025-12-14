import { Platform } from "react-native";

const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        primary: '#0366d6'
    },
    fontSize: {
        body: 14,
        subheading: 16
    },
    fonts: {
        main: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'System'
        })
    },
    fontWeight: {
        normal: '400',
        bold: '700'
    },
    tab: {
        color: '#24292e'
    },
    background: {
        mainBackgroundColor: '#d6d6c1ff'
    },
    error:{
        primary:'#d73a4a'
    }
}

export default theme;