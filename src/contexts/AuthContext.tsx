import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  adminExists: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAdminExists: () => Promise<boolean>;
  resetAdminStatus: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
  getUserEmail: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [adminExists, setAdminExists] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is logged in
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
      setLoading(false);
    };
    
    checkSession();
    
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
    
    // Check if admin exists
    checkAdminExists();
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password
      });
      
      if (error) throw error;
      
      // Set admin exists flag
      localStorage.setItem('adminExists', 'true');
      setAdminExists(true);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const checkAdminExists = async (): Promise<boolean> => {
    try {
      // For demo purposes, we'll check localStorage
      // In a real app, you would check if any admin users exist in the database
      const exists = localStorage.getItem('adminExists') === 'true';
      setAdminExists(exists);
      return exists;
    } catch (error) {
      console.error('Check admin exists error:', error);
      return false;
    }
  };

  const resetAdminStatus = () => {
    localStorage.removeItem('adminExists');
    setAdminExists(false);
  };

  const getUserEmail = async (): Promise<string | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user?.email || null;
    } catch (error) {
      console.error('Get user email error:', error);
      return null;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    try {
      // 首先验证当前密码是否正确
      const email = await getUserEmail();
      if (!email) {
        return { success: false, message: '无法获取当前用户信息' };
      }

      // 使用当前密码尝试登录，验证密码是否正确
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: currentPassword
      });

      if (signInError) {
        return { success: false, message: '当前密码不正确' };
      }

      // 更新密码
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) {
        return { success: false, message: `密码更新失败: ${updateError.message}` };
      }

      return { success: true, message: '密码已成功更新' };
    } catch (error) {
      console.error('Change password error:', error);
      return { success: false, message: '密码更新过程中发生错误' };
    }
  };

  const value = {
    isAuthenticated,
    loading,
    adminExists,
    login,
    register,
    logout,
    checkAdminExists,
    resetAdminStatus,
    changePassword,
    getUserEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};