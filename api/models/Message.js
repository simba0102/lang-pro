const Message = require('./schema/messageSchema');
module.exports = {
  Message,
  saveMessage: async ({
    messageId,
    newMessageId,
    conversationId,
    parentMessageId,
    sender,
    text,
    isCreatedByUser = false,
    error,
    unfinished,
    cancelled
  }) => {
    try {
      // may also need to update the conversation here
      await Message.findOneAndUpdate(
        { messageId },
        {
          messageId: newMessageId || messageId,
          conversationId,
          parentMessageId,
          sender,
          text,
          isCreatedByUser,
          error,
          unfinished,
          cancelled
        },
        { upsert: true, new: true }
      );
      return { messageId, conversationId, parentMessageId, sender, text, isCreatedByUser };
    } catch (error) {
      console.error(error);
      return { message: 'Error saving message' };
    }
  },
  deleteMessagesSince: async ({ messageId, conversationId }) => {
    try {
      const message = await Message.findOne({ messageId }).exec();

      if (message)
        return await Message.find({ conversationId })
          .deleteMany({ createdAt: { $gt: message.createdAt } })
          .exec();
    } catch (error) {
      console.error(error);
      return { message: 'Error deleting messages' };
    }
  },
  getMessages: async (filter) => {
    try {
      return await Message.find(filter).sort({ createdAt: 1 }).exec();
    } catch (error) {
      console.error(error);
      return { message: 'Error getting messages' };
    }
  },
  deleteMessages: async (filter) => {
    try {
      return await Message.deleteMany(filter).exec();
    } catch (error) {
      console.error(error);
      return { message: 'Error deleting messages' };
    }
  }
};
