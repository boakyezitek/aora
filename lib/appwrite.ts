import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.tonacode.aora",
    projectId: "663bed3500279ee293c7",
    databaseId: "663beea3002f00d97cf3",
    userCollectionId: "663beed10030ea09094b",
    videoCollectionId: "663bef1000355b79f8fb",
    storageId: "663bf1eb00143e9ad5a4",
}

const {endpoint, platform, projectId, databaseId, userCollectionId, videoCollectionId, storageId} = appwriteConfig;

let client, account, avatars, databases, storage;

client = new Client();


client
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(platform);

account  = new Account(client);

avatars = new Avatars(client)
databases = new Databases(client)
storage = new Storage(client)

  /**
   * Register a new user
   * @param {string} email - user's email
   * @param {string} password - user's password
   * @param {string} username - user's username
   * @returns {Promise<any>} new user document
   */
  export const registerUser = async (email: string, password: string, username: string) => {
    try {
      const newAccount = await account.create(
        ID.unique(), // Generate a unique ID
        email, // User's email
        password, // User's password
        username, // User's username
      )
      if (!newAccount) throw Error;
      const avatarUrl = avatars.getInitials(username) // Get user's avatar initials

      await signIn(email, password) // Sign in with user's credentials

      const newUser = await databases.createDocument(
        databaseId, // Database ID
        userCollectionId, // User collection ID
        ID.unique(), // Generate a unique ID
        {
          accountId: newAccount.$id, // User's account ID
          username, // User's username
          email, // User's email
          avatar: avatarUrl, // User's avatar
        }
      );

      return newUser;
    }
    catch (error: any) {
      console.log(error)
      throw new Error(error);
    }
  }

  /**
   * Sign in a user using email and password
   * @param {string} email - user's email
   * @param {string} password - user's password
   * @returns {Promise<any>} new account session
   */
  export const signIn = async (email: string, password: string) => {
    try {
      // Delete any existing sessions
      // await account.deleteSessions();

      // Create a new session for the user
      const newAccount = await account.createEmailPasswordSession(email, password);

      // If the new session was not created, throw an error
      if (!newAccount) throw Error;

      return newAccount;
    }
    catch (error: any) {
      // Log any errors that occur
      console.log(error);

      // Re-throw the error so it can be handled by the calling function
      throw new Error(error);
    }
  }


  /**
   * Get the current user's account
   * 
   * Returns the current user's account object
   * 
   * @returns {Promise<any>} current user's account
   */
  export const getAccount = async () => {
    try {
      const currentAccount = await account.get(); // Get the current user's account
  
      return currentAccount;
    } catch (error: any) { // If there was an error
      throw new Error(error); // Throw the error
    }
  }

/**
 * Get the current user
 * 
 * Returns the current user's document from the users collection
 * 
 * @returns {Promise<any>} current user's document
 */
export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount(); // Get the current user's account

    if (!currentAccount) throw Error; // If the current account is not found, throw an error

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)] // Query the users collection for the user with the current account ID
    );

    if (!currentUser) throw Error; // If the user is not found, throw an error

    return currentUser.documents[0]; // Return the first user document found
  } catch (error) {
    console.log(error);
    return null; // If an error occurs, return null
  }
}


  /**
   * Get all posts
   * 
   * Returns an array of all posts documents in the videos collection
   * 
   * @returns {Promise<any>} array of posts documents
   */
  export const getAllPosts = async () => {
    try {
      const posts = await databases.listDocuments(
        databaseId, // Database ID
        videoCollectionId, // Videos collection ID
        [ Query.orderDesc('$createdAt')]
      );

      return posts.documents; // Return an array of posts documents
    } catch (error) {
      console.log(error);
      return null; // If an error occurs, return null
    }
  }


  /**
   * Get latest posts
   * 
   * Returns an array of the latest 4 posts documents in the videos collection,
   * sorted by createdAt in descending order.
   * 
   * @returns {Promise<any>} array of latest posts documents
   */
  export const getLatestPosts = async () => {
    try {
      const posts = await databases.listDocuments(
        databaseId, // Database ID
        videoCollectionId, // Videos collection ID
        [
          Query.orderDesc('$createdAt'), // Sort by createdAt in descending order
          Query.limit(4), // Return only the latest 4 posts
        ],
      );

      return posts.documents; // Return an array of posts documents
    } catch (error) {
      console.log(error);
      return null; // If an error occurs, return null
    }
  }

  /**
   * Search posts
   * 
   * Returns an array of posts documents in the videos collection
   * that match the given search query in the 'title' field.
   * 
   * @param {string} query - search query
   * @returns {Promise<any>} array of posts documents
   */
  export const searchPosts = async (query: string | string[] | undefined) => {
    try {
      const posts = await databases.listDocuments(
        databaseId, // Database ID
        videoCollectionId, // Videos collection ID
        [
          Query.search('title', query), // Search for matching posts in the 'title' field
        ],
      );

      return posts.documents; // Return an array of posts documents
    } catch (error) {
      console.log(error);
      return null; // If an error occurs, return null
    }
  }

  /**
   * Get user posts
   * 
   * Returns an array of posts documents in the videos collection
   * that belong to the user with the given user ID.
   * 
   * @param {string} userId - user ID
   * @returns {Promise<any>} array of posts documents
   */
  export const getUserPosts = async (userId: string | string[] | undefined) => {
    try {
      const posts = await databases.listDocuments(
        databaseId, // Database ID
        videoCollectionId, // Videos collection ID
        [
          Query.equal('creator', userId), // Search for matching posts in the 'creator' field
        ],
      );

      return posts.documents; // Return an array of posts documents
    } catch (error) {
      console.log(error);
      return null; // If an error occurs, return null
    }
  }

  export const logoutUser = async () => {
    try{
      const session = await account.deleteSessions('current');
      return session;
    } 
    catch (error: any) {
      throw new Error(error);
    }
  }
export const getFilePreview = async (fileId, type) => {
  let fileUrl;

  try{
    if(type === 'video') {
      fileUrl = await storage.getFilePreview(storageId, fileId);
    }else if(type === 'image') {
      fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100);
    } else {
      throw new Error('Invalid file type');
    }

    if(!fileUrl) throw new Error('File not found');

    return fileUrl;
  }
  catch(error: any) {
    throw new Error(error);
  }
}
export const uploadFile = async (file, type) => {
  if(!file) return;
  const asset = { 
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri
   }

  try{
    const uploadedFile = await storage.createFile(storageId, ID.unique(), asset);
    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  }
  catch(error: any) { 
    throw new Error(error);
  }
}

export const createVideo = async (form) => {
  try {
    const [thumbnail, video] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),
    ])

    const newPost = await databases.createDocument(
      databaseId, videoCollectionId, ID.unique(), {
        title: form.title,
        thumbnail: thumbnail,
        video: video,
        prompt: form.prompt,
        creator: form.userId,
      }
    )

    return newPost;
  }
  catch(error: any) { 
    throw new Error(error);
  }
}

