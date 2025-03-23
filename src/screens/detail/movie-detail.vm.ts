import { useWatchlistStore } from '@global-state/watchlist';
import { Movie } from '@models/movie';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';

type Props = {} & NativeStackScreenProps<any>;
export const useViewModel = ({ navigation, route }: Props) => {
    const { data } = route.params as any;
    const [isAddedToWatchList, setIsAddedToWatchList] = useState(false);

    const { watchlist, addToWatchlist } = useWatchlistStore();

    const movie = data as Movie;

    const handleData = useCallback(async () => {
        if (watchlist) {
            const index = watchlist.findIndex(item => item.id === movie.id);
            setIsAddedToWatchList(index >= 0);
        }
    }, [movie.id, watchlist]);

    useEffect(() => {
        handleData();
    }, [handleData]);

    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    const addToWatchList = useCallback(async () => {
        if (isAddedToWatchList) return;
        addToWatchlist(movie);
        setIsAddedToWatchList(true);
    }, [addToWatchlist, isAddedToWatchList, movie]);

    return {
        goBack,
        movie,
        isAddedToWatchList,
        setIsAddedToWatchList,
        addToWatchList,
    };
};
