export interface Post{
    id$: string;
    video: string;
    thumbnail: string;
    creator?: {
        id: string;
        username: string;
        avatar: string;
    };
    prompt: string;
}

export type Posts = Post[]