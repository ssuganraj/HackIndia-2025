import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import LandingPage from "./Pages/LandingPage";
import NavBar from "./Components/NavBar/NavBar";
import DashBoardController from "./Pages/Dashboard/DashBoardController";
import Page404 from "./Pages/Page404";
import AirQualityPage from './Pages/AirQualityPage';
import AIChatBotPage from './Pages/AIChatBotPage';
import PaymentGatewayPage from './Pages/PaymentGatewayPage';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<LandingPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/signup" element={< SignUpPage/>}></Route>
              <Route path="/dashboard" element = {<DashBoardController />}></Route>
              <Route path="/page404" element = {<Page404 />} ></Route>
              <Route path="/airQuality" element= {<AirQualityPage />} ></Route>
              <Route path="/aiChatBot" element ={<AIChatBotPage />}></Route>
              <Route path="/payment" element ={< PaymentGatewayPage/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
