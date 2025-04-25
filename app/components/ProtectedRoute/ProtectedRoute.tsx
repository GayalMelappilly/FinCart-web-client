// 'use client'

// import { useAuth } from '../../context/authContext';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import Spinner from '../../components/LoadingSpinner/Spinner'; // Create a loading spinner component

// // Higher-order component to protect routes that require authentication
// const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
//   const ProtectedRoute: React.FC<P> = (props) => {
//     const { isAuthenticated, isLoading } = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//       // Redirect to login if not authenticated and not loading
//       if (!isAuthenticated && !isLoading) {
//         router.push('/signup');
//       }
//     }, [isAuthenticated, isLoading, router]);

//     // Show loading spinner while checking authentication
//     if (isLoading) {
//       return <Spinner />;
//     }

//     // If authenticated, render the protected component
//     return isAuthenticated ? <Component {...props} /> : null;
//   };

//   return ProtectedRoute;
// };

// export default withAuth;