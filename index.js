const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const app = express();
const upload = multer({ dest: 'uploads/' });

const botToken = '6889451655:AAHye75Xv7yEC47am8CCwRsDISSYJ_6aqJs';
const chatId = -1001997886013;
const telegramApiUrl = `https://api.telegram.org/bot${botToken}`;

app.post('/', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const fileStream = fs.createReadStream(file.path);
    
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('document', fileStream, file.originalname);
    
    const response = await axios.post(`${telegramApiUrl}/sendDocument`, formData, {
      headers: {
        ...formData.getHeaders()
      },
    });

    if (response.status === 200) {
      res.send('File sent successfully!');
    } else {
      res.send('Failed to send the file.');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});