import './Chat.css';

function Chat() {
  return (
    <div className="chat-container">
        <h2>Chat</h2>

        <div className="search-container">
            <input type="text" className="search-bar" placeholder="WWW"></input>
            <button className="search-icon">🔍</button>
        </div>
    </div>
  );
}
export default Chat;
