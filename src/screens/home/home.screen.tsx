import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SelectDropdown from '@components/select';
import { optionsCate, optionsSort, useViewModel } from './home.vm';
import { PageSize } from '@const/paging';
import { Movie } from '@models/movie';

type Props = {} & NativeStackScreenProps<any>;
export const HomeScreen: React.FC<Props> = props => {
    const {
        selectedCategory,
        selectedSortBy,
        filterData,
        isNothingToLoad,
        flatListRef,
        goToDetail,
        handleChangeText,
        handleLoadMore,
        setSelectedCategory,
        setSelectedSortBy,
        handleSearch,
    } = useViewModel(props);

    const renderItem = ({ item }: { item: Movie }) => (
        <TouchableOpacity style={styles.card} onPress={() => goToDetail(item)}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.flex1}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.movieDate}>{dayjs(item.date).format('DD/MM/YYYY')}</Text>
                <Text style={styles.movieDesc}>{item.desc}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <Image source={require('@assets/logo.png')} style={styles.logo} />
                <SelectDropdown
                    title={'Now Playing'}
                    options={optionsCate}
                    selected={selectedCategory}
                    onSelect={value => setSelectedCategory(value)}
                />
                <SelectDropdown title={'Sort by'} options={optionsSort} selected={selectedSortBy} onSelect={setSelectedSortBy} />

                <TextInput style={styles.searchInput} placeholder="Search..." onChangeText={handleChangeText} />

                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Search </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                ref={flatListRef}
                data={filterData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListFooterComponent={
                    isNothingToLoad || filterData.length < PageSize ? (
                        <></>
                    ) : (
                        <TouchableOpacity style={styles.loadMoreBtn} onPress={handleLoadMore}>
                            <Text style={styles.loadMoreButtonText}>Load More</Text>
                        </TouchableOpacity>
                    )
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    timeText: {
        fontSize: 16,
        marginBottom: 10,
    },
    logo: {
        width: 100,
        height: 40,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginBottom: 20,
    },
    searchContainer: {
        marginHorizontal: 12,
    },

    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 14,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        marginBottom: 10,
    },
    buttonText: {
        fontWeight: 'bold',
    },
    searchInput: {
        padding: 14,
        borderRadius: 8,
        marginBottom: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    searchButton: {
        backgroundColor: '#ddd',
        padding: 14,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 20,
    },
    searchButtonText: {
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        padding: 10,
        marginBottom: 15,
    },
    cardImage: {
        width: 100,
        height: 120,
        borderRadius: 8,
        marginRight: 10,
    },
    movieTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    movieDate: {
        color: 'gray',
        marginVertical: 4,
    },
    movieDesc: {
        color: '#333',
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        height: 60,
        backgroundColor: '#0a2740',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    loadMoreBtn: {
        backgroundColor: '#00B4E4',
        padding: 14,
        alignItems: 'center',
        marginHorizontal: 12,
        marginBottom: 12,
        borderRadius: 5,
    },
    loadMoreButtonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
    },
    flex1: {
        flex: 1,
    },
});
