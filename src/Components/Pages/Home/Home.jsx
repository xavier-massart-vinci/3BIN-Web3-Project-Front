import AddFriend from "../../Friend/AddFriends.jsx";
import FriendList from "../../Friend/FriendList.jsx";

function Home() {
  return (
    <>
      <div>
        <p>Hello world , from Home</p>
        <AddFriend />
        <FriendList />
      </div>
    </>
  );
}
export default Home;
