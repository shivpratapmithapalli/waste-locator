// appwrite.js
import { Client, Account, Databases } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')  
  .setProject('67fe2c390032dbff76c5');              

// Initialize the Account service
const account = new Account(client);

// Initialize the Databases service
// Replace [DATABASE_ID] with your actual database id from Appwrite.
const databases = new Databases(client, '[DATABASE_ID]');

export { client, account, databases };

