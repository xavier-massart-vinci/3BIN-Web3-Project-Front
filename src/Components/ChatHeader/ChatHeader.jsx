import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import fetchFriends from "../../utils/friends";
import profil from "../../assets/profil.png";
import group from "../../assets/group.png";
import { capitalizeFirstLetter } from "../../utils/utils";
import "./ChatHeader.css";

function ChatHeader({ currentContact }) {
  const { userConnectedList } = useOutletContext();
  const { setFriendList} = useOutletContext();
  const [menuVisible, setMenuVisible] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const deleteFriend = (friendUsername) => {
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/friends/deleteFriend`,
        {
          username: friendUsername, 
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        fetchFriends(setFriendList);
        navigate('/chat');
      })
      .catch((error) => console.error("Error deleting friend:", error));
  };

  if (!currentContact) {
    return (
      <div className="chat-header">
        <div className="chat-header-contact">
          <div className="chat-header-profile">
            <img
              className="chat-header-profile-picture"
              src={group}
              alt="Chat logo"
            />
            <span className="profile-name">Chat Global</span>
          </div>
        </div>
      </div>
    );
  }

  const isOnline = userConnectedList.some(
    (user) => user.id === currentContact.id
  );

  return (
    <div className="chat-header">
      <div className="chat-header-contact">
        <div className="chat-header-profile">
          <img
            className="chat-header-profile-picture"
            src={profil}
            alt="Chat logo"
          />
          <span className="profile-name">{capitalizeFirstLetter(currentContact.username)}</span>
        </div>
        <div className="chat-header-status">
          <span
            className={`chat-header-status-indicator ${
              isOnline ? "online" : "offline"
            }`}
          ></span>
          <span className="chat-header-status-text">
            {isOnline ? "En ligne" : "Hors ligne"}
          </span>
        </div>
      </div>

      <div className="chat-header-settings">
        <button className="chat-header-settings-button" onClick={toggleMenu}>
          <i className="fas fa-cog"></i>
        </button>
        {menuVisible && (
          <div className="chat-header-settings-menu">
            <button onClick={() => deleteFriend(currentContact.username)}>
              Retirer de tes ami
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatHeader;
