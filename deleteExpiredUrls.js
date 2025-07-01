const admin = require('firebase-admin');
const db = require('./firebase');

// Function to delete URLs older than 15 minutes
const deleteExpiredUrls = async () => {
    try {
        console.log('Running deleteExpiredUrls function');
        
        // Get the current time
        const now = new Date();
        const fifteenMinutesAgo = new Date(now.getTime() -  10* 60 * 1000);

        console.log(`Current time: ${now}`);
        console.log(`Expiration time: ${fifteenMinutesAgo}`);

        const querySnapshot = await db.collection('urls').where('createdAt', '<', fifteenMinutesAgo).get();

        if (querySnapshot.empty) {
            console.log('No URLs to delete.');
        } else {
            console.log(`Found ${querySnapshot.size} URLs to delete.`);
            const batch = db.batch();
            querySnapshot.forEach(doc => {
                console.log(`Preparing to delete: ${doc.id}`);
                batch.delete(doc.ref);
            });

            // Commit the batch delete
            await batch.commit();
            console.log('Expired URLs deleted successfully.');
        }
    } catch (error) {
        console.error('Error deleting expired URLs:', error);
    }
};


setInterval(deleteExpiredUrls, 30000);

module.exports = deleteExpiredUrls;
