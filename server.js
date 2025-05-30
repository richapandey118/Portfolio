const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// File to store messages
const MESSAGES_FILE = path.join(__dirname, 'contact_messages.txt');

// Check if messages file exists, create it if not
if (!fs.existsSync(MESSAGES_FILE)) {
  fs.writeFileSync(MESSAGES_FILE, '# Contact Messages\n\n');
  console.log('Created messages file:', MESSAGES_FILE);
}

// Read existing messages and display on server start
try {
  const messages = fs.readFileSync(MESSAGES_FILE, 'utf8');
  console.log('\n==== RECEIVED MESSAGES ====\n');
  console.log(messages);
  console.log('==== END OF MESSAGES ====\n');
} catch (err) {
  console.error('Error reading messages file:', err);
}

// Middleware - IMPORTANT: Order matters here
app.use(cors({ origin: '*' })); // Allow all origins for testing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Debug middleware - Log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  if (req.body && Object.keys(req.body).length) {
    console.log('Request body:', req.body);
  }
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, '/')));

// Route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to view messages in browser
app.get('/view-messages', (req, res) => {
  if (fs.existsSync(MESSAGES_FILE)) {
    try {
      const messages = fs.readFileSync(MESSAGES_FILE, 'utf8');
      res.send(`
        <html>
          <head>
            <title>Contact Messages</title>
            <style>
              body { font-family: sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
              pre { background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap; }
              h1 { color: #333; }
            </style>
          </head>
          <body>
            <h1>Contact Messages</h1>
            <p>These are all the messages received through your contact form:</p>
            <pre>${messages}</pre>
          </body>
        </html>
      `);
    } catch (err) {
      res.status(500).send('Error reading messages file');
    }
  } else {
    res.status(404).send('No messages file found');
  }
});

// API endpoint to handle form submission
app.post('/api/contact', (req, res) => {
  console.log('\n🔔 NEW MESSAGE RECEIVED! 🔔');
  console.log('Received contact form submission:', req.body);
  
  const { name, email, message } = req.body;
  
  // Validate inputs
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide name, email and message' 
    });
  }
  
  // Still save to file as backup
  const messageData = `
=== New Message ===
Date: ${new Date().toLocaleString()}
Name: ${name}
Email: ${email}
Message: ${message}
===================

`;

  try {
    fs.appendFileSync(MESSAGES_FILE, messageData);
    console.log('✅ Message saved to file:', MESSAGES_FILE);
  } catch (err) {
    console.error('Error saving message to file:', err);
  }

  // Create email transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'richapandey684@gmail.com', // Your Gmail email
      pass: 'xxxx xxxx xxxx xxxx' // Replace with your 16-character Google App Password
    }
  });
  
  // Email options
  const mailOptions = {
    from: `"Portfolio Contact" <richapandey684@gmail.com>`,
    to: 'richapandey684@gmail.com', // Your email where you want to receive messages
    subject: `Portfolio Contact Form: Message from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      
      Message:
      ${message}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `
  };
  
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      console.log('💡 Message was still saved to file and can be viewed at /view-messages');
      return res.status(200).json({ 
        success: true, 
        message: 'Message saved. Email delivery failed, but your message was received.'
      });
    }
    
    console.log('✉️ Email sent:', info.response);
    res.status(200).json({ success: true, message: 'Message sent successfully' });
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📁 Open http://localhost:${PORT} in your browser to view your portfolio`);
  console.log(`📝 View messages at http://localhost:${PORT}/view-messages`);
}); 