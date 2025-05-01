import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId)
        this.databases= new Databases(this.client);
        this.bucket = new Storage(this.client);
        
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                    conf.appWriteDatabaseId,
                    conf.appWriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status,
                        userId,
                    }
            )
            
        } catch (error) {
            console.log('Appwrite service :: createPost :: error', error);
            
        }
    }

    async updatePost(slug,{title, content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    featuredImage,
                    content,
                    status,
                }
            )
            
        } catch (error) {
            console.log('Appwrite Service :: UpdatePost :: error', error);
            
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
            )
            return true;
            
        } catch (error) {
            console.log('Appwrite service :: DeletePost :: error', error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
            )
            
        } catch (error) {
            console.log('Appwrite Service :: getPost :: error', error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries
            )
            
        } catch (error) {
            console.log('Appwrite Service :: getPosts :: error', error);
            return false
        }
    }

    //file services

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            console.log('Appwrite Service :: uploadFile :: error',error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId,
            )
            
        } catch (error) {
            console.log('Appwrite Service :: deleteFile :: error', error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId
        )
    }

    getFileView(fileId) {
        return this.bucket.getFileView(
            conf.appWriteBucketId,
            fileId
        );
    }
}

const service = new Service();
export default service;

