export interface IBookmarksPost {
    userId: string;
    itemId: string;
    collection: string;
    title: string;
}
export interface IBookmarksDB {
    _id: string,
    userId: string;
    itemId: string;
    collection: string;
    title: string;
}