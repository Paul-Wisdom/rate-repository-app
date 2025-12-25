import { Pressable, StyleSheet, TextInput, View } from "react-native"
import Text from "./Text"
import { useFormik } from "formik"
import * as yup from 'yup'
import theme from "../theme"
import useCreateUser from "../hooks/useCreateUser"
import useSignIn from "../hooks/useSignIn"
import { useNavigate } from "react-router-native"

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Password fields do not match").required('Password Confirmation is required')
})


export const SignUp = () => {
    const { createUser, error } = useCreateUser();
    const {signIn} = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async ({ username, password, confirmPassword }) => {
        try {
            console.log({ username, password, confirmPassword });
                await createUser({username, password});
                await signIn({username, password})
                navigate('/');
        } catch (e) {
            console.log(e)
        }
    }
    const initialValues = {
        username: '',
        password: '',
        confirmPassword: ''
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
            {error && <Text style={{ color: theme.error.primary, marginTop: 5 }}>{error}</Text>}
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: '80%' }}>
                <TextInput style={!formik.errors.username ? styles.input : { ...styles.input, borderColor: theme.error.primary }} placeholder="Username" value={formik.values.username} onChangeText={formik.handleChange('username')} />
                {formik.touched.username && formik.errors.username && <Text style={{ color: theme.error.primary }}>{formik.errors.username}</Text>}
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: '80%' }}>
                <TextInput style={!formik.errors.password ? styles.input : { ...styles.input, borderColor: theme.error.primary }} placeholder="Password" secureTextEntry value={formik.values.password} onChangeText={formik.handleChange('password')} />
                {formik.touched.password && formik.errors.password && <Text style={{ color: theme.error.primary, marginLeft: 0 }}>{formik.errors.password}</Text>}
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: '80%' }}>
                <TextInput style={!formik.errors.confirmPassword ? styles.input : { ...styles.input, borderColor: theme.error.primary }} placeholder="Confirm Password" secureTextEntry value={formik.values.confirmPassword} onChangeText={formik.handleChange('confirmPassword')} />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && <Text style={{ color: theme.error.primary, marginLeft: 0 }}>{formik.errors.confirmPassword}</Text>}
            </View>
            <Pressable onPress={() => formik.handleSubmit()} style={styles.button}><Text style={{ color: 'white' }}>Sign Up</Text></Pressable>
        </View>
    )
}

export default SignUp;