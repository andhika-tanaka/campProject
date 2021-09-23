import React, {useState} from 'react'
import { 
    StyleSheet, 
    Text, 
    View ,
    SafeAreaView,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    Alert,
} from 'react-native'
import {Header} from '../../components'
import Images from '../../assets'
import * as ImagePicker from 'react-native-image-picker'
import {useSelector} from 'react-redux'
import axios from 'axios'
import QueryString from 'qs'

const AddProduct = ({navigation}) => {
    const stateGlobal = useSelector(state => state)
    const [image, setImage] = useState()
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    
    const upload = () => {
        ImagePicker.launchImageLibrary (
            {mediaType: 'photo', quality: 0.5, includeBase64: true},
            response => {
                if (response.didCancel || response.error) {
                    Alert.alert('oops, batal memilih foto')
                } else {
                    if(response?.assets[0]?.fileSize < 10000000) {
                        setImage(response)
                    } else {
                        Alert.alert('Ukuran gambar tidak boleh lebih dari 500kb')
                    }
                }
            },
        )
    }

    const save = async () => {
        if (productName ==='' || description === '' || price === '') {
            Alert.alert('Peringatan', 'Data isian tidak boleh kosong')
            return false
        }
        const url = 'http://api-test.q.camp404.com/public/api/material'

        const data = QueryString.stringify ({
            nama_barang: productName,
            deskripsi: description,
            harga: price,
            gambar: `data:image/jpg;base64, ${image.assets[0].base64}`,
        })

        await axios ({
            method: 'post',
            url: url,
            headers: {
                Authorization: `Bearer ${stateGlobal.access_token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data,
        })
            .then (response =>{
                Alert.alert('Berhasil Ditambahkan')
                navigation.goBack()
            })
            .catch (error => {
                Alert.alert('Gagal Ditambahkan')
            })
    }

    return (
       <SafeAreaView style={styles.page}>
            <Header title={'Add Product'} />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.label}>Product Name</Text>
                <TextInput 
                    style={styles.textInput}
                    value={productName}
                    onChangeText={setProductName}
                />
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={styles.textArea}
                    numberOfLines={3}
                    multiline
                    textAlignVertical={'top'}
                    value={description}
                    onChangeText={setDescription}
                />
                <Text style={styles.label}>Price</Text>
                <TextInput 
                    style={styles.textInput}
                    keyboardType={'decimal-pad'}
                    value={price}
                    onChangeText={setPrice}
                />
                <Text style={styles.label}>Photo</Text>
                <TouchableOpacity 
                    style={styles.uploadImage} 
                    onPress={() => {upload()}}>
                    {image?.assets ? (
                        <Image
                            source={{uri: image?.assets[0].uri}}
                            resizeMode={'cover'}
                            style={styles.previewImage} 
                        />
                    ) : (
                        <Image
                            source={Images.ICAdd}
                            style={styles.plusIcon}
                        />
                    )}
                </TouchableOpacity>
                <TouchableOpacity 
                    style ={styles.btnSave}
                    onPress={() => save()}
                >
                    <Text style={styles.btnSaveText}>
                        Save
                    </Text>
                </TouchableOpacity>
            </ScrollView>
       </SafeAreaView>
    )
}
 
export default AddProduct

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2f2e41',
        marginBottom: 8,
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#c4c4c4',
        borderRadius: 6,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    textArea: {
        height: 80,
        borderWidth: 1,
        borderColor: '#c4c4c4',
        borderRadius: 6,
        marginBottom: 16,
        paddingHorizontal: 8
    },
    uploadImage: {
        width: 100,
        height: 100,
        backgroundColor: '#c4c4c4',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusIcon: {
        width: 40,
        height:40,
    },
    previewImage: {
        width: 100,
        height:100,
        borderRadius: 6,
    },
    btnSave: {
        height: 45,
        width: '100%',
        backgroundColor: '#1f8597',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginTop: 32,
    },
    btnSaveText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
})
