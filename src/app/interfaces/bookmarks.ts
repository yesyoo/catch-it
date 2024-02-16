export interface IBookmarkPost {
    userId: string;
    itemId: string;
    collection: string;
    title: string;
}

export interface IBookmarkDB {
    _id: string,
    userId: string;
    itemId: string;
    collection: string;
    title: string;
}

export interface IUserListItem {
    id: string;
    collection: string
}