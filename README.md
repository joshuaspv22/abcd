Q4 Project Update Plan (March 26, 2025)

## Summary Description

For the Fourth Quarter, we will introduce a major update: the addition of a profile section. We will add a new webpage mainly for this, which will contain the user’s profile details and the log-in system (optional, but required for profile details). The profile details include username, password (hidden in asterisks), email (optional), date of birth (optional), and real name (optional). Along with this is the log-in option, where the user can log into a new account or an account (assuming he/she hasn’t yet). Take note, when the user presses the profile button without a logged-in account, the profile details will be left blank. When the user logs in, it will be filled with the username and password, while the other details are to be added manually by the user, and saved through the profile.

The main purpose is for the user’s data (ex. achievements page, days accessed) to be saved even if the user exits the browser. In other words, to enable persistent data storage. We added the username as a unique user-inputted ID, the password for security purposes, and the name, email, date of birth, and profile picture for data and personal information. When the user decides to log in, the system will ask for the user’s username and password, before being redirected to the website, where the persistent data is stored using the user’s account.

When the user exits the webpage, it will automatically log out of the account, mainly for security reasons. But when the user logs in, all the data that the user has saved on his account will be shown, including the achievements, lores, and days accessed.

Another feature is an achievement section. A dedicated page will be introduced for this, where users will receive badges for completing certain tasks (like the number of days logged in, game points scored, etc.). These badges will be posted in the achievements section and stored through the account, so even if the browser is closed, it will appear when the user logs in. It can only be removed if the user decides to delete it to achieve it again. All of this will be made possible through the log-in update. Furthermore, we will include art, past design achievements, and more, similar to a gallery. Take note, when the user fails to log in before earning an achievement, and then decides to leave, it will not be saved.

## JSON Implementation (Read in 'edit markdown' to see code properly)

#1. Log-in Page
Type of Data: User Account Data (Profile/Log-in)

Purpose: For user to have a personal profile in our website to store personalized data.

Structure in JSON Format:
"accounts": [
{
"username": "text-string",
"name": "text-string",
"password": "text-string",
"email": "email-formatted-text-string",
"dob": "YYYY-MM-DD",
"userProfilePic": "image-url"
}
]

#2. Achievements Page
Type of Data: Images and Text Data

Purpose: To store user-achieved badges with relevant details (date earned, name of achievement, etc.) in the achievements section, through the account. When the user reenters, the data will reappear in the achievements area.

Structure in JSON Format:
"accounts": [
{
"username": "text-string",
"name": "text-string",
"password": "text-string",
"email": "email-formatted-text-string",
"dob": "YYYY-MM-DD",
"userProfilePic": "image-url",
"achievements": [
{
"id": "number",
"name": "text-string",
"badgeURL": "image-url",
"dateAchieved": "string (YYYY-MM-DDTHH:MM:SSZ)"
},
{
"id": "number",
"name": "text-string",
"badgeURL": "image-url",
"dateAchieved": "string (YYYY-MM-DDTHH:MM:SSZ)"
}
]
}
]

## Wireframe Design

Wireframe Design:TBA (Waiting for further instructions)
![alt text](https://cdn.glitch.global/a141060a-d4e4-465b-82a4-de139674d3a4/38484460-ce59-4aa2-afbe-37d72b9b145c.image.png?v=1744033955808)
![alt text](https://cdn.glitch.global/a141060a-d4e4-465b-82a4-de139674d3a4/3ea61d50-73bb-4494-a074-c3667498ce8d.image.png?v=1744034094033)
![alt text](https://cdn.glitch.global/a141060a-d4e4-465b-82a4-de139674d3a4/8ac346c9-eb4d-4829-acf0-61b41116a217.image.png?v=1744034158490)
