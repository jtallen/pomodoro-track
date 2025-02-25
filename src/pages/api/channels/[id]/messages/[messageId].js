export default function handler(req, res) {
  const { id, messageId } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid channel ID' });
  }

  if (typeof messageId !== 'string') {
    return res.status(400).json({ error: 'Invalid message ID' });
  }

  if (!global.messageStore) {
    global.messageStore = {};
  }

  if (!global.messageStore[id]) {
    return res.status(404).json({ error: 'Channel not found' });
  }

  const messageExists = global.messageStore[id].some((message) => {
    return String(message.id) === messageId;
  });

  if (!messageExists) {
    return res.status(404).json({ error: 'Message not found' });
  }

  if (req.method === 'DELETE') {
    try {
      const updatedMessages = global.messageStore[id].filter((message) => {
        return message.id.toString() !== messageId;
      });

      global.messageStore[id] = updatedMessages;

      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
