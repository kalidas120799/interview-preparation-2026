import { useContext, useEffect } from "react";
import { Routes, Route, redirect, useNavigate } from "react-router-dom"
import { UserContext } from "./context/UserContext"
import Home from "./page/Home";
import Login from "./page/Login";
import Posts from "./page/Posts";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Users from "./page/Users";

function App() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (userContext && userContext.userInfo) {
      if (!userContext.userInfo?.isLoggedIn) {
        navigate("/login")
      }
    }
  }, [])

  return (
    <>
      <Routes>
        <Route element={<Header />}>
          <Route index path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
