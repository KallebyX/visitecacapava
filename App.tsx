import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GamificationProvider } from './context/GamificationContext';

import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import TouristLayout from './components/layouts/TouristLayout';
import AdminLayout from './components/layouts/AdminLayout';
import HotelLayout from './components/layouts/HotelLayout';
import RestaurantLayout from './components/layouts/RestaurantLayout';

import HomePage from './pages/HomePage';
import RoutesPage from './pages/RoutesPage';
import ProfilePage from './pages/ProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';
import RouteDetailPage from './pages/RouteDetailPage';
import MapPage from './pages/MapPage';
import ItineraryPage from './pages/ItineraryPage';
import ChallengesPage from './pages/ChallengesPage';
import PhotoGalleryPage from './pages/PhotoGalleryPage';
import AboutCityPage from './pages/AboutCityPage';
import AttractionsPage from './pages/AttractionsPage';
import RestaurantsPage from './pages/RestaurantsPage';
import OliveOilsPage from './pages/OliveOilsPage';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageRoutesPage from './pages/admin/ManageRoutesPage';
import RouteEditor from './pages/admin/RouteEditor';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import ManagePoisPage from './pages/admin/ManagePoisPage';
import PoiEditor from './pages/admin/PoiEditor';
import ManageTouristsPage from './pages/admin/ManageTouristsPage';
import ManageChallengesPage from './pages/admin/ManageChallengesPage';
import HotelAnalyticsPage from './pages/admin/HotelAnalyticsPage';

import HotelDashboard from './pages/hotel/HotelDashboard';
import HotelCheckInPage from './pages/hotel/HotelCheckInPage';

import RestaurantDashboard from './pages/restaurant/RestaurantDashboard';

// Layouts
// import AdminLayout from './components/layouts/AdminLayout';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Admin (Secretaria) Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['secretaria']}>
                <AdminLayout>
                  <Outlet />
                </AdminLayout>
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="routes" element={<ManageRoutesPage />} />
            <Route path="routes/new" element={<RouteEditor />} />
            <Route path="routes/edit/:routeId" element={<RouteEditor />} />
            <Route path="pois" element={<ManagePoisPage />} />
            <Route path="pois/new" element={<PoiEditor />} />
            <Route path="pois/edit/:poiId" element={<PoiEditor />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="tourists" element={<ManageTouristsPage />} />
            <Route path="challenges" element={<ManageChallengesPage />} />
            <Route path="hotel-analytics" element={<HotelAnalyticsPage />} />
          </Route>

          {/* Hotel Routes */}
          <Route
            path="/hotel"
            element={
              <ProtectedRoute roles={['hotel']}>
                <HotelLayout>
                  <Outlet />
                </HotelLayout>
              </ProtectedRoute>
            }
          >
            <Route index element={<HotelDashboard />} />
            <Route path="checkin" element={<HotelCheckInPage />} />
          </Route>

          {/* Restaurant Routes */}
          <Route
            path="/restaurant"
            element={
              <ProtectedRoute roles={['restaurant']}>
                <RestaurantLayout>
                  <Outlet />
                </RestaurantLayout>
              </ProtectedRoute>
            }
          >
            <Route index element={<RestaurantDashboard />} />
          </Route>

          {/* Tourist Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute roles={['tourist']}>
                <GamificationProvider>
                  <TouristLayout>
                    <Outlet />
                  </TouristLayout>
                </GamificationProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="routes" element={<RoutesPage />} />
            <Route path="routes/:routeId" element={<RouteDetailPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="map" element={<MapPage />} />
            <Route path="itinerary" element={<ItineraryPage />} />
            <Route path="challenges" element={<ChallengesPage />} />
            <Route path="gallery" element={<PhotoGalleryPage />} />
            <Route path="about" element={<AboutCityPage />} />
            <Route path="attractions" element={<AttractionsPage />} />
            <Route path="restaurants" element={<RestaurantsPage />} />
            <Route path="olive-oils" element={<OliveOilsPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;