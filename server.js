const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = Number(process.env.PORT || 3000);
const backendOnly = String(process.env.BACKEND_ONLY || 'false') === 'true';

app.use(express.json({ limit: '20kb' }));

if (!backendOnly) {
  app.use(express.static(__dirname));
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function createTransporter() {
  return nodemailer.createTransport({
    host: requireEnv('SMTP_HOST'),
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE || 'true') === 'true',
    auth: {
      user: requireEnv('SMTP_USER'),
      pass: requireEnv('SMTP_PASS')
    }
  });
}

app.post('/api/rsvp', async (req, res) => {
  try {
    const fullname = String(req.body.fullname || '').trim();
    const notes = String(req.body.notes || '').trim();
    const mode = String(req.body.mode || 'wedding');
    const email = String(req.body.email || '').trim();
    const partySize = String(req.body.party_size || '1');
    const dietary = String(req.body.dietary || 'none');
    const eventSwayambar = String(req.body.event_swayambar || 'no');
    const eventReception = String(req.body.event_reception || 'no');
    const jantiTransport = String(req.body.janti_transport || 'no');
    const songSuggestion = String(req.body.song_suggestion || '').trim();

    if (!fullname) {
      return res.status(400).json({ message: 'Full name is required.' });
    }

    const submittedAt = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kathmandu',
      dateStyle: 'full',
      timeStyle: 'short'
    });

    const emailLines = [
      'Hello Abishmi & Shesh,',
      '',
      `A guest submitted an RSVP from the wedding website (${mode === 'reception' ? 'Reception Invite' : 'Wedding Invite'}).`,
      '',
      `Name: ${fullname}`
    ];

    if (mode === 'reception') {
      emailLines.push(`Email: ${email || 'Not provided'}`);
      emailLines.push(`Total Guests: ${partySize}`);
      
      let dietaryLabel = 'Standard Traditional Menu';
      if (dietary === 'veg') dietaryLabel = 'Traditional Nepalese Vegetarian Thali';
      if (dietary === 'non-veg') dietaryLabel = 'Traditional Nepalese Non-Veg Banquet';
      if (dietary === 'vegan') dietaryLabel = 'Strict Vegan / No Dairy';
      emailLines.push(`Dietary Preference: ${dietaryLabel}`);

      emailLines.push(`Attending Marriage Ceremony (July 1): ${eventSwayambar === 'yes' ? 'Yes' : 'No'}`);
      emailLines.push(`Attending Wedding Party (July 3): ${eventReception === 'yes' ? 'Yes' : 'No'}`);
      emailLines.push(`Janti Shuttle Service Required: ${jantiTransport === 'yes' ? 'Yes' : 'No'}`);
      emailLines.push(`Song Suggestion: ${songSuggestion || 'None'}`);
    }

    emailLines.push(`Blessings / Special Notes: ${notes || 'None'}`);
    emailLines.push(`Submitted: ${submittedAt} NPT`);
    emailLines.push('');

    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Wedding RSVP" <${process.env.RSVP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: requireEnv('RSVP_TO_EMAIL'),
      subject: `Wedding RSVP - ${fullname}`,
      text: emailLines.join('\n')
    });

    return res.json({ message: 'RSVP sent successfully.' });
  } catch (error) {
    console.error('RSVP email failed:', error);
    return res.status(500).json({ message: 'Unable to send RSVP right now.' });
  }
});

if (!backendOnly) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Wedding site running at http://localhost:${port}`);
});
