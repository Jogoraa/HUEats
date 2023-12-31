const admin = require('firebase-admin');
const serviceAccount = {
  "type": "service_account",
  "project_id": "foodapp2-4ba23",
  "private_key_id": "e716c09772b3d0d3bb3a03c6b049f5936cd5ee1f",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqKHGBxaKrYOyo\nX8bfdfK5I1+WANwBapblOUt9vZE6d8SDdX7uu+ywYLhbu6CuG3sO0dTQVericanj\nSClnvxzMfCLYRqEVUGH6L3htntvdAzn/dtA9yeJtTw3P4C4bxex97yLU8/0iwlG6\nER0hJRUCvhmHd7A9hknsfaVC6JXLqvQyXv8gJKWdN+z4vkyztqE6x4sxW1W2ydSJ\n0HwXXrrGsjQLp5pXFSsEj1UA3TJLSpnqM2SkIvY+j7CiStkp4rvgchg68VDllsN1\nYz7lVC3LE3buF3L5DKpsP2lwqbDMvU2ZPstadEhQkGlZ5avE77YHScFdGfbXDY6H\nHvhedHenAgMBAAECggEATnn3m5vcYcECdMczb+U0jDlpwMNltEuGC3MIw5W10Krj\nGaQLZiyKxW/eJwSaXyIyd4vD5E/z0/sLGNUzr3L/Y7nO0kOE0FEx1tKk7p3JFh4C\nVjVkZlLhWHuQybJBYbK/Vvd+74sV0L2hNrjk39/72Dd3i7hiMoXoOydZnEmrqHHP\nmFU8OS5qnOgbn0lWPZv9TJOB6lu7twqXIevM8OYUas2ELpRzyTJFnAmGc4DXznOD\ngPnIHYauzY9YHPfkHvuHbU3ALd1n6sqfGTicoNTfall8b+WDJYi5Q80xdNos5KEp\nn9ukjv19ApU5ICeQXGvjZrY2dh4302GgF2FyqB+2mQKBgQDaKbCVnAnvTTvjJhhK\n9Pi+hr13QLT0JUWORdQI10l7N/zIrAGkji2WPC6oGafoC1jWQEq2/Sb9nxWv3lfj\ntqVu3at9t15AA3yLUpNTL7blvcL8c8lkAW1oHuIXF3T7bjZdOuDjmHFc1bRKNGIo\n8nYxcVuifpVZQEIcI4AePMcBnwKBgQDHq10pgu4bvyfRXoEVQ46SDfWRk3YMX7mj\n8KUooX8pvZa/JF9F+5qDWGUO/XscgtXLKeeEaBgtN7E2CGNgPstDAEjB0zBLZO3I\nui9AnCEPF3L8VNxmPQT6KV1T9RJ1k80E4cnVw06O5+RlD3pvhi6YwnMz+iCsiG45\nw96YMLmc+QKBgENQC7ENtS8F2I2MioBON5WpwznRWEPgYCa2uuaDbqO7MZ7FG7in\nOb+aEBdD2z/IiH+K1MLDN02X0TwzUVDsYPzlHm2qr0T3Dm16bASFu1wFge0c2K2n\nlxdCOCZB0ZFmfxWi/hKbTZcERR2ELilOLlOxE0H+5pvkLMG73mL2A70nAoGANUrT\nrsS3cMhwhD1JDrfdUbZQGO7Wzy6ticgtDM8t9aIYniPDGhaxguUQ9BNLzKxPC86/\ncGOoMElxDw7mF0YrUlK9GJ6ZgUYLAUxQWFpTqIeFtTuhJ9iZf3uS4VnD94XfbrIl\nAN0EFrhmCWM8NpAF19fuj6zvE53GbbyNqOk4YWECgYEAy+8dvy24U9xFwSnUa0d6\nK/b71Jq7v9fO2XL+bUDsYCP8oRd6UqFJGdaJpMda9+wwRQ/WPw3n0o8H4lBQdwVD\nbY2pNln9f3wYLbrPuTr6BhlvKU4XyqSrmLlTzPaTz7SYwop8fk1Khlpm1Aw++l62\ndILBg/eVM6dLzIHVHTl1n04=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-sgje5@foodapp2-4ba23.iam.gserviceaccount.com",
  "client_id": "116248198344021297241",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-sgje5%40foodapp2-4ba23.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Get a reference to the Firestore database
const db = admin.firestore();

// Now you can perform Firestore operations
const collectionRef = db.collection('UserData');
const fs = require('fs');

// Read the data from the JSON file
fs.promises.readFile('userdata.json', 'utf8')
  .then(data => {
    const jsonData = JSON.parse(data);
    for (const user in jsonData) {
      const userRef = collectionRef.doc(user.uid);
      userRef.set(jsonData[user]);
    }
  })
  .catch(error => {
    console.error('Error reading JSON file:', error);
  });
