export type Movie = {
    id: string;
    title: string;
    date: number;
    desc: string;
    image: any;
    category: Category;
    rating: number;
    releaseDate: number; // number date
    duration: number; //
    ratingMPAA: string; // e.g., "PG13"
    status: 'Released' | 'Upcoming' | string;
    originalLanguage: string;
    genres: Genre[];
    overview: string;
    shortDesc: string;
    tagline?: string;
    posterUrl: string;
    userScore: number; // e.g., 74 for 74%
    crew: CrewMember[];
    topBilledCast?: Cast[];
};

export type Cast = {
    image: any;
    name: string;
    characterName: string;
};

export type Genre = 'Comedy' | 'Adventure' | 'Fantasy' | string;

export type CrewMember = {
    name: string;
    roles: string[]; // e.g., ['Director', 'Writer']
};

export enum Category {
    NOW_PLAYING = 'NOW_PLAYING',
    UP_COMING = 'UP_COMING',
    POPULAR = 'POPULAR',
}
