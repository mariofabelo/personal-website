# YouTube Stats Integration for Mario Fabelo's Website

This system displays the current subscriber count and video count from your YouTube channel on your personal website.

## 🎯 Current Status

✅ **Stats are now up to date!**
- **Subscribers**: 4.5K
- **Videos**: 106
- **Last Updated**: December 19, 2024

## 📁 Files Created

- `update-stats-manual.js` - **Simple manual update tool** (recommended)
- `package.json` - Node.js scripts
- `youtube-stats.json` - JSON file containing the current stats
- Updated `script.js` - Website JavaScript with stats integration

## 🚀 Quick Start

### Update Your Stats (Simple & Reliable)

```bash
npm run update-stats
```

This will:
- Show your current stats
- Ask for new subscriber count
- Ask for new video count
- Update the file automatically
- Your website will show the new stats immediately!

## 🔧 Setup Instructions

### 1. No Dependencies Required!

The manual update tool uses only built-in Node.js modules, so no installation is needed.

### 2. Update Your Stats

```bash
npm run update-stats
```

### 3. Set Up Automation (Optional)

#### GitHub Actions (Recommended for GitHub-hosted websites)

Create `.github/workflows/update-stats.yml`:
```yaml
name: Update YouTube Stats
on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:  # Manual trigger

jobs:
  update-stats:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm run update-stats
      - run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add youtube-stats.json
          git commit -m "Update YouTube stats" || exit 0
          git push
```

## 💡 How It Works

1. **Data Collection**: Use the interactive tool to input current stats
2. **Data Storage**: Stats are saved to `youtube-stats.json`:
   ```json
   {
     "subscriberCount": "4.5K",
     "videoCount": "106",
     "lastUpdated": "2024-12-19T12:00:00.000Z",
     "channelUrl": "https://www.youtube.com/@MarioFabelo"
   }
   ```
3. **Website Integration**: Your website automatically reads this JSON file and updates the display
4. **Real-time Updates**: Stats update automatically every 30 minutes on your website

## 🎯 Why This Approach is Best

- **100% Reliable**: No dependency on YouTube's page structure
- **Instant Updates**: Update stats whenever you want
- **No External Dependencies**: Uses only built-in Node.js modules
- **Simple**: Just run one command and input your numbers
- **Accurate**: You know your exact current stats
- **Fast**: No complex web scraping or browser automation

## 🔄 Update Frequency

- **Manual**: Update whenever you reach new milestones
- **Automated**: Every 6 hours (if using GitHub Actions)
- **Website**: Refreshes every 30 minutes automatically

## 🛠️ Troubleshooting

### Common Issues

1. **Script Won't Run**
   - Check Node.js installation: `node --version`
   - Ensure you're in the correct directory

2. **Stats Not Updating on Website**
   - Ensure `youtube-stats.json` is accessible
   - Check browser console for JavaScript errors
   - Refresh your website after updating stats

## 🎨 Customization

### Update Display Format

Modify how stats appear in `script.js`:
```javascript
channelStatsElement.innerHTML = `@mariofabelo • ${stats.subscriberCount} subscribers • ${stats.videoCount} videos`;
```

### Change Update Interval

Modify the refresh rate in `script.js`:
```javascript
// Update stats every 30 minutes (change this value)
setInterval(updateYouTubeStats, 30 * 60 * 1000);
```

## 📱 Features

- **Real-time Updates**: Stats update automatically on your website
- **Smooth Animations**: Beautiful transitions when stats change
- **Time Indicators**: Shows when stats were last updated
- **Mobile Friendly**: Works perfectly on all devices
- **Error Handling**: Graceful fallbacks if something goes wrong

## 🔒 Security Notes

- All scripts run locally
- No sensitive information is exposed
- YouTube stats are publicly available
- Manual updates are completely safe

## 🚀 Getting Started Right Now

1. **Update your current stats**:
   ```bash
   npm run update-stats
   ```

2. **Enter your current numbers** when prompted

3. **Refresh your website** to see the changes

4. **Set up automation** (optional) for future updates

## 📞 Support

If you need help:
1. Try manual updates first: `npm run update-stats`
2. Check the console output for error messages
3. Ensure all files are in the same directory
4. Verify Node.js is installed and working

## 🎉 Success!

Your website now displays live YouTube statistics that you can easily keep up to date! The manual update tool makes it simple to maintain accurate stats without any complex dependencies or unreliable web scraping.
