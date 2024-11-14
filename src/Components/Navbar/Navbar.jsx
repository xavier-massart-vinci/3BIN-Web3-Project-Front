import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import './Navbar.css';


const Navbar = () => {
    const [currentContact, setCurrentContact] = useState(0);
    const username = JSON.parse(localStorage.getItem("user")).username;
    const { userConnectedList } = useOutletContext();
    const userId = JSON.parse(localStorage.getItem("user")).id;

    console.log(userConnectedList)

    return (
        <div className="navbar">
            <div className="navbar-profile-section">
                <img src="/public/profil.png" alt="Profile" className="navbar-profile-image navbar-no-select-image" />
                <h4 className="navbar-profile-username">{username}</h4>
            </div>

            <div className="navbar-menu-section navbar-no-select">
                <h2 className="navbar-title-contacts">Contacts</h2>
                <hr className="navbar-hr navbar-section-hr"></hr>
            </div>

            <div className="navbar-menu-scroll navbar-no-select">
                <Link
                    onClick={() => setCurrentContact(0)} 
                    to={`/chat`}
                    className={`navbar-contact-card ${currentContact === 0 ? 'navbar-active-contact' : ''}`}
                >
                    <img src="/group.png" alt="Contact" className="navbar-contact-image navbar-no-select-image" />
                    <p>Global Chat</p>
                </Link>

                <hr className="navbar-hr navbar-scroll-hr"></hr>

                {userConnectedList
                .filter(contact => contact.user.id !== userId) // remove self from contact list
                .map((contact) => (
                    <Link 
                        key={contact.user.id} 
                        onClick={() => setCurrentContact(contact.user.id)} 
                        to={`/chat/${contact.user.id}`}
                        className={`navbar-contact-card ${currentContact === contact.user.id ? 'navbar-active-contact' : ''}`}
                    >
                        <img src="/profil.png" alt="Contact" className="navbar-contact-image navbar-no-select-image" />
                        <p>{contact.user.username}</p>
                    </Link>
                ))}

            </div>

        </div>
    );
};

export default Navbar;