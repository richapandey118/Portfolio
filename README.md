# Richa Pandey's Portfolio

A personal portfolio website showcasing skills, projects, and contact information.

## Features

- Fully responsive design that works on all devices
- Modern UI with smooth animations and transitions
- Interactive sections for education, projects, and skills
- Contact form for easy communication
- Mobile-friendly navigation

## Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- JavaScript (ES6+)
- Font Awesome for icons
- Google Fonts

## Setup Instructions

### Prerequisites
- Node.js (v12 or higher)
- npm (comes with Node.js)

### Installation
1. Clone or download this repository
2. Navigate to the project directory in your terminal
3. Install the dependencies:
   ```
   npm install
   ```

### Configure Email Functionality
1. Open `server.js` file
2. Find the email configuration section:
   ```javascript
   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: 'your-email@gmail.com', // Replace with your email
       pass: 'your-password' // Replace with your password or app password
     }
   });
   ```
3. Replace `'your-email@gmail.com'` with the Gmail account you want to use for sending emails
4. Replace `'your-password'` with your password

**Important Note about Gmail**:
- For security reasons, Gmail may block login attempts from apps that don't use modern security standards
- You'll need to create an "App Password" for your Gmail account:
  1. Go to your Google Account → Security → 2-Step Verification (make sure it's enabled)
  2. Scroll down to "App passwords" and create a new app password
  3. Use this generated password in your server.js file instead of your regular Gmail password

### Running the Server
Start the server with:
```
npm start
```

For development with auto-restart on file changes:
```
npm run dev
```

The server will run on http://localhost:3000 by default.

### Troubleshooting

#### 'node' is not recognized as an internal or external command
If you see this error when trying to run `npm start`, it means Node.js is not installed or not in your system PATH. To fix this:

1. **Install Node.js**:
   - Download and install Node.js from [nodejs.org](https://nodejs.org/)
   - Choose the LTS (Long Term Support) version for stability
   - Run the installer and follow the installation steps (make sure to check the option to add to PATH)

2. **Verify Installation**: After installation, restart your terminal/command prompt and verify Node.js is installed:
   ```
   node --version
   npm --version
   ```

3. **If Node.js is already installed but not working**:
   - It might not be in your PATH. You can try:
     - Using the full path to node: `C:\Program Files\nodejs\node server.js`
     - Or adding Node.js to your PATH manually:
       1. Search for "Environment Variables" in Windows
       2. Edit the PATH variable and add the Node.js installation directory (typically `C:\Program Files\nodejs\`)
       3. Restart your terminal

4. **Alternative start command**:
   If you know where Node.js is installed, you can run the server directly:
   ```
   C:\path\to\node.exe server.js
   ```

## Project Structure

- `index.html` - Main HTML file
- `styles.css` - CSS styles for the website
- `script.js` - JavaScript for interactive elements
- `README.md` - This file

## Customization

To personalize this portfolio:

1. Replace the personal information in `index.html`
2. Modify the styles in `styles.css` to change colors, fonts, etc.
3. Add your own projects to the projects section
4. Update your skills in the skills section
5. Set up form submission to receive emails (requires server-side implementation)

## Contact

For any questions or suggestions, please reach out to Richa Pandey:
- Email: richapandey684@gmail.com
- Phone: +91 8468054740

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact Form Functionality
The contact form sends messages to the email address specified in the server.js file. When someone submits the form:

1. The data is sent to the backend server
2. The server processes the form data using Nodemailer
3. An email is sent to your specified email address with the message details
4. The user is notified of the success or failure of the message submission 