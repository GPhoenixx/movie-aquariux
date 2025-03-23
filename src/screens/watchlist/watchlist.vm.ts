import { useWatchlistStore } from '@global-state/watchlist';
import { FilterType } from '@models/watchlist';
import { useCallback, useMemo, useState } from 'react';

export const useViewModel = () => {
    const { watchlist, removeFromWatchlist } = useWatchlistStore();
    const [orderAsc, setOrderAsc] = useState(true);
    const [filter, setFilter] = useState(FilterType.RATING);

    const handleRemove = useCallback(
        (id: string) => {
            removeFromWatchlist(id);
        },
        [removeFromWatchlist]
    );

    const filterData = useMemo(() => {
        return watchlist.sort((a, b) => {
            if (orderAsc) {
                if (filter === FilterType.DATE) {
                    return a.date - b.date;
                }
                if (filter === FilterType.RATING) {
                    return a.rating - b.rating;
                }
            } else {
                if (filter === FilterType.DATE) {
                    return b.date - a.date;
                }
                if (filter === FilterType.RATING) {
                    return b.rating - a.rating;
                }
            }
            return 0;
        });
    }, [filter, orderAsc, watchlist]);

    return { data: filterData, handleRemove, orderAsc, setOrderAsc, filter, setFilter };
};
