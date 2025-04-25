// // app/context/AuthContext.tsx
// 'use client'

// import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { useRouter } from 'next/navigation';
// import { ProfileFormData } from '../types/types';
// import { getCurrentUser } from '../services/authServices';

// type AuthContextType = {
//   user: ProfileFormData | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<ProfileFormData | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   // Initialize auth state on component mount
//   useEffect(() => {
//     const initAuth = async () => {
//       setIsLoading(true);
//       try {
//         const userData = await getCurrentUser();
//         setUser(userData);
//         setIsAuthenticated(true);
//       } catch (error) {
//         setUser(null);
//         setIsAuthenticated(false);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     initAuth();
//   }, []);

//   const login = async (email: string, password: string) => {
//     setIsLoading(true);
//     try {
//       // await login({ email, password });z
//       const userData = await getCurrentUser();
//       setUser(userData);
//       setIsAuthenticated(true);
//       router.push('/dashboard');
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const signup = async (userData: any) => {
//     setIsLoading(true);
//     try {
//       // await authService.signup(userData);
//       // const currentUser = await authService.getCurrentUser();
//       // setUser(currentUser);
//       setIsAuthenticated(true);
//       router.push('/dashboard');
//     } catch (error) {
//       console.error('Signup error:', error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = async () => {
//     try {
//       // await authService.logout();
//       setUser(null);
//       setIsAuthenticated(false);
//       router.push('/login');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       isAuthenticated, 
//       isLoading, 
//       // login, 
//       // signup, 
//       // logout
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };