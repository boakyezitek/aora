import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.tonacode.aora",
    projectId: "663bed3500279ee293c7",
    databaseId: "663beea3002f00d97cf3",
    userCollectionId: "663beed10030ea09094b",
    videoCollectionId: "663bef1000355b79f8fb",
    storageId: "663bf1eb00143e9ad5a4",
}


let client, account, avatars, databases;

client = new Client();


client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

account  = new Account(client);

avatars = new Avatars(client)
databases = new Databases(client)

  export const registerUser = async(email:string, password:string, username: string) => {
    try{
        const newAccount = await account.create(
            ID.unique(), email, password, username
        )
        if(!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          ID.unique(),
          {
            accountId: newAccount.$id,
            username: username,
            email: email,
            avatar: avatarUrl,
          }
        );

        return newUser;
    }
    catch(error: any) {
        console.log(error)
        throw new Error(error);
    }
  }

  export const signIn = async(email:string, password:string) => {
    try{
        await account.deleteSessions();
        const newAccount = await account.createEmailPasswordSession(email, password);
        if(!newAccount) throw Error;
    }
    catch(error: any) {
        console.log(error)
        throw new Error(error);
    }
  }

  // Get Account
export const getAccount = async() => {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error: any) {
      throw new Error(error);
    }
  }

// Get Current User
export const getCurrentUser = async() => {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }