import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

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
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

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
    console.log('getAllVideos', videos.documents);
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
    console.log('getLatestPosts', posts.documents);

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
};

const getFilePreview = async (fileId, type) => {
  console.log('getFilePreview', fileId, type);

  let fileUrl;

  try {
    if (type === 'image') {
      fileUrl = storage.getFileView(config.storageId, fileId)
      console.log('imageUrl', fileUrl);
    } else if (type === 'video') {
      fileUrl = storage.getFileView(config.storageId, fileId)
      console.log('videoUrl', fileUrl);

    } else {
      throw new Error('Invalid type', 'The file you selected is invalid or not supported')
    }

    if (!fileUrl)
      throw new Error('Error', 'file Download error')

    return fileUrl;

  } catch (error) {

    console.log('get File Preview');
    throw error;
  }
};

const uploadFile = async (file, type) => {

  if (!file) return;

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  }

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    )
    console.log('uploadedFile', type, uploadedFile);

    const fileUrl = await getFilePreview(uploadedFile.$id, type)
    return fileUrl;

  } catch (error) {
    console.log('uploadFile error', type, error);
    throw error;
  }

};

export const createPost = async (form) => {
  try {
    console.log('createPost', form);


    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),]
    );

    const result = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        promt: form.prompt,
        creator: form.userId,
      }
    )

    return result;

  } catch (error) {
    console.error('createPostError', error);
    throw error;
  }
};
