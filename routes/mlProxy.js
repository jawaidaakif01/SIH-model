const express = require('express');
const http = require('http');
const https = require('https');
const { URL } = require('url');

const router = express.Router();


const ML_URL = process.env.ML_URL || 'http://127.0.0.1:5001/predict';

router.post('/predict', (req, res) => {
  try {
    const targetUrl = new URL(ML_URL);
    const lib = targetUrl.protocol === 'https:' ? https : http;

    const body = JSON.stringify(req.body || {});

    const options = {
      hostname: targetUrl.hostname,
      port: targetUrl.port || (targetUrl.protocol === 'https:' ? 443 : 80),
      path: targetUrl.pathname + (targetUrl.search || ''),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const proxyReq = lib.request(options, (proxyRes) => {
      let data = '';
      proxyRes.on('data', (chunk) => (data += chunk));
      proxyRes.on('end', () => {
        
        res.status(proxyRes.statusCode || 200);
        Object.keys(proxyRes.headers || {}).forEach((h) => {
          
          if (['transfer-encoding', 'content-length'].includes(h.toLowerCase())) return;
          res.setHeader(h, proxyRes.headers[h]);
        });
      
        try {
         
          const parsed = JSON.parse(data);
          res.json(parsed);
        } catch (e) {
          res.send(data);
        }
      });
    });

    proxyReq.on('error', (err) => {
      console.error('Error forwarding to ML service:', err);
      res.status(502).json({ error: 'Bad Gateway', details: err.message });
    });

    proxyReq.write(body);
    proxyReq.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
