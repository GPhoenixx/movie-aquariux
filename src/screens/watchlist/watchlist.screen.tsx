import { Movie } from '@models/movie';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useViewModel } from './watchlist.vm';
import { FilterDropdown } from '@components/filter-dropdown';
import { FilterType } from '@models/watchlist';
import dayjs from 'dayjs';

type Props = {} & NativeStackScreenProps<any>;
export const WatchListScreen: React.FC<Props> = ({ navigation }) => {
    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    const { data, handleRemove, orderAsc, setOrderAsc, setFilter } = useViewModel();

    const renderItem = ({ item }: { item: Movie }) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.poster} />
            <View style={styles.cardContent}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.movieDate}>{dayjs(item.date).format('DD/MM/YYYY')}</Text>
                <Text numberOfLines={2} style={styles.movieDesc}>
                    {item.desc}
                </Text>
            </View>
            <TouchableOpacity onPress={() => handleRemove(item.id)}>
                <Image source={require('@assets/delete-button.png')} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('@assets/logo.png')} style={styles.logo} />
            {/* Header */}

            <View style={styles.header}>
                <TouchableOpacity onPress={goBack}>
                    <Image source={require('@assets/chevron-left.png')} />
                </TouchableOpacity>

                <View style={styles.profile}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>J</Text>
                    </View>
                    <View>
                        <Text style={styles.name}>John Lee</Text>
                        <Text style={styles.memberSince}>Member since August 2023</Text>
                    </View>
                </View>
            </View>

            {/* Watchlist Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>My Watchlist</Text>

                {/* Filter Row */}
                <View style={styles.filterRow}>
                    <Text style={styles.filterLabel}>Filter by:</Text>

                    <FilterDropdown options={[FilterType.RATING, FilterType.DATE]} onSelect={setFilter} />
                    <Text style={styles.filterLabel}>Order:</Text>
                    <TouchableOpacity onPress={() => setOrderAsc(prev => !prev)}>
                        <Image
                            style={{ transform: [{ rotate: orderAsc ? '0deg' : '180deg' }] }}
                            source={require('@assets/ascending-arrow.png')}
                        />
                    </TouchableOpacity>
                </View>

                {/* FlatList */}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.flatListStyle}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f9fb',
        flex: 1,
    },
    logo: {
        width: 100,
        height: 40,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginBottom: 20,
    },
    header: {
        backgroundColor: '#0B2447',
        padding: 16,
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        gap: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#8854d0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
    },
    name: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    memberSince: {
        color: 'white',
        fontSize: 12,
        marginTop: 2,
    },
    section: {
        paddingHorizontal: 16,
        paddingTop: 20,
        flex: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    filterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    filterLabel: {
        fontSize: 14,
        color: '#828282',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        marginBottom: 16,
        elevation: 2,
    },
    poster: {
        borderRadius: 4,
    },
    cardContent: {
        flex: 1,
        paddingHorizontal: 4,
        paddingVertical: 20,
    },
    movieTitle: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    movieDate: {
        color: '#555',
        fontSize: 12,
        marginBottom: 4,
    },
    movieDesc: {
        fontSize: 13,
        color: '#333',
        marginTop: 10,
    },
    flatListStyle: {
        paddingBottom: 20,
    },
});

// const pickerStyles = {
//     inputIOS: {
//         fontSize: 14,
//         paddingHorizontal: 10,
//         paddingVertical: 6,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 6,
//         color: '#007aff',
//         minWidth: 100,
//     },
//     inputAndroid: {
//         fontSize: 14,
//         paddingHorizontal: 10,
//         paddingVertical: 4,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 6,
//         color: '#007aff',
//         minWidth: 100,
//     },
// };
