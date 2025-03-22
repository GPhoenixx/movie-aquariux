export type Movie = {
    id: string;
    title: string;
    date: number;
    desc: string;
    image: any;
    category: Category;
    rating: number
};

export enum Category {
    NOW_PLAYING = 'NOW_PLAYING',
    UP_COMING = 'UP_COMING',
    POPULAR = 'POPULAR',
}
