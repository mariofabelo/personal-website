const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function updateStatsManually() {
    console.log('🎥 YouTube Stats Manual Update Tool');
    console.log('=====================================\n');
    
    try {
        // Read current stats
        const statsPath = path.join(__dirname, 'youtube-stats.json');
        let currentStats = {};
        
        if (fs.existsSync(statsPath)) {
            currentStats = JSON.parse(fs.readFileSync(statsPath, 'utf8'));
            console.log('Current stats:');
            console.log(`  Subscribers: ${currentStats.subscriberCount || 'Not set'}`);
            console.log(`  Videos: ${currentStats.videoCount || 'Not set'}`);
            console.log(`  Last updated: ${currentStats.lastUpdated || 'Never'}\n`);
        }
        
        // Get new subscriber count
        const subscriberCount = await new Promise((resolve) => {
            rl.question(`Enter new subscriber count (current: ${currentStats.subscriberCount || 'Not set'}): `, (answer) => {
                resolve(answer.trim() || currentStats.subscriberCount);
            });
        });
        
        // Get new video count
        const videoCount = await new Promise((resolve) => {
            rl.question(`Enter new video count (current: ${currentStats.videoCount || 'Not set'}): `, (answer) => {
                resolve(answer.trim() || currentStats.videoCount);
            });
        });
        
        // Create new stats object
        const newStats = {
            subscriberCount: subscriberCount,
            videoCount: videoCount,
            lastUpdated: new Date().toISOString(),
            channelUrl: 'https://www.youtube.com/@MarioFabelo',
            method: 'manual-update'
        };
        
        // Write to file
        fs.writeFileSync(statsPath, JSON.stringify(newStats, null, 2));
        
        console.log('\n✅ Stats updated successfully!');
        console.log(`   Subscribers: ${newStats.subscriberCount}`);
        console.log(`   Videos: ${newStats.videoCount}`);
        console.log(`   Updated: ${new Date(newStats.lastUpdated).toLocaleString()}`);
        
        // Check if website needs to be refreshed
        console.log('\n💡 Your website will automatically display these new stats!');
        console.log('   If you want to see the changes immediately, refresh your website.');
        
    } catch (error) {
        console.error('❌ Error updating stats:', error.message);
    } finally {
        rl.close();
    }
}

// Run the function
updateStatsManually().catch(console.error);
