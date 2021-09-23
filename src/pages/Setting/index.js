import React, {useCallback} from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Linking,
    Alert, 
} from 'react-native'
import {Header} from '../../components'
import Images from '../../assets'
import {useDispatch} from 'react-redux'
import {removeValue} from '../../localStorage'

const mapLink= 'https://goo.gl/maps/xgArh2zPM8HWFcuc9'

const logout = () => {
    dispatch ({
        type: 'SET_LOGOUT',
    })
    removeValue('user')
    navigation.replace('Login')
}

const Setting = ({navigation}) => {
    const dispatch = useDispatch()
    const mapRedirect = useCallback( async () => {

        const supported = await Linking.canOpenURL (mapLink)
        
        if (supported) {
            await Linking.openURL(mapLink)
        } else {
            Alert.alert(`Don't know how to open this URL: ${mapLink}`)
        }
    }, []);

    const logout = () => {
        dispatch ({
            type: 'SET_LOGOUT',
        })
        navigation.replace('Login')
    }

    return (
        <SafeAreaView style={styles.page}>
            <Header title={'Setting'} />
            <View style={styles.container}>
                <Text style={styles.label}>List Setting</Text>
                <TouchableOpacity
                    style={styles.itemSetting}
                    onPress={() => navigation.navigate('AddProduct')}>
                    <Text style={styles.itemSettingText}> Add Product </Text>
                    <Image source={Images.ICRightArrow} style={styles.rightIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.itemSetting}
                    onPress={mapRedirect}>
                    <Text style={styles.itemSettingText}>Store Location</Text>
                    <Image source={Images.ICRightArrow} style={styles.rightIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.btnWrapper}>
                <TouchableOpacity 
                    style={styles.btnLogout}
                    onPress={() => logout()}>
                    <Text style={styles.btnLogoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Setting

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
        marginBottom: 32,
    },
    itemSetting: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 8,
        paddingTop: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    rightIcon: {
        height: 16,
        width: 16,
    },
    itemSettingText: {
        fontSize: 13,
        fontWeight: 'bold',
        color:'#2f2e41',
    },
    btnWrapper: {
        padding: 16,
    },
    btnLogout: {
        height: 45,
        width:'100%',
        backgroundColor: '#d46b52',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    btnLogoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
})
