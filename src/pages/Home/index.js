import React, { useEffect, useState } from 'react'
import { 
    FlatList, 
    SafeAreaView, 
    StyleSheet, 
    Text,
    RefreshControl, 
    View, 
} from 'react-native'
import { Header, ProductCard } from '../../components'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Home = () => {

    const stateGlobal = useSelector(state => state)
    const [data, setData] = useState()
    const[refreshing, setRefreshing] = React.useState(false)
    //console.log('state global: ', stateGlobal)

    // const dummy = [
    //     {
    //         id: 1,
    //         title: 'Product Name',
    //         desc: 'Lorem Ipsum',
    //         price: '50000',
    //         image: 'https://source.unsplash.com/1600x900/?shoes',
    //     },
    //     {
    //         id: 2,
    //         title: 'Product Name',
    //         desc: 'Lorem Ipsum',
    //         price: '50000',
    //         image: 'https://source.unsplash.com/1600x900/?shoes',
    //     },
    //     {
    //         id: 3,
    //         title: 'Product Name',
    //         desc: 'Lorem Ipsum',
    //         price: '50000',
    //         image: 'https://source.unsplash.com/1600x900/?shoes',
    //     },
    // ];


    useEffect ( () => {
        onRefresh()

        return onRefresh()
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing (true)
        setData ()
        axios
            .get('http://api-test.q.camp404.com/public/api/material', {
                headers: {Authorization: `Bearer ${stateGlobal.access_token}`}
            })
            .then (response => {
                let res = response.data
                setData(res.materials)
                setRefreshing(false)
            })
            .catch (error => {
                setRefreshing(false)
                Alert.alert('Gagal mendapatkan data')
            })
    }, [])

    const deleteProduct = async id => {
        try {
            const DeleteProduct = await axios ({
                method: 'delete',
                url: `http://api-test.q.camp404.com/public/api/material/${id}`,
                headers: {
                    Authorization: `Bearer ${stateGlobal.access_token}`,
                    'Content-Type': 'appliction/x-www-form-urlencoded',
                },
            })
            if (DeleteProduct.status === 200) {
                onRefresh();
            }
        } catch (error) {
            Alert.alert('Gagal menghapus data')
        }
    }

    const renderItem = ({item}) => (
    <ProductCard
        id={item.id}
        title={item.nama_barang}
        description={item.deskripsi}
        price={item.harga}
        image={item.gambar}
        deletePress={() => deleteProduct(item.id)}
    />
    );

    return (
        <SafeAreaView>
            <Header title={'Home'} />
            <FlatList 
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ListHeaderComponent={<Text style= {styles.label}>List Product</Text>}
                ListFooterComponent={<View style={styles.footer} />}
                style={styles.container}
                RefreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        backgroundColor: '#fff',
        padding: 16,
    },
    label: {
        fontSize: 1,
        fontWeight: 'bold',
        color: '#2F2E41',
        marginBottom: 16,
    },
    footer: {
        height: 30,
    },
});