
export interface Girl {
    type: string;
    user: User
}

    export interface Image {
        height: number;
        width: number;
        url: string;
    }

    export interface Album {
        id: string;
        name: string;
        images: Image[];
    }

    export interface Artist {
        id: string;
        name: string;
    }

    export interface TopTrack {
        id: string;
        name: string;
        album: Album;
        artists: Artist[];
        preview_url: string;
        uri: string;
    }

    export interface User {
        _id: string;
        name: string;
        top_track: TopTrack;
        selected: boolean;
    }
