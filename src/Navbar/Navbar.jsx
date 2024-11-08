import { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

const contacts = [
    { id: 1, name: "Contact 1" },
    { id: 2, name: "Contact 2" },
    { id: 3, name: "Contact 3" },
    { id: 4, name: "Contact 4" },
    { id: 5, name: "Contact 5" },
    { id: 6, name: "Contact 6" },
    { id: 7, name: "Contact 7" },
    { id: 8, name: "Contact 8" },
    { id: 9, name: "Contact 9" },
    { id: 10, name: "Contact 10" },
    { id: 11, name: "Contact 11" },
    { id: 12, name: "Contact 12" },
    { id: 13, name: "Contact 13" },
    { id: 14, name: "Contact 14" },
    { id: 15, name: "Contact 15" },
    { id: 16, name: "Contact 16" },
    { id: 17, name: "Contact 17" },
    { id: 18, name: "Contact 18" },
    { id: 19, name: "Contact 19" },
    { id: 20, name: "Contact 20" },
    { id: 21, name: "Contact 21" },
    { id: 22, name: "Contact 22" },
    { id: 23, name: "Contact 23" },
    { id: 24, name: "Contact 24" },
    { id: 25, name: "Contact 25" },
    { id: 26, name: "Contact 26" },
    { id: 27, name: "Contact 27" },
    { id: 28, name: "Contact 28" },
    { id: 29, name: "Contact 29" },
    { id: 30, name: "Contact 30" },
    { id: 31, name: "Contact 31" },
    { id: 32, name: "Contact 32" },
    { id: 33, name: "Contact 33" },
    { id: 34, name: "Contact 34" },
    { id: 35, name: "Contact 35" },
    { id: 36, name: "Contact 36" },
    { id: 37, name: "Contact 37" },
    { id: 38, name: "Contact 38" },
    { id: 39, name: "Contact 39" },
    { id: 40, name: "Contact 40" },
    { id: 41, name: "Contact 41" },
    { id: 42, name: "Contact 42" },
    { id: 43, name: "Contact 43" },
];

const Navbar = () => {
    const [currentContact, setCurrentContact] = useState(0);

    return (
        <div className="navbar no-select">

            <div className="profile-section">
                <img src="/public/profil.png" alt="Profile" className="profile-image no-select-image" />
                <h4 className="profile-username">Username</h4>
            </div>

            <div className="menu-section">
                <h2 className="navbar-title-contacts">Contacts</h2>
                <hr className="section-hr"></hr>
            </div>

            <div className="menu-scroll">
                <Link
                    onClick={() => setCurrentContact(0)} 
                    to={`/contact/0`}
                    className={`contact-card ${currentContact === 0 ? 'active-contact' : ''}`}
                >
                    <img src="/group.png" alt="Contact" className="contact-image no-select-image" />
                    <p>Global Chat</p>
                </Link>

                <hr className="scroll-hr"></hr>

                {contacts.map((contact) => (
                    <Link 
                        key={contact.id} 
                        onClick={() => setCurrentContact(contact.id)} 
                        to={`/contact/${contact.id}`}
                        className={`contact-card ${currentContact === contact.id ? 'active-contact' : ''}`}
                    >
                        <img src="/profil.png" alt="Contact" className="contact-image no-select-image" />
                        <p>{contact.name}</p>
                    </Link>
                ))}

            </div>
       
        </div>
      );
};

export default Navbar;