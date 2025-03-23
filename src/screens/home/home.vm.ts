import { PageSize } from '@const/paging';
import { Options, SortOrder } from '@models/comon-type';
import { Category, Movie } from '@models/movie';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { movies } from '@repositories/movie-data';
import { chunk } from 'lodash';
import { useState, useRef, useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';

export const optionsCate: Options[] = [
    { title: 'Now Playing', value: Category.NOW_PLAYING },
    { title: 'Upcoming', value: Category.UP_COMING },
    { title: 'Popular', value: Category.POPULAR },
];

export const optionsSort: Options[] = [
    { title: 'By alphabetical order', value: SortOrder.ALPHABET },
    { title: 'By rating', value: SortOrder.RATING },
    { title: 'By release date', value: SortOrder.RELEASE_DATE },
];

type Props = {} & NativeStackScreenProps<any>;
export const useViewModel = ({ navigation }: Props) => {
    const [selectedCategory, setSelectedCategory] = useState<Options | undefined>({ title: 'Now Playing', value: Category.NOW_PLAYING });
    const [selectedSortBy, setSelectedSortBy] = useState<Options | undefined>();
    const [searchText, setSearchText] = useState<string>();
    const [filterData, setFilterData] = useState<Movie[]>([]);
    const [isNothingToLoad, setIsNothingToLoad] = useState<boolean>(false);
    const flatListRef = useRef<FlatList>(null);
    const offset = useRef<number>(0);
    const dataRef = useRef<Movie[]>([]);

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

    const handleChangeText = (text: string) => {
        setSearchText(text);
    };

    const scrollToTop = () => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    const goToDetail = (movie: Movie) => {
        navigation.navigate('MovieDetail', { data: movie });
    };

    useEffect(() => {
        const data = handleData({ category: { title: 'Now Playing', value: Category.NOW_PLAYING } });
        dataRef.current = data;
        const paginationData = getPaginationData(data, offset.current);
        setFilterData(paginationData);
    }, [getPaginationData, handleData]);

    useEffect(() => {
        handleSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory, selectedSortBy]);

    const handleSearch = useCallback(() => {
        setIsNothingToLoad(false);
        scrollToTop();
        offset.current = 0;
        const data = handleData({ category: selectedCategory, sortBy: selectedSortBy, text: searchText });
        dataRef.current = data;
        const paginationData = getPaginationData(data, offset.current);
        setFilterData(paginationData);
    }, [getPaginationData, handleData, searchText, selectedCategory, selectedSortBy]);

    const handleLoadMore = () => {
        offset.current++;
        const paginationData = getPaginationData(dataRef.current, offset.current);
        if (paginationData.length > 0) {
            setFilterData(prev => {
                return [...prev, ...paginationData];
            });
        } else {
            setIsNothingToLoad(true);
        }
    };

    return {
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
    };
};
