import conf from '../conf/conf.js';
import { Client, ID, Databases, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async AddBookmark({ User_ID, Title, Description, Starred = false, Collection_Name, URL, Image_URL, Is_Collection = false, Collection_ID }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    User_ID,
                    Title,
                    Description,
                    Starred,
                    Collection_Name,
                    URL,
                    Image_URL,
                    Is_Collection,
                    Collection_ID
                });
        } catch (error) {
            //console.log("Appwrite service :: AddBokkmark :: error", error);
        }
    }

    async RemoveBookmark({ Bookmark_ID }) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                Bookmark_ID
            );
            return true;
        } catch (error) {
            //console.log("Appwrite service :: RemoveBookmark :: error", error);
            return false;
        }
    }

    async UpdateBookmark({ Bookmark_ID, Collection_Name, Collection_ID }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                Bookmark_ID,
                {
                    Collection_Name,
                    Collection_ID
                }
            );
        } catch (error) {
            //console.log("Appwrite service :: UpdateBookmark :: error", error);
        }
    }

    async ToggleStarred(Bookmark_ID, { Starred }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                Bookmark_ID,
                {
                    Starred
                }
            );
        } catch (error) {
            //console.log("Appwrite service :: ToggleStarred :: error", error);
        }
    }

    async GetBookmark({ Bookmark_ID }) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                Bookmark_ID
            );
        } catch (error) {
            //console.log("Appwrite service :: GetBookmark :: error", error);
        }
    }

    async ListAllBookmarks({ User_ID }) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("User_ID", User_ID),
                    Query.equal("Is_Collection", false)
                ]
            );
        } catch (error) {
            //console.log("Appwrite service :: ListBookmarks :: error", error);
        }
    }

    async ListBookmarksByCollection({ User_ID, Collection_ID }) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("User_ID", User_ID),
                    Query.equal("Collection_ID", Collection_ID)
                ]
            );
        } catch (error) {
            //console.log("Appwrite service :: ListBookmarksByCollection :: error", error);
        }
    }

    async RemoveAllBookmarks({ User_ID, Collection_ID }) {
        try {
            const bookmarks = await this.ListBookmarksByCollection({ User_ID: User_ID, Collection_ID: Collection_ID });
            //console.log("Bookmarks", bookmarks);
            bookmarks.documents.forEach(async (doc) => {
                await this.RemoveBookmark({ Bookmark_ID: doc.$id });
            });
            return true;
        } catch (error) {
            //console.log("Appwrite service :: RemoveAllBookmarks :: error", error);
            return false;
        }
    }

    async MoveAllBookmarksToTrash({ User_ID }) {
        const allBookmarks = await this.ListAllBookmarks({ User_ID: User_ID });
        allBookmarks.documents.forEach(async (bookmark) => {
            await this.UpdateBookmark({ Bookmark_ID: bookmark.$id, Collection_Name: "Trash", Collection_ID: "3" });
        });
    }

    async MoveUnsortedBookmarksToTrash({ User_ID }) {
        const unsortedBookmarks = await this.ListBookmarksByCollection({ User_ID: User_ID, Collection_ID: "2" });
        unsortedBookmarks.documents.forEach(async (bookmark) => {
            await this.UpdateBookmark({ Bookmark_ID: bookmark.$id, Collection_Name: "Trash", Collection_ID: "3" });
        });
    }

    // Collections

    async AddCollection({ User_ID, Collection_Name, Collection_ID }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                Collection_ID,
                {
                    User_ID,
                    Title: "Collection",
                    Description: "New Collection Added Collection",
                    Starred: false,
                    Collection_Name,
                    URL: " ",
                    Image_URL: " ",
                    Is_Collection: true,
                    Collection_ID: Collection_ID
                });
        } catch (error) {
            //console.log("Appwrite service :: AddCollection :: error", error);
        }
    }

    async RemoveCompleteCollection({ User_ID, Collection_ID }) {
        try {
            const deleteList = await this.ListBookmarksByCollection({ User_ID: User_ID, Collection_ID: Collection_ID });
            //console.log("Delete List", deleteList);
            deleteList.documents.forEach(async (doc) => {
                await this.RemoveBookmark({ Bookmark_ID: doc.$id });
            });
            return true;
        } catch (error) {
            //console.log("Appwrite service :: RemoveCollection :: error", error);
            return false;
        }
    }

    async ListCollections({ User_ID }) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("User_ID", User_ID),
                    Query.equal("Is_Collection", true)
                ]
            );
        } catch (error) {
            //console.log("Appwrite service :: ListCollections :: error", error);
        }
    }

    async MoveCollectionToTrash({ User_ID, Collection_ID }) {
        try {
            const res = await this.RemoveBookmark({ Bookmark_ID: Collection_ID });
            //console.log("Collection Removed : ", res);
            //console.log("Collection ID", Collection_ID);
            //console.log("User ID", User_ID);
            const bookmarks = await this.ListBookmarksByCollection({ User_ID: User_ID, Collection_ID: Collection_ID });
            //console.log("Bookmarks", bookmarks);
            for (const bookmark of bookmarks.documents) {
                try {
                    let res = await this.UpdateBookmark({ Bookmark_ID: bookmark.$id, Collection_Name: "Trash", Collection_ID: "3" })
                    //console.log("Update Response : ", res);
                } catch (error) {
                    throw error;
                }
            }
            return true
        } catch (error) {
            //console.log("Appwrite service :: MoveCollectionToTrash :: error", error);
        }
    }

    async GetCollectionId({ User_ID, Collection_ID }) {
        try {
            const collections = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("User_ID", User_ID),
                    Query.equal("Collection_ID", Collection_ID),
                    Query.equal("Is_Collection", true)
                ]
            );
            if (collections.documents.length > 0) {
                return collections.documents[0].$id;
            } else {
                return null;
            }
        } catch (error) {
            //console.log("Appwrite service :: GetCollectionId :: error", error);
            return null;
        }
    }
}

const appwriteService = new Service();
export default appwriteService;
//"662b9f1578a6084700fa"
//"662b9f1578a6084700fa"