import React, { useEffect, useRef, Suspense } from "react"; // 1. Import Suspense
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { setCredentials } from "./features/auth/authSlice";
import MainLayout from "./layout/MainLayout";
import ChatWidget from "./pages/ChatBot/ChatWidget";

// --- HOMEPAGE COMPONENTS ---
import HeroSection from "./pages/user/HeroSection";
import HomeAbout from "./pages/AboutHome";
import MediaFinder from "./pages/MediaFinder";
import ServicesSection from "./pages/ServicesSection";
import ConnectSection from "./pages/ConnectSection";
import AdEspressoSection from "./pages/AdEspressoSection";
import LatestBlogsSection from "./pages/LatestBlogSection";

// --- LAZY-LOADED PAGE COMPONENTS ---
// 2. Define all page components using React.lazy
const AboutUs = React.lazy(() => import("./pages/user/About"));
const Media = React.lazy(() => import("./pages/user/Media"));
const ATLMarketing = React.lazy(() => import("./pages/Media/ATL/ATL"));
const Unipoles = React.lazy(() => import("./pages/Media/ATL/Unipoles"));
const BusBranding = React.lazy(() => import("./pages/Media/ATL/BusBranding"));
const BusStand = React.lazy(() => import("./pages/Media/ATL/BusStand"));
const AutoBranding = React.lazy(() => import("./pages/Media/ATL/AutoBranding"));
const CityGanteries = React.lazy(() => import("./pages/Media/ATL/CityGanteries"));
const KiosksAdvertisements = React.lazy(() => import("./pages/Media/ATL/KiosksAdvertisements"));
const CityMallAdvertisements = React.lazy(() => import("./pages/Media/ATL/CityMallAdvertisements"));
const VanActivity = React.lazy(() => import("./pages/Media/ATL/VanActivity"));
const PetrolPumps = React.lazy(() => import("./pages/Media/ATL/PetrolPumps"));
const WallWraps = React.lazy(() => import("./pages/Media/ATL/WallWraps"));
const WallPaintings = React.lazy(() => import("./pages/Media/ATL/WallPaintings"));
const IndianRailwayTrainsStations = React.lazy(() => import("./pages/Media/ATL/IndianRailwayTrainsStations"));
const MetroTrainsStations = React.lazy(() => import("./pages/Media/ATL/MetroTrainsStations"));
const AirportAdvertisements = React.lazy(() => import("./pages/Media/ATL/AirportAdvertisements"));
const NewspaperAdvertisements = React.lazy(() => import("./pages/Media/ATL/NewspaperAdvertisements"));
const TelevisionAdvertisements = React.lazy(() => import("./pages/Media/ATL/TelevisionAdvertisements"));
const FMRadioAdvertisements = React.lazy(() => import("./pages/Media/ATL/FMRadioAdvertisements"));
const BTLMarketing = React.lazy(() => import("./pages/Media/BTL/BTL"));
const CinemaAdvertising = React.lazy(() => import("./pages/Media/BTL/CinemaAdvertising"));
const DhabaBranding = React.lazy(() => import("./pages/Media/BTL/DhabaBranding"));
const EventBrandings = React.lazy(() => import("./pages/Media/BTL/EventBrandings"));
const LookWalker = React.lazy(() => import("./pages/Media/BTL/LookWalker"));
const PoleSunpacks = React.lazy(() => import("./pages/Media/BTL/PoleSunpacks"));
const RetailBranding = React.lazy(() => import("./pages/Media/BTL/RetailBranding"));
const SeminarsBranding = React.lazy(() => import("./pages/Media/BTL/SeminarsBranding"));
const TrafficBarricades = React.lazy(() => import("./pages/Media/BTL/TrafficBarricades"));
const TTLMarketing = React.lazy(() => import("./pages/Media/TTL/TTL"));
const BrandCollaboration = React.lazy(() => import("./pages/Media/TTL/BrandCollaboration"));
const EmailWhatsappMarketing = React.lazy(() => import("./pages/Media/TTL/EmailWhatsappMarketing"));
const MallInsideLedAds = React.lazy(() => import("./pages/Media/TTL/MallInsideLedAds"));
const McLedHoardingsAds = React.lazy(() => import("./pages/Media/TTL/McLedHoardingsAds"));
const SocialMediaAdvertising = React.lazy(() => import("./pages/Media/TTL/SocialMediaAdvertising"));
const GoogleAds = React.lazy(() => import("./pages/Media/TTL/GoogleAds"));
const Blogs = React.lazy(() => import("./pages/Resources/Blogs"));
const BlogDetailPage = React.lazy(() => import("./pages/Resources/BlogDetail/BlogDetailPage"));
const Products = React.lazy(() => import("./pages/Resources/Products"));
const Compaigns = React.lazy(() => import("./pages/user/Compaigns"));
const Career = React.lazy(() => import("./pages/user/Career"));
const JobPosition = React.lazy(() => import("./pages/user/JobPosition"));
const ContactUs = React.lazy(() => import("./pages/Forms/ContactUs"));
const AdminPanel = React.lazy(() => import("./pages/Admin/AdminPanel"));
const AuthForm = React.lazy(() => import("./pages/Forms/AuthForm"));
const RegisterForm = React.lazy(() => import("./pages/Forms/RegisterForm"));
const ResetPasswordForm = React.lazy(() => import("./pages/Forms/ResetPasswordForm"));


