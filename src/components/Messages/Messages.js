import { useEffect, useState } from 'react';
import styles from './Messages.module.css';
import { FaTimes } from 'react-icons/fa';

export default function Messages({ currentChannel }) {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const mySitePrefix = 'http://localhost:3000/api/channels/';

  const sendMessage = async () => {
    setIsSending(true);

    try {
      const response = await fetch(
        `${mySitePrefix}${currentChannel.id}/messages`,
        { method: 'POST', body: JSON.stringify({ message: currentMessage }) }
      );

      console.log(response);

      const parsedResponse = await response.json();

      const newMessages = [...messages, parsedResponse.message];

      setMessages(newMessages);

      setCurrentMessage('');
      setIsSending(false);
    } catch (error) {
      alert(error.message);

      setIsSending(false);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const response = await fetch(
        `${mySitePrefix}${currentChannel.id}/messages/${messageId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete message');
      }

      const newMessages = messages.filter((message) => {
        return message.id !== messageId;
      });

      setMessages(newMessages);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const exec = async () => {
      const response = await fetch(
        `${mySitePrefix}${currentChannel.id}/messages`
      );

      const parsed = await response.json();

      console.log(parsed);

      setMessages(parsed.messages);
    };

    exec();
  }, []);

  return (
    <>
      <textarea
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        disabled={isSending}
      />
      <button onClick={sendMessage} disabled={isSending}>
        Send
      </button>
      <div className={styles.messageList}>
        {messages.map((message) => {
          return (
            <div key={message.id} className={styles.message}>
              <button onClick={() => deleteMessage(message.id)}>
                <FaTimes />
              </button>
              <p>{message.content}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
