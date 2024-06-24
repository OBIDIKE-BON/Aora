import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.stackfloat.aora',
  projectId: '6667f88300287dc1836c',
  databaseId: '6668288a001942c53284',
  userCollectionId: '6668299a00243745149f',
  videoCollectionId: '666829d0002b6e031366',
  storageId: '6668466d002d9fc69c5f'
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform) // Your application ID or bundle ID.
  ;

const account = new Account(client);
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async (username, email, password) => {
  try {
    // Register User
    const newAccount = await account.create(
      ID.unique(), email,
      password, username
    );

    if (!newAccount) throw new Error;

    console.log('account created');

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId, config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
      }
    );

    return newUser;

  } catch (error) {
    throw error;
  }
};

export const signIn = async (email, password) => {

  try {
    const session = await account.createEmailPasswordSession(email, password);

    if (!session) throw new Error(session);

    console.log('session started');

    return session;

  } catch (error) {
    throw error;
  };
};

export const getCurrentUser = async () => {

  try {

    const currentAccount = await account.get();

    if (!currentAccount) throw new Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser) throw new Error;

    return currentUser.documents[0];
  } catch (error) {
    throw error;
  }
};

export const getAllVideos = async () => {
  try {
    const videos = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );
    return videos.documents;

  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search('title', query)]
    );

    return posts.documents;
  } catch (error) {
    throw error;
  }
};

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal('creator', userId)]
    );

    return posts.documents;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    
    const session = await account.deleteSession('current');
    return session;

  } catch (error) {
    throw error;
  }
}
