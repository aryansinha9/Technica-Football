"use client";

import { BrowserRouter, Routes, Route } from 'react-router';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import ProgramsPage from './pages/ProgramsPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import IndividualSessionsPage from './pages/IndividualSessionsPage';
import VacationCarePage from './pages/VacationCarePage';
import TermProgramPage from './pages/TermProgramPage';
import HolidayClinicPage from './pages/HolidayClinicPage';
import ClubTechnikaTrainingPage from './pages/ClubTechnikaTrainingPage';
import AcademyDevelopmentPage from './pages/AcademyDevelopmentPage';
import ClassDetailPage from './pages/ClassDetailPage';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/term-program" element={<TermProgramPage />} />
          <Route path="/programs/term-program/class/:slug" element={<ClassDetailPage />} />
          <Route path="/programs/term-program/book/:slug" element={<BookingPage />} />
          <Route path="/programs/term-program/confirmation" element={<ConfirmationPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/programs/individual-sessions" element={<IndividualSessionsPage />} />
          <Route path="/programs/private-sessions" element={<IndividualSessionsPage />} />
          <Route path="/programs/club-technica-training" element={<ClubTechnikaTrainingPage />} />
          <Route path="/programs/academy-development-squad" element={<AcademyDevelopmentPage />} />
          <Route path="/programs/holiday-clinic" element={<HolidayClinicPage />} />
          <Route path="/programs/vacation-care" element={<VacationCarePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
