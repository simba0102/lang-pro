const express = require('express');
const router = express.Router();
const { titleConvo } = require('../../app/');
const { getConvo, saveConvo, getConvoTitle } = require('../../models');
const { getConvosByPage, deleteConvos, updateConvo } = require('../../models/Conversation');
const { getMessages } = require('../../models/Message');

router.get('/', async (req, res) => {
  const pageNumber = req.query.pageNumber || 1;
  res.status(200).send(await getConvosByPage(pageNumber));
});

router.post('/gen_title', async (req, res) => {
  const { conversationId } = req.body.arg;

  const convo = await getConvo(conversationId)
  const firstMessage = (await getMessages({ conversationId }))[0]
  const secondMessage = (await getMessages({ conversationId }))[1]

  // if (convo.title == 'New Chat') {
  //   const title = await titleConvo({
  //                   model: convo?.model,
  //                   message: firstMessage?.text,
  //                   response: JSON.stringify(secondMessage?.text || '')
  //                 });
  
  //   console.log('CONVERSATION TITLE', title);
  
  //   await saveConvo({
  //     conversationId,
  //     title
  //   })
  
  //   res.status(200).send(title);
  // } else 
  return res.status(200).send(convo.title);
});

router.post('/clear', async (req, res) => {
  let filter = {};
  const { conversationId } = req.body.arg;
  if (conversationId) {
    filter = { conversationId };
  }

  try {
    const dbResponse = await deleteConvos(filter);
    res.status(201).send(dbResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post('/update', async (req, res) => {
  const update = req.body.arg;

  try {
    const dbResponse = await updateConvo(update);
    res.status(201).send(dbResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
