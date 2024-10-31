import AddFriend from "./Components/Friend/AddFriends";
import FriendList from "./Components/Friend/FriendList";

const App = () => {
    return (
        <div>
            <h1>Chat Application</h1>
            <AddFriend />
            <FriendList />
        </div>
    );
};

export default App;
