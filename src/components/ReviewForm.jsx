import { Pressable, StyleSheet, TextInput, View } from "react-native"
import Text from "./Text"
import { useFormik } from "formik"
import * as yup from 'yup'
import theme from "../theme"
import useCreateReview from "../hooks/useCreateReview"

const validationSchema = yup.object().shape({
    repoOwnerName: yup.string().required('Repository owner Name is required'),
    repoName: yup.string().required('Repository Name is required'),
    rating: yup.number().min(0).max(100).required('Rating between 0 and 100 is required'),
    review: yup.string()
})


const ReviewForm = () => {
    const {createReview, error} = useCreateReview()

    const onSubmit = async ({repoName, repoOwnerName, rating, review}) => {
        try{
            await createReview({repositoryName: repoName, ownerName: repoOwnerName, rating: Number(rating), text: review})
        }catch(e){
            console.log(e)
        }
    }

    const initialValues = {
        repoOwnerName: '',
        repoName: '',
        rating: '',
        review: '',
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
                <TextInput style={!formik.errors.repoOwnerName ? styles.input : { ...styles.input, borderColor: theme.error.primary }} placeholder="Repository Owner Name"  value={formik.values.repoOwnerName} onChangeText={formik.handleChange('repoOwnerName')} />
                {formik.touched.repoOwnerName && formik.errors.repoOwnerName && <Text style={{ color: theme.error.primary }}>{formik.errors.repoOwnerName}</Text>}
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: '80%' }}>
                <TextInput style={!formik.errors.repoName ? styles.input : { ...styles.input, borderColor: theme.error.primary }} placeholder="Repository Name" value={formik.values.repoName} onChangeText={formik.handleChange('repoName')} />
                {formik.touched.repoName && formik.errors.repoName && <Text style={{ color: theme.error.primary }}>{formik.errors.repoName}</Text>}
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: '80%' }}>
                <TextInput style={!formik.errors.rating? styles.input : { ...styles.input, borderColor: theme.error.primary }} placeholder="Rating between 0 and 100" value={formik.values.rating} onChangeText={formik.handleChange('rating')} />
                {formik.touched.rating && formik.errors.rating && <Text style={{ color: theme.error.primary }}>{formik.errors.rating}</Text>}
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: '80%' }}>
                <TextInput multiline style={!formik.errors.review ? styles.input : { ...styles.input, borderColor: theme.error.primary }} placeholder="Review" value={formik.values.review} onChangeText={formik.handleChange('review')} />
                {/* {formik.touched.password && formik.errors.password && <Text style={{ color: theme.error.primary, marginLeft: 0 }}>{formik.errors.password}</Text>} */}
            </View>
            <Pressable onPress={() => formik.handleSubmit()} style={styles.button}><Text style={{ color: 'white' }}>Create a review</Text></Pressable>
        </View>
    )
}

export default ReviewForm;