// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// // ⭐️ Chrome and Users icons imported from lucide-react
// import { X, ArrowRight, Chrome, Users } from 'lucide-react'; 

// // **********************************************
// // Type Definitions
// // **********************************************
// interface AuthModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// // **********************************************
// // Sub-Component: Sign In Form (Unchanged)
// // **********************************************
// const SignInForm: React.FC = () => {
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert('Sign In attempt. (Replace with actual API call)');
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div>
//         <label htmlFor="signin-email" className="block text-sm font-medium text-gray-700 mb-1">
//           Username or email address *
//         </label>
//         <input
//           type="text"
//           id="signin-email"
//           required
//           className="w-full border border-gray-300 rounded-md p-3 focus:ring-orange-400 focus:border-orange-400"
//         />
//       </div>
//       <div>
//         <label htmlFor="signin-password" className="block text-sm font-medium text-gray-700 mb-1">
//           Password *
//         </label>
//         <input
//           type="password"
//           id="signin-password"
//           required
//           className="w-full border border-gray-300 rounded-md p-3 focus:ring-orange-400 focus:border-orange-400"
//         />
//       </div>

//       <div className="flex items-center justify-between text-sm">
//         <div className="flex items-center">
//           <input type="checkbox" id="remember-me" className="w-4 h-4 text-orange-400 border-gray-300 rounded focus:ring-orange-400" />
//           <label htmlFor="remember-me" className="ml-2 text-gray-700">Remember Me</label>
//         </div>
//         <a href="#" className="text-gray-500 hover:text-orange-400 transition">Forgot Your Password?</a>
//       </div>

//       <button
//         type="submit"
//         className="flex items-center justify-center w-full px-6 py-3 border border-orange-400 text-orange-400 font-semibold rounded-lg hover:bg-orange-50 transition duration-200"
//       >
//         LOG IN <ArrowRight className="w-4 h-4 ml-2" />
//       </button>
//     </form>
//   );
// };

// // **********************************************
// // Sub-Component: Register Form (Unchanged)
// // **********************************************
// const RegisterForm: React.FC = () => {
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert('Registration attempt. (Replace with actual API call)');
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {/* New Field: Name/Username (as requested previously) */}
//       <div>
//         <label htmlFor="register-username" className="block text-sm font-medium text-gray-700 mb-1">
//           User Name *
//         </label>
//         <input
//           type="text"
//           id="register-username"
//           required
//           className="w-full border border-gray-300 rounded-md p-3 focus:ring-orange-400 focus:border-orange-400"
//         />
//       </div>
      
//       <div>
//         <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
//           Your email address *
//         </label>
//         <input
//           type="email"
//           id="register-email"
//           required
//           className="w-full border border-gray-300 rounded-md p-3 focus:ring-orange-400 focus:border-orange-400"
//         />
//       </div>
//       <div>
//         <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">
//           Password *
//         </label>
//         <input
//           type="password"
//           id="register-password"
//           required
//           className="w-full border border-gray-300 rounded-md p-3 focus:ring-orange-400 focus:border-orange-400"
//         />
//       </div>

//       <div className="flex items-center justify-between text-sm pt-2">
//         <div className="flex items-center">
//           <input type="checkbox" id="privacy-policy" required className="w-4 h-4 text-orange-400 border-gray-300 rounded focus:ring-orange-400" />
//           <label htmlFor="privacy-policy" className="ml-2 text-gray-700">I agree to the <a href="/privacy" className="text-orange-400 hover:underline">privacy policy</a> *</label>
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="flex items-center justify-center w-full px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition duration-200"
//       >
//         SIGN UP <ArrowRight className="w-4 h-4 ml-2" />
//       </button>
//     </form>
//   );
// };

// // **********************************************
// // Main AuthModal Component
// // **********************************************
// const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
//   const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');

//   // Handle closing the modal when clicking outside
//   const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   }, [onClose]);

//   // Handle closing the modal when pressing the ESC key
//   useEffect(() => {
//     if (!isOpen) return;

//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') {
//         onClose();
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     // Modal Overlay
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 z-9999 flex items-center justify-center p-4 transition-opacity duration-300"
//       onClick={handleOverlayClick}
//       aria-modal="true"
//       role="dialog"
//     >
//       {/* Modal Content */}
//       <div
//         className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden transform transition-transform duration-300 ease-out scale-100"
//         onClick={(e) => e.stopPropagation()} 
//       >
//         <div className="p-8 relative">
//           {/* Close Button */}
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
//             aria-label="Close modal"
//           >
//             <X className="w-6 h-6" />
//           </button>

//           {/* Tabs */}
//           <div className="flex border-b border-gray-200 mb-8">
//             <button
//               onClick={() => setActiveTab('signin')}
//               className={`flex-1 text-center py-3 text-xl font-semibold transition-colors duration-200 ${
//                 activeTab === 'signin' ? 'text-gray-900 border-b-2 border-orange-400' : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Sign In
//             </button>
//             <button
//               onClick={() => setActiveTab('register')}
//               className={`flex-1 text-center py-3 text-xl font-semibold transition-colors duration-200 ${
//                 activeTab === 'register' ? 'text-gray-900 border-b-2 border-orange-400' : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Register
//             </button>
//           </div>

//           {/* Form Content */}
//           <div className="pb-4">
//             {activeTab === 'signin' ? <SignInForm /> : <RegisterForm />}
//           </div>

//           {/* Social Sign In */}
//           <div className="mt-8 text-center text-gray-500 text-sm">
//             <p className="mb-4">or sign in with</p>
//             <div className="flex flex-col sm:flex-row gap-4">
//               {/* ⭐️ Google with Chrome icon */}
//               <button className="flex items-center justify-center flex-1 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition">
//                 <Chrome className="w-5 h-5 mr-2 text-red-500" /> 
//                 Login With Google
//               </button>
//               {/* ⭐️ Facebook with Users icon */}
//               <button className="flex items-center justify-center flex-1 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition">
//                 <Users className="w-5 h-5 mr-2 text-blue-600" />
//                 Login With Facebook
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthModal;