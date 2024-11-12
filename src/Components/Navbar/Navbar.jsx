import { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

const contacts = [
    { id: 2, name: "Contact 2" },
    { id: 3, name: "Contact 3" },
    { id: 4, name: "Contact 4" },
];

const Navbar = () => {
    const [currentContact, setCurrentContact] = useState(0);

    return (
        <div className="navbar">
            <div className="navbar-profile-section">
                <img src="/public/profil.png" alt="Profile" className="navbar-profile-image navbar-no-select-image" />
                <h4 className="navbar-profile-username">Username</h4>
            </div>

            <div className="navbar-menu-section navbar-no-select">
                <h2 className="navbar-title-contacts">Contacts</h2>
                <hr className="navbar-hr navbar-section-hr"></hr>
            </div>

            <div className="navbar-menu-scroll navbar-no-select">
                <Link
                    onClick={() => setCurrentContact(0)} 
                    to={`/chat/0`}
                    className={`navbar-contact-card ${currentContact === 0 ? 'navbar-active-contact' : ''}`}
                >
                    <img src="/group.png" alt="Contact" className="navbar-contact-image navbar-no-select-image" />
                    <p>Global Chat</p>
                </Link>

                <hr className="navbar-hr navbar-scroll-hr"></hr>

                {contacts.map((contact) => (
                    <Link 
                        key={contact.id} 
                        onClick={() => setCurrentContact(contact.id)} 
                        to={`/chat/${contact.id}`}
                        className={`navbar-contact-card ${currentContact === contact.id ? 'navbar-active-contact' : ''}`}
                    >
                        <img src="/profil.png" alt="Contact" className="navbar-contact-image navbar-no-select-image" />
                        <p>{contact.name}</p>
                    </Link>
                ))}

            </div>

        </div>
    );
};

export default Navbar;