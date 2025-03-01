import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import ArticlesPage from './pages/ArticlesPage';
import CategoryPage from './pages/CategoryPage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import SearchResults from './pages/SearchResults';
import AdminLogin from './pages/admin/AdminLogin';
import AdminRegister from './pages/admin/AdminRegister';
import AdminDashboard from './pages/admin/AdminDashboard';
import ArticleManagement from './pages/admin/ArticleManagement';
import ArticleEditor from './pages/admin/ArticleEditor';
import ApiSettings from './pages/admin/ApiSettings';
import ChangePassword from './pages/admin/ChangePassword';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/articles" 
              element={
                <ProtectedRoute>
                  <ArticleManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/articles/new" 
              element={
                <ProtectedRoute>
                  <ArticleEditor />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/articles/edit/:id" 
              element={
                <ProtectedRoute>
                  <ArticleEditor />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/api-settings" 
              element={
                <ProtectedRoute>
                  <ApiSettings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/change-password" 
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;