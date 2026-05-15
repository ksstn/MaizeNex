# MaizeNex

MaizeNex is an AI-powered mobile application that detects nutrient deficiencies in corn leaves using deep learning and image processing. The system analyzes leaf images, identifies deficiency severity levels, and provides fertilizer recommendations to help farmers improve crop health and productivity.

# Features
- Enables detection of nutrient deficiencies in corn leaves through image capture or upload.
- Classifies the severity level of the detected deficiency to help prioritize actions.
- Provides recommended solutions and treatments based on the identified nutrient problem.
- Suggests fertilizer types and proper application methods, including suitable NPK formulations.
- Integrates API weather humidity data to support better decision-making in crop management.
- Offers a user-friendly interface for uploading images and viewing results instantly.
- Includes a community feed where users can share experiences, tips, and updates.
- Stores and organizes user data for easy tracking and monitoring of crop conditions.

# Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js
- AI/ML: Python, TensorFlow or PyTorch
- Image Processing: OpenCV
- API Integration: OpenWeather API
- Environment Management: .env file for secure API keys
- Tools: VS Code, npm, Git/GitHub

# OpenWeather API Setup Guide
- Step 1: Install Node.js
Node.js is required for the weather API feature of the system.

1. Go to the official Node.js website 
https://nodejs.org/en
2. Download the recommended version
Download v24.15.0 LTS
3. Open the Downloads section
In the navigation bar, click Downloads
4. Choose the installer
Select Windows Installer (.msi)
5. Install Node.js
Open the downloaded installer
Simply click Next until the installation finishes
Click Finish
6. Restart VS Code

After installation:
Close VS Code and open it again

7. Verify the installation
Open the VS Code terminal and type:
node -v

Press Enter.

Then type:
npm -v

If version numbers appear, the installation was successful.

- Step 2: Create Your Own OpenWeather API Key

1. Go to OpenWeather
https://openweathermap.org/

2. Create an account
Sign up using your email
Open the verification email sent by OpenWeather
Follow the instructions to activate your account

3. Get your API key
After logging in:

Go to your profile
Open My API Keys
You will see a default API key

You may also generate a new API key if you want.

NOTE: New API keys usually take a few minutes before becoming active.

- Step 3: Check if the API Key is Active

1. Open this link in your browser:
https://api.openweathermap.org/data/2.5/weather?q=Manila&appid=YOUR_API_KEY

2. Replace:
YOUR_API_KEY

with your actual API key.

Example:

https://api.openweathermap.org/data/2.5/weather?q=Manila&appid=abcd1234examplekey

Expected Result:
If your API key is active, you should see weather data displayed in JSON format.

If you receive an error like:
"Invalid API key"
"401 Unauthorized"

wait a few more minutes and try again.

- Step 4: Configure the Project

1. Inside the weather-app folder, create these files:

.env
.gitignore
Contents of .env
OPENWEATHER_API_KEY=your_api_key_here

2. Replace:
your_api_key_here

with your own API key.

Example:

OPENWEATHER_API_KEY=abcd1234examplekey
Contents of .gitignore
node_modules
.env

Why is .gitignore important?
The .gitignore file prevents sensitive files from being uploaded to GitHub.

This is important because:
the .env file contains your private API key
exposing API keys publicly can lead to unauthorized usage
excessive usage may result in charges or account issues