import { FilterType } from '@models/watchlist';
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, LayoutChangeEvent } from 'react-native';

type Props = {
    options: FilterType[];
    onSelect: (value: FilterType) => void;
};

export const FilterDropdown: React.FC<Props> = ({ options, onSelect }) => {
    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState(options[0]);
    const [dropdownTop, setDropdownTop] = useState(0);
    const anchorRef = useRef<View>(null);

    const toggleDropdown = () => {
        setExpanded(prev => !prev);
    };

    const handleSelect = (value: FilterType) => {
        setSelected(value);
        setExpanded(false);
        onSelect(value);
    };

    const onAnchorLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setDropdownTop(height + 4); // offset from the label
    };

    return (
        <View style={styles.container}>
            {/* Trigger Button */}
            <TouchableOpacity onPress={toggleDropdown} activeOpacity={0.7}>
                <View style={styles.labelRow} onLayout={onAnchorLayout} ref={anchorRef}>
                    <Text style={styles.labelText}>{selected}</Text>
                    <Image
                        source={require('@assets/dropdown-arrow.png')}
                        style={{ transform: [{ rotate: expanded ? '180deg' : '0deg' }] }}
                    />
                </View>
                <View style={styles.underline} />
            </TouchableOpacity>

            {/* Floating Dropdown */}
            {expanded && (
                <View style={[styles.dropdown, { top: dropdownTop }]}>
                    {options.map(option => (
                        <TouchableOpacity key={option} onPress={() => handleSelect(option)}>
                            <Text style={styles.dropdownItem}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        zIndex: 10,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4EB8E8',
        marginRight: 6,
    },
    underline: {
        height: 2,
        width: '100%',
        backgroundColor: '#4EB8E8',
        marginTop: 2,
    },
    dropdown: {
        position: 'absolute',
        backgroundColor: '#E5F3FF',
        borderRadius: 8,
        padding: 8,
        marginTop: 4,
        elevation: 3,
        zIndex: 1000,
        left: 0,
        width: 100,
    },
    dropdownItem: {
        paddingVertical: 6,
        fontSize: 14,
        color: '#333',
    },
});