// --- ADMIN AUTH & SESSION MANAGEMENT (No changes) ---
const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (!userInfo) { return <Navigate to="/login" replace />; }
  const isAdmin = userInfo.role === "admin" || userInfo.role === "superAdmin";
  return isAdmin ? <Suspense fallback={<div>Loading...</div>}><AdminPanel /></Suspense> : <Navigate to="/" replace />;
};

const GuestRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  if (userInfo && (userInfo.role === "admin" || userInfo.role === "superAdmin")) {
    return <Navigate to="/admin" replace />;
  }
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

const SessionManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const previousUserInfoRef = useRef(userInfo);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      try {
        const user = jwtDecode(token);
        dispatch(setCredentials({ user, token }));
      } catch (error) {
        console.error("Failed to decode token, logging out:", error);
        localStorage.removeItem("adminToken");
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (previousUserInfoRef.current && !userInfo) { navigate('/login'); }
    previousUserInfoRef.current = userInfo;
  }, [userInfo, navigate]);

  return null;
};

// --- HOMEPAGE COMPONENT ---
const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AdEspressoSection />
      <HomeAbout />
      <MediaFinder />
      <ServicesSection />
      <ConnectSection />
      <LatestBlogsSection />
    </>
  );
};

// --- UPDATED ROUTER ---
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <MainLayout />
        <ToastContainer theme="colored" />
        <ChatWidget />
        <SessionManager />
      </>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutUs /> },
      {
        path: "media",
        children: [
          { index: true, element: <Media /> },
          { path: "ATL", element: <ATLMarketing /> },
          { path: "ATL/unipoles", element: <Unipoles /> },
          { path: "ATL/bus-branding", element: <BusBranding /> },
          { path: "ATL/bus-stands", element: <BusStand /> },
          { path: "ATL/auto-branding", element: <AutoBranding /> },
          { path: "ATL/city-gantries", element: <CityGanteries /> },
          { path: "ATL/kiosks", element: <KiosksAdvertisements /> },
          { path: "ATL/mall-ads", element: <CityMallAdvertisements /> },
          { path: "ATL/van-activity", element: <VanActivity /> },
          { path: "ATL/petrol-pumps", element: <PetrolPumps /> },
          { path: "ATL/wall-wraps", element: <WallWraps /> },
          { path: "ATL/wall-paintings", element: <WallPaintings /> },
          { path: "ATL/railway-ads", element: <IndianRailwayTrainsStations /> },
          { path: "ATL/metro-ads", element: <MetroTrainsStations /> },
          { path: "ATL/airport-ads", element: <AirportAdvertisements /> },
          { path: "ATL/newspaper-ads", element: <NewspaperAdvertisements /> },
          { path: "ATL/tv-ads", element: <TelevisionAdvertisements /> },
          { path: "ATL/radio-ads", element: <FMRadioAdvertisements /> },
          { path: "BTL", element: <BTLMarketing /> },
          { path: "BTL/cinema-advertising", element: <CinemaAdvertising /> },
          { path: "BTL/dhaba-advertising", element: <DhabaBranding /> },
          { path: "BTL/event-branding", element: <EventBrandings /> },
          { path: "BTL/look-walker", element: <LookWalker /> },
          { path: "BTL/pole-sunpacks", element: <PoleSunpacks /> },
          { path: "BTL/retail-branding", element: <RetailBranding /> },
          { path: "BTL/seminars-branding", element: <SeminarsBranding /> },
          { path: "BTL/traffic-barricades", element: <TrafficBarricades /> },
          { path: "TTL", element: <TTLMarketing /> },
          { path: "TTL/brand-collaboration", element: <BrandCollaboration /> },
          { path: "TTL/email-whatsapp-marketing", element: <EmailWhatsappMarketing /> },
          { path: "TTL/mall-inside-led", element: <MallInsideLedAds /> },
          { path: "TTL/mc-led-hoardings", element: <McLedHoardingsAds /> },
          { path: "TTL/social-media-ads", element: <SocialMediaAdvertising /> },
          { path: "TTL/google-ads", element: <GoogleAds /> },
        ],
      },
      {
        path: "resources",
        children: [
          { path: "blogs", element: <Blogs /> },
          { path: "blogs/:id", element: <BlogDetailPage /> },
          { path: "products", element: <Products /> },
        ],
      },
      { path: "campaigns", element: <Compaigns /> },
      { path: "career", element: <Career /> },
      { path: "JobPosition", element: <JobPosition /> },
      { path: "contact", element: <ContactUs /> },
      { path: "login", element: <GuestRoute><AuthForm /></GuestRoute> },
      { path: "register", element: <GuestRoute><RegisterForm /></GuestRoute> },
      { path: "forgot-password", element: <GuestRoute><ResetPasswordForm /></GuestRoute> },
      { path: "admin", element: <AdminRoute /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={AppRouter} />;
}

export default App;

