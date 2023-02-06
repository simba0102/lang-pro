const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  conversationId: {
    type: String,
    required: true
  },
  parentMessageId: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

module.exports = {
  saveMessage: async (message) => {
    const { id, conversationId, parentMessageId, sender, text } = message;
    await Message.create({
      id,
      conversationId,
      parentMessageId,
      sender,
      text
    });
  }
}