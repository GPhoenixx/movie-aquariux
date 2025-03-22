import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';

import { Category, Movie } from '../models/movie';
import SelectDropdown from '../components/select';
import { Options, SortOrder } from '../models/comon-type';
import dayjs from 'dayjs';
import { movies } from '../repositories/movie-data';
import { debounce, chunk } from 'lodash';

const optionsCate: Options[] = [
    { title: 'Now Playing', value: Category.NOW_PLAYING },
    { title: 'Upcoming', value: Category.UP_COMING },
    { title: 'Popular', value: Category.POPULAR },
];

const optionsSort: Options[] = [
    { title: 'By alphabetical order', value: SortOrder.ALPHABET },
    { title: 'By rating', value: SortOrder.RATING },
    { title: 'By release date', value: SortOrder.RELEASE_DATE },
];

const PageSize = 4;
export const HomeScreen: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<Options | undefined>({ title: 'Now Playing', value: Category.NOW_PLAYING });
    const [selectedSortBy, setSelectedSortBy] = useState<Options | undefined>();
    const [searchText, setSearchText] = useState<string>();
    const [filterData, setFilterData] = useState<Movie[]>([]);
    const [pageOffset, setPageOffset] = useState<number>(0);
    const [isNothingToLoad, setIsNothingToLoad] = useState<boolean>(false);
    // const [loadMore, setLoadMore] = useState<number>(0);
    const flatListRef = useRef<FlatList>(null);

    const renderItem = ({ item }: { item: Movie }) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={{ flex: 1 }}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.movieDate}>{dayjs(item.date).format('DD/MM/YYYY')}</Text>
                <Text style={styles.movieDesc}>{item.desc}</Text>
            </View>
        </View>
    );

    const getFilterData = useCallback((category?: Options, text?: string) => {
        return movies.filter(item => {
            if (text && !item.title.toLowerCase().includes(text.toLowerCase())) {
                return false;
            }
            if (category && item.category !== category.value) {
                return false;
            }
            return true;
        });
    }, []);

    const getPaginationData = useCallback((data: Movie[], offset: number) => {
        const dataPagination = chunk(data, PageSize);
        if (offset < dataPagination.length) {
            return dataPagination[offset];
        }
        return [];
    }, []);

    const handleData = useCallback(
        ({ category, sortBy, text }: { category?: Options; sortBy?: Options; text?: string }) => {
            const data = getFilterData(category, text);
            if (sortBy) {
                if (sortBy.value === SortOrder.ALPHABET) {
                    data.sort((a, b) => a.title.localeCompare(b.title));
                }
                switch (sortBy.value) {
                    case SortOrder.ALPHABET:
                        data.sort((a, b) => a.title.localeCompare(b.title));
                        break;
                    case SortOrder.RELEASE_DATE:
                        data.sort((a, b) => a.date - b.date);
                        break;
                    case SortOrder.RATING:
                        data.sort((a, b) => a.rating - b.rating);
                        break;
                    default:
                        break;
                }
            }
            return data;
        },
        [getFilterData]
    );

    useEffect(() => {
        const data = handleData({ category: selectedCategory, sortBy: selectedSortBy, text: searchText });
        const paginationData = getPaginationData(data, pageOffset);
        if (pageOffset === 0) {
            setFilterData(paginationData);
        } else {
            if (paginationData.length === 0) {
                setIsNothingToLoad(true);
            }
            setFilterData(prev => {
                return [...prev, ...paginationData];
            });
        }
    }, [getPaginationData, handleData, pageOffset, searchText, selectedCategory, selectedSortBy, setFilterData]);

    useEffect(() => {
        setIsNothingToLoad(false);
        setPageOffset(0);
        scrollToTop();
    }, [searchText, selectedCategory]);

    const handleChangeText = debounce((text: string) => {
        setSearchText(text);
    }, 500);

    const handleLoadMore = () => {
        setPageOffset(prev => prev + 1);
    };

    const scrollToTop = () => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    // const handleSearch = () => {
    //     console.log('value', selectedCategory, selectedSortBy, searchText);
    // };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <Image source={require('../../assets/logo.png')} style={styles.logo} />
                <SelectDropdown
                    title={'Now Playing'}
                    options={optionsCate}
                    selected={selectedCategory}
                    onSelect={value => setSelectedCategory(value)}
                />
                <SelectDropdown title={'Sort by'} options={optionsSort} selected={selectedSortBy} onSelect={setSelectedSortBy} />

                <TextInput style={styles.searchInput} placeholder="Search..." onChangeText={handleChangeText} />

                {/* <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Search </Text>
                </TouchableOpacity> */}
            </View>

            <FlatList
                ref={flatListRef}
                data={filterData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                // contentContainerStyle={{ paddingBottom: 10 }}
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
});
