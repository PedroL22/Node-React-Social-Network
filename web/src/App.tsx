import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import { useSelector } from "react-redux";
import MyProfile from "./pages/MyProfile";
import { queryClient } from "./services/queryClient";
import { QueryClientProvider } from "react-query";

function App() {
  const isAuth = Boolean(useSelector((state: any) => state.token));

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={isAuth ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuth ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/profile"
            element={isAuth ? <MyProfile /> : <Navigate to="/" />}
          />
          <Route path="/user/:userId" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
