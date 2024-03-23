export interface IBookmarkPost {
    user: string;
    item: string;
    collection: string;
    title: string;
}

export interface IBookmarkDB {
    _id: string,
    user: string;
    item: string;
    collection: string;
    title: string;
}

export interface IUserListItem {
    id: string;
    collection: string
}