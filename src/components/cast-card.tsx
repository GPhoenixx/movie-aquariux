import React from 'react';
import { View, Image, Text, StyleSheet, ImageSourcePropType } from 'react-native';

type CastCardProps = {
    imageUrl: ImageSourcePropType;
    name: string;
    character: string;
};

const CastCard: React.FC<CastCardProps> = ({ imageUrl, name, character }) => (
    <View style={styles.card}>
        <Image source={imageUrl} style={styles.image} />
        <View style={styles.textView}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.character}>{character}</Text>
        </View>
    </View>
);

export default CastCard;

const styles = StyleSheet.create({
    card: {
        width: 100,
        marginRight: 12,
        borderRadius: 4,
        backgroundColor: '#fff',
        elevation: 2,
    },
    textView: {
        padding: 6,
    },
    image: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    character: {
        fontSize: 12,
        color: '#666',
    },
});
