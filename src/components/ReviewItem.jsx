import { Alert, Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";

const ReviewItem = ({ review, reviewPage }) => {
    const navigate = useNavigate('/')
    const {deleteReview} = useDeleteReview()

    const handleReviewdeletion = async () => {
        try{
            Alert.alert('Delete review', 'Are you sure you want to delete this review', [
                {text: 'CANCEL'},
                {
                    text: 'DELETE',
                    onPress: async () => await deleteReview(review.id)
                }
            ])
        }catch(e){
            console.log(e)
        }
    };
    const formatDate = (dateTime) => {
        const date = dateTime.split('T')[0]
        const formattedDate = date.split('-').reverse().join('.')

        return formattedDate;
    }

    const style = StyleSheet.create({
        container: {
            flexDirection: 'row',
            padding: 5
        },
        subContainer: {
            flexDirection: 'column',
            marginLeft: 5,
            paddingRight: 50
        },
        rating: {
            width: 40,
            height: 40,
            margin: 8,
            borderColor: theme.colors.primary,
            borderRadius: '50%',
            borderWidth: 2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        button: {
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'center', 
            borderRadius: 2, 
            marginBottom: 5
        }
    })

    return (
        <View style={{flexDirection: 'column', backgroundColor: 'white'}}>
            <View style={style.container}>
                <View style={style.rating}>
                    <Text color={'primary'} fontSize={'subheading'} fontWeight={'bold'}>{review.rating}</Text>
                </View>
                <View style={style.subContainer}>
                    <Text fontWeight={'bold'}>{review.name}</Text>
                    <Text color={'textSecondary'} style={{ marginBottom: 3 }}>{formatDate(review.createdAt)}</Text>
                    <Text>{review.text}</Text>

                </View>
            </View>
            {reviewPage && <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <Pressable onPress={() => navigate(`/repositories/${review.repository.id}`)}>
                    <View style={{...style.button, backgroundColor: theme.colors.primary}}>
                        <Text style={{color: 'white', padding: 10}}>View repository</Text>
                    </View>
                </Pressable>
                <Pressable onPress={handleReviewdeletion}>
                    <View style={{...style.button, backgroundColor: theme.error.primary}}>
                        <Text style={{color: 'white', padding: 10}}>Delete review</Text>
                    </View>
                </Pressable>
            </View>}
        </View>
    )
};

export default ReviewItem;