const express = require('express');
const router = express.Router();
const { titleConvo } = require('../../app/');
const { getConvo, saveConvo, getConvoTitle } = require('../../models');
const { getConvosByPage, deleteConvos } = require('../../models/Conversation');
const { getMessages } = require('../../models/Message');

router.get('/', async (req, res) => {
  const pageNumber = req.query.pageNumber || 1;
  res.status(200).send(await getConvosByPage(req?.session?.user?.username, pageNumber));
});

router.get('/:conversationId', async (req, res) => {
  const { conversationId } = req.params;
  const convo = await getConvo(req?.session?.user?.username, conversationId);

  if (convo) res.status(200).send(convo.toObject());
  else res.status(404).end();
});

router.post('/clear', async (req, res) => {
  let filter = {};
  const { conversationId, source } = req.body.arg;
  if (conversationId) {
    filter = { conversationId };
  }

  console.log('source:', source);

  if (source === 'button' && !conversationId) {
    return res.status(200).send('No conversationId provided');
  }

  try {
    const dbResponse = await deleteConvos(req?.session?.user?.username, filter);
    res.status(201).send(dbResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post('/update', async (req, res) => {
  const update = req.body.arg;

  try {
    const dbResponse = await saveConvo(req?.session?.user?.username, update);
    res.status(201).send(dbResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
