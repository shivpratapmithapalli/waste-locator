// appwrite.js
import { Client, Account, Databases } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')  
  .setProject('67fe2c390032dbff76c5');              

// Initialize the Account service
export const account = new Account(client);
export const databases = new Databases(client, '67fe336b0006e4bd3c23');