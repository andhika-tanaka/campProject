import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {useNavigation} from '@react-navigation/native'

const currencyFormat = number => {
    return `Rp. ${number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}

const ProductCard = ({id, title, description, price, image, deletePress}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image source={{uri: image}} style={styles.image} />
            <View style={styles.contentWraper}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
                <Text style={styles.description} numberOfLines={3}>
                    {description}
                </Text>
                <Text style={styles.price} numberOfLines={1}>
                    {currencyFormat(price)}
                </Text>
                <View style={styles.actionWraper}>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('EditProduct', {
                                id: id,
                                title: title,
                                description: description,
                                price: price,
                                image: image,
                            })
                        }>
                        <View style= {[styles.actionButton, styles.actionEdit]}>
                            <Text style={styles.actionText}>Edit</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deletePress()}>
                        <View style= {[styles.actionButton, styles.actionDelete]}>
                            <Text style={styles.actionText}>Delete</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginBottom: 16,
        flexDirection: 'row',
        padding: 12,
        borderWidth: 3,
        borderColor: '#1F8597',
        borderRadius: 8,
    },
    image: {
        height: 140,
        width: 140,
        borderRadius: 8,
        marginRight: 12,
    },
    contentWraper: {
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2F2E41',
    },
    description: {
        fontSize: 13,
        color: '#3F3D56',
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#F4A896',
    },
    actionWraper: {
        width: '100%',
        flexDirection: 'row',
    },
    actionButton: {
        borderRadius: 3,
        width: 60,
        paddingVertical: 3,
        alignItems: 'center',
    },
    actionEdit: {
        backgroundColor: '#FFC107',
        marginRight: 8,
    },
    actionText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },
    actionDelete: {
        backgroundColor: '#DC3545',
    },
})
