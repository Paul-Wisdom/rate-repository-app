import { StyleSheet } from "react-native"
import { Text as NativeText } from "react-native"
import theme from "../theme"

const styles = StyleSheet.create({
    text: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSize.body,
        fontWeight: theme.fontWeight.normal,
        fontFamily: theme.fonts.main
    },
    colorTextSecondary:{
        color: theme.colors.textSecondary
    },
    colorPrimary: {
        color: theme.colors.primary
    },
    fontSizeSubHeading:{
        fontSize: theme.fontSize.subheading
    },
    fontWeightBold:{
        fontWeight: theme.fontWeight.bold
    }
})
const Text = ({color, fontSize, fontWeight, style, ...props}) => {
    const textStyle = [
        styles.text,
        color === 'primary' && styles.colorPrimary,
        color === 'textSecondary' && styles.colorTextSecondary,
        fontSize === 'subheading' && styles.fontSizeSubHeading,
        fontWeight === 'bold' &&  styles.fontWeightBold,
        style
    ]
    return <NativeText style={textStyle} {...props}/>
}

export default Text;