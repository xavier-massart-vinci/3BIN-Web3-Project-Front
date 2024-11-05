import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate  = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      navigate('/login');
    }
  }, [navigate]);
  
  return (
    <>
      <div>
        <p>Hello world , from Home</p>
      </div>
    </>
  );
}
export default Home;
