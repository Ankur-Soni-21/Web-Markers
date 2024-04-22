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

    async AddBookmark({ User_ID, Title, Description, Starred = false, Collection_Name, URL, Image_URL, Is_Collection = false }) {
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
                    Is_Collection
                });
        } catch (error) {
            console.log("Appwrite service :: AddBokkmark :: error", error);
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
            console.log("Appwrite service :: RemoveBookmark :: error", error);
            return false;
        }
    }

    async UpdateBookmark(Bookmark_ID, { Collection_Name }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                Bookmark_ID,
                {
                    Collection_Name
                }
            );
        } catch (error) {
            console.log("Appwrite service :: UpdateBookmark :: error", error);
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
            console.log("Appwrite service :: ToggleStarred :: error", error);
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
            console.log("Appwrite service :: GetBookmark :: error", error);
        }
    }

    async ListAllBookmarks({ User_ID }) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("User_ID", User_ID)
                ]
            );
        } catch (error) {
            console.log("Appwrite service :: ListBookmarks :: error", error);
        }
    }

    async ListBookmarksByCollection({ User_ID, Collection_Name }) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("User_ID", User_ID),
                    Query.equal("Collection_Name", Collection_Name)
                ]
            );
        } catch (error) {
            console.log("Appwrite service :: ListBookmarksByCollection :: error", error);
        }
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
                    Is_Collection: true
                });
        } catch (error) {
            console.log("Appwrite service :: AddCollection :: error", error);
        }
    }

    async RemoveCollection({ User_ID, Collection_Name }) {
        try {
            const deleteList = await this.ListBookmarksByCollection({ User_ID: User_ID, Collection_Name: Collection_Name });
            console.log("Delete List", deleteList);
            deleteList.documents.forEach(async (doc) => {
                await this.RemoveBookmark({ Bookmark_ID: doc.$id });
            });
            return true;
        } catch (error) {
            console.log("Appwrite service :: RemoveCollection :: error", error);
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
            console.log("Appwrite service :: ListCollections :: error", error);
        }
    }
}

const appwriteService = new Service();
export default appwriteService;