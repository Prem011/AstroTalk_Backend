const express = require('express');
const { producer } = require('../kafka');

const router = express.Router();

// Enqueue request
router.post('/enqueue', async (req, res) => {
  const { userId, requestData } = req.body; // Adjust based on your schema

  try {
    await producer.send({
      topic: 'request-queue',
      messages: [
        {
          value: JSON.stringify({ userId, requestData }),
        },
      ],
    });
    res.status(200).json({ message: 'Request enqueued successfully' });
  } catch (error) {
    console.error('Error enqueuing request:', error);
    res.status(500).json({ error: 'Failed to enqueue request' });
  }
});

module.exports = router;
