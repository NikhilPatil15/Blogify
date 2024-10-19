import conf from '../config/conf'
import {Client,Databases,Storage,Query,ID} from 'appwrite'


export class Service{
    client = new Client()
    databases
    bucket

    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userI}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug    ,
                {
                title,
                content,
                featuredImage,
                status,
                userI
                }
            )
        } catch (error) {
            console.log("CreatePost:Error",error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                title,
                content,
                featuredImage,
                status
                 }
            )
        } catch (error) {
            console.log("UpdatePost:Error",error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug)
                return true
        } catch (error) {
            console.log("DeletePost:Error",error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
   
        } catch (error) {
           console.log("GetPost:Error",error);
            return false
        }
    }

     async getPosts(queries = [Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
    
        } catch (error) {
           console.log("GetPosts:Error" ,error);
            return false
        }
    }

    //file upload services

    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appwriteBucketId,
                ID.unique(),
                file)
            
        } catch (error) {
            console.log("UploadFile:Error",error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
           console.log("DeleteFile:Error",error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    downloadImage(imageId){
        return this.bucket.getFileDownload(
            conf.appwriteBucketId,
            imageId
        )
}
}

const service = new Service()
export default service