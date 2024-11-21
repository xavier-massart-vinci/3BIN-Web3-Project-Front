import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Outlet } from "react-router-dom";
import { socket } from "../../../socket";
import { useJustRegister } from "../../../utils/services";
import Loading from "../../Loading/Loading";
import fetchUsers from "../../../utils/users";
import fetchFriends from '../../../utils/friends';
import "./Home.css";

Modal.setAppElement("#root");

function Home() {
  const [friendList, setFriendList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [userConnectedList, setUserConnectedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(useJustRegister);

  // Listen to the server
  useEffect(() => {
    const handleUserDiscoveryInit = (usersConnectedTable) => {
      setUserConnectedList(usersConnectedTable);
      setLoading(false);
    };

    const handleUserDiscovery = (user) => {
      setUserConnectedList((prev) => [...prev, user]);
    };

    const handleUserDisconnect = (user) => {
      setUserConnectedList((prev) => prev.filter((u) => u.id !== user.id));
    };

    const handleFriendAdded = () => {
      fetchFriends(setFriendList);
    };

    socket.on("userDiscoveryInit", handleUserDiscoveryInit);
    socket.on("userDiscovery", handleUserDiscovery);
    socket.on("userDisconnect", handleUserDisconnect);
    socket.on("friendAdded", handleFriendAdded);
    socket.on("friendRemoved", handleFriendAdded);

    return () => {
      socket.off("userDiscoveryInit", handleUserDiscoveryInit);
      socket.off("userDiscovery", handleUserDiscovery);
      socket.off("userDisconnect", handleUserDisconnect);
      socket.off("friendAdded", handleFriendAdded);
      socket.off("friendRemoved", handleFriendAdded);
    };
  }, []);

  // Fetch friend list from API
  useEffect(() => {
    fetchFriends(setFriendList);
    fetchUsers(setUsersList);
  }, []);

  const context = {
    userConnectedList,
    friendList,
    setFriendList,
    usersList,
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            className="modal-content"
            overlayClassName="modal-overlay"
          >
            <h1>Avis aux utilisateurs</h1>
            <p>
              Nous vous rappelons de respecter le{" "}
              <strong>règlement de la Haute École Léonard de Vinci</strong>.
              Cette application a été réalisée par <strong>le groupe 16</strong>{" "}
              dans le cadre d’un <strong>proof of concept</strong> académique.
            </p>
            <p>
              Utilisez-la de manière responsable et conforme aux valeurs de
              notre établissement.
            </p>
            <p>
              Pour toute demande de suppression de compte, contactez-nous à
              l’adresse suivante : <strong>support@echoes-vinci.xyz</strong>.
            </p>
            <p>Merci pour votre collaboration.</p>
            <p>
              <strong>Groupe 16</strong>
            </p>
            <button
              onClick={() => setModalIsOpen(false)}
              className="modal-close-button"
            >
              Fermer
            </button>
          </Modal>

          <Outlet context={context} />
        </>
      )}
    </>
  );
}

export default Home;
