import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import group from "../../assets/group.png";
import profil from "../../assets/profil.png";
import { logout } from "../../utils/services";
import FriendsPage from "../Pages/Friends/FriendsPage";
import { capitalizeFirstLetter } from "../../utils/utils";
import "./Navbar.css";

const Navbar = () => {
  const [currentContact, setCurrentContact] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { userConnectedList, friendList} = useOutletContext();
  const username = JSON.parse(localStorage.getItem("user")).username;
  const userId = JSON.parse(localStorage.getItem("user")).id;

  const togglePopup = () => {
      setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-profile-section">
        <div className="navbar-profile-info">
          <img
            src={profil}
            alt="Profile"
            className="navbar-profile-image navbar-no-select-image"
          />
          <h4 className="navbar-profile-username">{capitalizeFirstLetter(username)}</h4>
        </div>
        <div className="navbar-profile-actions">
          <button
            className="navbar-profile-action-btn"
            onClick={() => logout()}
          >
            <i className="fas fa-sign-out-alt"></i>
          </button>
          <button
            className="navbar-profile-action-btn"
            onClick={togglePopup}
          >
            <i className="fas fa-user-plus"></i>
          </button>
        </div>
      </div>

      <div className="navbar-menu-section navbar-no-select">
        <h2 className="navbar-title-contacts">Discussions</h2>
        <hr className="navbar-hr navbar-section-hr"></hr>
      </div>

      <div className="navbar-menu-scroll navbar-no-select">
        <Link
          onClick={() => setCurrentContact(0)}
          to={`/chat`}
          className={`navbar-contact-card ${
            currentContact === 0 ? "navbar-active-contact" : ""
          }`}
        >
          <img
            src={group}
            alt="Contact"
            className="navbar-contact-image navbar-no-select-image"
          />
          <p>Global Chat</p>
        </Link>

        <hr className="navbar-hr navbar-scroll-hr"></hr>

        {friendList
          .filter((contact) => contact.id !== userId) // remove self from contact list
          .map((contact) => (
            <Link
              key={contact.id}
              onClick={() => setCurrentContact(contact.id)}
              to={`/chat/${contact.id}`}
              className={`navbar-contact-card ${
                currentContact === contact.id ? "navbar-active-contact" : ""
              }`}
            >
              <div className="navbar-contact-image-container">
                <img
                  src={profil}
                  alt="Contact"
                  className="navbar-contact-image navbar-no-select-image"
                />
                {userConnectedList.some((user) => user.id === contact.id) && (
                  <div className="navbar-contact-image-status-online"></div>
                )}
              </div>
              <p>{capitalizeFirstLetter(contact.username)}</p>
            </Link>
          ))}
      </div>
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            className="navbar-no-side-popup"
            initial={{ x: "-100%" }} // Start position (invisible)
            animate={{ x: 0 }} // Target position
            exit={{ x: "-100%" }} // Back to start position
            transition={{ duration: 0.2, ease: "easeInOut" }} // Animation duration and easing
          >
            <button className="navbar-add-friend-back-btn" onClick={togglePopup}>
              <i className="fas fa-arrow-left"></i>
            </button>
            <FriendsPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
