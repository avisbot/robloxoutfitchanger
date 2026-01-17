# Roblox Outfit Changer 👕

Created by https://discord.gg/donda

Automatically cycle through multiple Roblox outfits at your desired interval. Perfect for keeping your avatar fresh!

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) installed on your computer
- A Roblox account with saved outfits
- Your Roblox `.ROBLOSECURITY` cookie

## 🚀 Installation

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/avisbot/robloxoutfitchanger.git
   cd robloxoutfitchanger
   ```

2. **Install dependencies**
   ```bash
   npm install axios
   ```

## 🔧 Configuration

### Step 1: Get Your Outfit IDs


**Using the Avis Bot (Recommended)**
1. Go to [supers.lol/avis/invite](https://supers.lol/avis/invite)
2. Add the Avis bot to your Discord server or install it as an application (bot can not access your account in any way)
3. Use the command: `/outfits [your_roblox_username]`
4. **Important:** Your Roblox inventory must be public to view outfits


### Step 2: Get Your .ROBLOSECURITY Cookie

> ⚠️ **Warning**: Never share your `.ROBLOSECURITY` cookie with anyone! It gives full access to your account.

**Chrome/Edge:**
1. Go to [roblox.com](https://www.roblox.com) and log in
2. Press `F12` or `CTRL` + `Shift` + `I` to open Developer Tools
3. Go to the **Application** tab
4. In the left sidebar, expand **Cookies** and click on `https://www.roblox.com`
5. Find `.ROBLOSECURITY` in the list
6. Copy the entire value (starts with `_|WARNING:-DO...`)

**Firefox:**
1. Go to [roblox.com](https://www.roblox.com) and log in
2. Press `F12` or `CTRL` + `Shift` + `I` to open Developer Tools
3. Go to the **Storage** tab
4. Expand **Cookies** and click on `https://www.roblox.com`
5. Find `.ROBLOSECURITY` and copy the value

### Step 3: Configure the Script

Open the script file and edit the following variables:

```javascript
const outfitids = [
  12345678, 12345678, 1234678 // put ids here seperated by commas, no limit
]

const interval = 1000 // Time between changes in milliseconds (1000 = 3 seconds)

const cookie = ".ROBLOSECURITY=inputcookie" // Paste your cookie here
```

**Configuration Options:**
- `outfitids`: Array of outfit IDs (no limit, add as many as you want)
- `interval`: Time in milliseconds between outfit changes
  - 1000 ms = 1 second
  - 3000 ms = 3 seconds
  - 60000 ms = 1 minute

## ▶️ Usage

Run the script with:
```bash
node change.js
```

The script will:
1. Load all your specified outfits
2. Start cycling through them at your set interval
3. Continue running until you stop it (press `Ctrl+C`)

## 🛠️ How It Works

The script automatically:
- Fetches outfit details from Roblox's API
- Applies each outfit component (body colors, avatar type, scales, and assets)
- Retries up to 3 times if server errors (500-599) occur
- Handles CSRF token refreshing automatically
- Continues to the next request if one fails after retries

## ⚠️ Important Notes

- **Keep your `.ROBLOSECURITY` cookie private** - treat it like a password
- Make sure your outfit inventory is public when fetching outfit IDs
- The script requires an active internet connection
- Don't set the interval too low (recommended minimum: 1000ms)
- Press `Ctrl+C` to stop the script

## 🐛 Troubleshooting

**"Cannot find module 'axios'"**
- Run `npm install axios`

**Outfits not changing**
- Verify your cookie is correct and hasn't expired
- Check that outfit IDs are valid
- Ensure your internet connection is stable

**403 Errors**
- Your cookie may have expired - get a new one
- Your account may have security restrictions

## 📝 License

MIT License - feel free to modify and use as you wish!

## ⚠️ Disclaimer

This tool is for educational purposes. Use at your own risk. The author is not responsible for any account actions taken by Roblox. Always follow Roblox's Terms of Service.
