import CastCard from '@components/cast-card';
import RecommendationCard from '@components/recommend-card';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useViewModel } from './movie-detail.vm';
import dayjs from 'dayjs';
import { formatDuration } from '@utils/time';

type Props = {} & NativeStackScreenProps<any>;

export const MovieDetailScreen: React.FC<Props> = props => {
    const { goBack, movie, isAddedToWatchList, addToWatchList } = useViewModel(props);

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('@assets/logo.png')} style={styles.logo} />
            <ScrollView>
                {/* Top Bar */}
                <View style={styles.top}>
                    <View style={styles.topBar}>
                        <TouchableOpacity onPress={goBack} style={styles.sideButton}>
                            <Image source={require('@assets/chevron-left.png')} />
                        </TouchableOpacity>
                        <View style={styles.center}>
                            <Text style={styles.title}>
                                {movie.title} <Text style={styles.year}>({dayjs(movie.date).year()})</Text>
                            </Text>
                        </View>
                    </View>

                    {/* Movie Info Section */}
                    <View style={styles.infoSection}>
                        <Image source={movie.image} style={styles.poster} />
                        <View style={styles.details}>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.rating}>{movie.ratingMPAA}</Text>
                            </View>
                            <Text style={styles.text}>
                                {dayjs(movie.date).format('DD/MM/YYYY')} 🔸 {formatDuration(movie.duration)}
                            </Text>
                            <Text style={styles.text}>{movie.genres.join(', ')}</Text>
                            <Text style={styles.text}>
                                <Text style={styles.bold}>Status:</Text> {movie.status}
                            </Text>
                            <Text style={styles.text}>
                                <Text style={styles.bold}>Original Language: </Text>
                                {movie.originalLanguage}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.middle}>
                    {/* User Score & Crew */}
                    <View style={styles.userScoreSection}>
                        <View style={styles.flex1}>
                            <View style={styles.scoreCircle}>
                                <Text style={styles.scoreText}>{movie.userScore}%</Text>
                            </View>
                            <View style={styles.userScore}>
                                <Text style={styles.scoreText}>User Scrore</Text>
                            </View>
                        </View>

                        <View style={styles.flex1}>
                            {movie.crew.map(item => {
                                return (
                                    <Text style={styles.crew}>
                                        <Text style={styles.crewName}>{item.name}</Text>
                                        {'\n'}
                                        {item.roles.join(', ')}
                                    </Text>
                                );
                            })}
                        </View>
                    </View>

                    {/* Tagline & Overview */}
                    <Text style={styles.tagline}>
                        <Text style={styles.italic}>{movie.tagline}</Text>
                    </Text>
                    <Text style={styles.overviewTitle}>Overview</Text>
                    <Text style={styles.overviewText}>{movie.overview}</Text>
                    {/* Add to Watchlist Button */}
                    <View style={styles.watchListBtn}>
                        <TouchableOpacity onPress={addToWatchList} disabled={isAddedToWatchList} style={styles.button}>
                            <Image
                                style={[styles.iconWatchList, { tintColor: isAddedToWatchList ? '#45ff8f' : 'white' }]}
                                source={require('@assets/watchlist.png')}
                            />

                            <View style={styles.textWatchListView}>
                                <Text style={[styles.buttonText, { color: isAddedToWatchList ? '#45ff8f' : 'white' }]}>
                                    {isAddedToWatchList ? 'Added To Watchlist' : 'Add To Watchlist'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {movie.topBilledCast ? (
                    <View style={styles.topBilledCast}>
                        <Text style={styles.topBilledCastText}>Top Billed Cast</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topBilledCastScrollView}>
                            {movie.topBilledCast?.map(item => {
                                return <CastCard key={item.name} imageUrl={item.image} name={item.name} character={item.characterName} />;
                            })}
                        </ScrollView>
                    </View>
                ) : null}

                <View style={styles.recommend}>
                    <Text style={styles.recommendText}>Recommendations</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendScrollView}>
                        <RecommendationCard imageUrl={require('@assets/barbie.png')} title="Barbie" score="90%" />
                        <RecommendationCard imageUrl={require('@assets/the-flash.png')} title="The Flash" score="80%" />
                        <RecommendationCard imageUrl={require('@assets/the-little-mermaid.png')} title="The Mermaid" score="75%" />
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    scrollView: {
        backgroundColor: '#53BDEB',
    },
    top: {
        backgroundColor: '#0099c2',
        padding: 12,
    },
    middle: {
        backgroundColor: '#00b4e4',
        padding: 12,
    },
    logo: {
        width: 100,
        height: 40,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginBottom: 20,
    },
    sideButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
        // justifyContent: 'center',
    },
    center: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    year: {
        fontWeight: 'normal',
    },
    infoSection: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
        marginTop: 20,
    },
    poster: {
        width: 100,
        height: 150,
        borderRadius: 6,
    },
    details: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    ratingContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 6,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 4,
    },
    rating: {
        fontSize: 12,
        color: '#ccc',
    },
    text: {
        color: 'white',
        marginVertical: 1,
    },
    bold: {
        fontWeight: 'bold',
    },
    userScoreSection: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 16,
        alignItems: 'center',
    },
    scoreCircle: {
        backgroundColor: '#0A0F23',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scoreText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    userScore: {
        marginTop: 10,
    },
    crew: {
        color: 'white',
        marginVertical: 2,
    },
    crewName: {
        fontWeight: 'bold',
    },
    tagline: {
        fontStyle: 'italic',
        color: '#f0f0f0',
        marginBottom: 12,
    },
    italic: {
        fontStyle: 'italic',
    },
    overviewTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 6,
    },
    overviewText: {
        color: 'white',
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    topBilledCast: {
        padding: 12,
    },
    topBilledCastText: {
        fontSize: 16,
        fontWeight: '600',
    },
    topBilledCastScrollView: {
        marginTop: 12,
    },
    recommend: {
        borderTopColor: '#E4E4E4',
        borderTopWidth: 1,
        padding: 12,
    },
    recommendText: {
        fontSize: 16,
        fontWeight: '600',
    },
    recommendScrollView: {
        marginTop: 12,
    },
    textWatchListView: {
        alignItems: 'center',
    },
    iconWatchList: { width: 20, height: 20, marginRight: 4 },
    watchListBtn: {
        alignItems: 'flex-start',
    },
    flex1: {
        flex: 1,
    },
});
