export default function handler(req, res) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid channel ID' });
  }

  if (!global.messageStore) {
    global.messageStore = {};
  }

  if (!global.messageStore[id]) {
    global.messageStore[id] = [];
  }

  if (req.method === 'GET') {
    return res.status(200).json({ messages: global.messageStore[id] });
  }

  if (req.method === 'POST') {
    try {
      const { message } = JSON.parse(req.body);

      if (!message) {
        return res.status(400).json({ error: 'Message ' });
      }

      const newMessage = {
        id: global.messageStore[id].length + 1, // this is bad, switch to UUID
        content: message,
      };

      global.messageStore[id].push(newMessage);

      return res.status(201).json({ message: newMessage });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
