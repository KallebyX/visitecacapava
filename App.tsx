import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GamificationProvider } from './context/GamificationContext';

import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import TouristLayout from './components/layouts/TouristLayout';
import AdminLayout from './components/layouts/AdminLayout';
import HotelLayout from './components/layouts/HotelLayout';

import HomePage from './pages/HomePage';
import RoutesPage from './pages/RoutesPage';
import ProfilePage from './pages/ProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';
import RouteDetailPage from './pages/RouteDetailPage';
import MapPage from './pages/MapPage';
import ItineraryPage from './pages/ItineraryPage';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageRoutesPage from './pages/admin/ManageRoutesPage';
import RouteEditor from './pages/admin/RouteEditor';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import ManagePoisPage from './pages/admin/ManagePoisPage';
import PoiEditor from './pages/admin/PoiEditor';

import HotelDashboard from './pages/hotel/HotelDashboard';
import HotelCheckInPage from './pages/hotel/HotelCheckInPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Admin (Secretaria) Routes */}
          <Route 
            path="/admin/*"
            element={
              <ProtectedRoute role="secretaria">
                <AdminLayout>
                   <Routes>
                      <Route path="/" element={<AdminDashboard />} />
                      <Route path="/routes" element={<ManageRoutesPage />} />
                      <Route path="/routes/new" element={<RouteEditor />} />
                      <Route path="/routes/edit/:routeId" element={<RouteEditor />} />
                      <Route path="/pois" element={<ManagePoisPage />} />
                      <Route path="/pois/new" element={<PoiEditor />} />
                      <Route path="/pois/edit/:poiId" element={<PoiEditor />} />
                      <Route path="/analytics" element={<AnalyticsPage />} />
                   </Routes>
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Hotel Routes */}
           <Route 
            path="/hotel/*"
            element={
              <ProtectedRoute role="hotel">
                <HotelLayout>
                   <Routes>
                      <Route path="/" element={<HotelDashboard />} />
                      <Route path="/checkin" element={<HotelCheckInPage />} />
                   </Routes>
                </HotelLayout>
              </ProtectedRoute>
            }
          />

          {/* Tourist Routes */}
          <Route 
            path="/*" 
            element={
              <ProtectedRoute role="tourist">
                <GamificationProvider>
                  <TouristLayout>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/routes" element={<RoutesPage />} />
                      <Route path="/routes/:routeId" element={<RouteDetailPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/leaderboard" element={<LeaderboardPage />} />
                      <Route path="/map" element={<MapPage />} />
                      <Route path="/itinerary" element={<ItineraryPage />} />
                    </Routes>
                  </TouristLayout>
                </GamificationProvider>
              </ProtectedRoute>
            } 
          />

        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;