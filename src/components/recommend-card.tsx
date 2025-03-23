import React from 'react';
import { View, Image, Text, StyleSheet, ImageSourcePropType } from 'react-native';

type RecommendationCardProps = {
    imageUrl: ImageSourcePropType;
    title: string;
    score?: string;
};

const RecommendationCard: React.FC<RecommendationCardProps> = ({ imageUrl, title, score }) => (
    <View style={styles.card}>
        <Image source={imageUrl} style={styles.image} />
        <View style={styles.textRow}>
            <Text style={styles.title} numberOfLines={1}>
                {title}
            </Text>
            {score && <Text style={styles.score}>{score}</Text>}
        </View>
    </View>
);

export default RecommendationCard;

const styles = StyleSheet.create({
    card: {
        width: 160,
        marginRight: 12,
    },
    image: {
        width: '100%',
        height: 90,
        borderRadius: 4,
        marginBottom: 4,
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 13,
        flex: 1,
    },
    score: {
        fontSize: 13,
    },
});
