import { Pressable, StyleSheet, TextInput, View } from "react-native"
import Text from "./Text"
import { useFormik } from "formik"
import * as yup from 'yup'
import theme from "../theme"

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
})

const SignIn = () => {
    const onSubmit = (values) => {
        console.log(values)
    }
    const initialValues = {
        username: '',
        password: ''
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    const styles = StyleSheet.create({
        formContainer: {
            backgroundColor: 'white',
            flexDirection: 'column',
            alignItems: 'center',
        },
        input: {
            borderColor: theme.colors.textSecondary,
            borderRadius: 5,
            width: '100%',
            height: 40,
            marginTop: 15,
            borderWidth: 2,
            color: theme.colors.textSecondary,
            paddingLeft: 10
        },
        button: {
            backgroundColor: theme.colors.primary,
            marginTop: 10,
            width: '80%',
            height: 40,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        }
    })

    return (
        <View style={styles.formContainer}>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: '80%' }}>
                <TextInput style={!formik.errors.username ? styles.input : { ...styles.input, borderColor: theme.error.primary }} placeholder="Username" value={formik.values.username} onChangeText={formik.handleChange('username')} />
                {formik.touched.username && formik.errors.username && <Text style={{ color: 'red' }}>{formik.errors.username}</Text>}
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: '80%' }}>
                <TextInput style={!formik.errors.password ? styles.input : { ...styles.input, borderColor: theme.error.primary }} placeholder="Password" secureTextEntry value={formik.values.password} onChangeText={formik.handleChange('password')} />
                {formik.touched.password && formik.errors.password && <Text style={{ color: 'red', marginLeft: 0 }}>{formik.errors.password}</Text>}
            </View>
            <Pressable onPress={() => formik.handleSubmit()} style={styles.button}><Text style={{ color: 'white' }}>Sign In</Text></Pressable>
        </View>
    )
}

export default SignIn;