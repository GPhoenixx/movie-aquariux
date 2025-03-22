import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Options } from '../models/comon-type';

type SelectDropdownProps = {
    options: Options[];
    selected?: Options;
    onSelect: (value?: Options) => void;
    title: string;
};

const SelectDropdown: React.FC<SelectDropdownProps> = ({ options, selected, onSelect, title }) => {
    const [expanded, setExpanded] = useState(false);

    const handleSelect = (value: Options) => {
        onSelect(value);
        setExpanded(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={expanded ? styles.selectBoxExpanded : styles.selectBox}
                activeOpacity={0.8}
                onPress={() => setExpanded(!expanded)}
            >
                <Text style={styles.selectedText}>{selected?.title ?? title}</Text>
                <Image source={expanded ? require('../../assets/chevron-down.png') : require('../../assets/chevron-right.png')} />
            </TouchableOpacity>

            {expanded && (
                <View style={styles.dropdown}>
                    {options.map(option => (
                        <TouchableOpacity
                            key={option.value}
                            style={[styles.option, selected?.value === option.value && styles.selectedOption]}
                            onPress={() => handleSelect(option)}
                        >
                            <Text style={[styles.optionText, selected === option && styles.selectedOptionText]}>{option.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

export default SelectDropdown;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    selectBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 14,
        elevation: 2,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    selectBoxExpanded: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 14,
        elevation: 2,
        borderColor: '#ccc',
        borderWidth: 1,
        borderBottomWidth: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    selectedText: {
        fontWeight: 'bold',
    },
    dropdown: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingVertical: 6,
        elevation: 3,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    option: {
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 6,
        marginHorizontal: 6,
        marginVertical: 2,
    },
    selectedOption: {
        backgroundColor: '#51bdf0',
    },
    optionText: {
        color: '#333',
    },
    selectedOptionText: {
        color: '#fff',
    },
});
