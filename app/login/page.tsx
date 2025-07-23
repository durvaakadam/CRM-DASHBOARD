'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from "lucide-react";

const Page: React.FC = () => {
  const [role, setRole] = useState<'CEO' | 'Counsellor' | 'HR'>('CEO');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');

  // Typewriter effect for title
  useEffect(() => {
    const text = 'HumbleWalking';
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setTypewriterText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setShowForm(true), 500);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, []);

  // For smooth fade-in on load
  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timeout);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
  const isCEO = role === 'CEO' && email === 'ceo@crm.com' && password === '1234';
      const isCounsellor = role === 'Counsellor' && email === 'counsellor@crm.com' && password === '1234';
      const isHR = role === 'HR' && email === 'hr@crm.com' && password === '1234';

      if (isCEO || isCounsellor || isHR) {
        const dashboardPath = role === 'CEO'
          ? '/dashboard/ceo'
          : role === 'Counsellor'
          ? '/dashboard/counsellor'
          : '/dashboard/hr';

        try {
          await router.push(dashboardPath);
        } catch (error) {
          console.error('Router navigation failed, using window.location:', error);
          window.location.href = dashboardPath;
        }
      } else {
        alert('Invalid credentials. Please check your email and password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
    
    const roles: ('CEO' | 'Counsellor' | 'HR')[] = ['CEO', 'Counsellor', 'HR'];


  return (
    <>
      <style jsx global>{`
        /* Particle animation */
        @keyframes particle-float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-15px) translateX(8px) scale(1.1);
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-8px) translateX(-3px) scale(0.9);
            opacity: 0.5;
          }
          75% { 
            transform: translateY(-22px) translateX(12px) scale(1.05);
            opacity: 0.6;
          }
        }
        
        .particle-float {
          animation: particle-float 12s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }

        /* Logo animations */
        @keyframes logo-glow {
          0%, 100% { 
            filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.4));
          }
          50% { 
            filter: drop-shadow(0 0 25px rgba(59, 130, 246, 0.7));
          }
        }
        
        .logo-glow {
          animation: logo-glow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 0.2;
            transform: scale(1);
          }
          50% { 
            opacity: 0.4;
            transform: scale(1.05);
          }
        }
        
        .pulse-glow {
          animation: pulse-glow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Form animations */
        @keyframes border-glow {
          0%, 100% { 
            background: linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.2), rgba(17, 12, 123, 0.3));
          }
          33% { 
            background: linear-gradient(45deg,  rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.2), rgba(17, 12, 123, 0.3));
          }
          66% { 
            background: linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.2), rgba(17, 12, 123, 0.3));
          }
        }
        
        .border-glow {
          animation: border-glow 10s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes form-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        
        .form-float {
          animation: form-float 12s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }

        /* Role selector animations */
        @keyframes selector-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(59, 130, 246, 0.1); }
          50% { box-shadow: 0 0 25px rgba(59, 130, 246, 0.2); }
        }
        
        .selector-glow {
          animation: selector-glow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse-text {
          0%, 100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
          50% { text-shadow: 0 0 8px rgba(255, 255, 255, 0.7); }
        }
        
        .pulse-text {
          animation: pulse-text 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Input animations */
        @keyframes input-slide-1 {
          0% { transform: translateX(-15px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        .input-slide-1 {
          animation: input-slide-1 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.2s both;
        }

        @keyframes input-slide-2 {
          0% { transform: translateX(-15px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        .input-slide-2 {
          animation: input-slide-2 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.4s both;
        }

        .input-focus-lift:focus {
          transform: translateY(-1px);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.2);
        }

        /* Button animations */
        @keyframes button-slide {
          0% { transform: translateY(15px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        .button-slide {
          animation: button-slide 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.6s both;
        }

        @keyframes button-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-1px); }
        }
        
        .button-float {
          animation: button-float 6s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }

        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 8px rgba(255, 255, 255, 0.5); }
          50% { text-shadow: 0 0 15px rgba(255, 255, 255, 0.7); }
        }
        
        .text-glow {
          animation: text-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Typewriter cursor */
        @keyframes cursor-blink {
          0%, 45% { opacity: 1; }
          50%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .cursor-blink {
          animation: cursor-blink 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Word fade-in animations */
        @keyframes word-fade {
          0% { 
            opacity: 0;
            transform: translateY(10px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .word-fade-1 { animation: word-fade 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both; }
        .word-fade-2 { animation: word-fade 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s both; }
        .word-fade-3 { animation: word-fade 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s both; }
        .word-fade-4 { animation: word-fade 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s both; }
        .word-fade-5 { animation: word-fade 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.0s both; }

        /* Typewriter styling */
        .typewriter-text {
          font-family: 'Courier New', monospace;
          letter-spacing: 1.5px;
        }
      `}</style>
      
      <div className="relative w-screen h-screen bg-slate-900 overflow-hidden">
        {/* Static dark navy blue background */}
        <div className="absolute inset-0 bg-slate-900" />
        
        {/* Enhanced particle animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full particle-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                opacity: Math.random() * 0.5 + 0.1,
              }}
            />
          ))}
        </div>

        {/* Left Section with logo above title */}
        <div
          className={`absolute left-10 top-0 h-full w-1/2 flex flex-col items-center justify-center p-10 transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}
        >
          {/* Logo with glow and pulse */}
          <div className="relative mb-8">
            <img 
              src="/HW_logo.png" 
              alt="Logo" 
              className={`w-40 h-40 transition-all duration-1000 ease-out logo-glow ${loaded ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`}
              style={{ objectFit: 'contain' }}
            />
            <div className="absolute inset-0 w-40 h-40 bg-blue-500/20 rounded-full pulse-glow" />
          </div>

          {/* Typewriter text */}
          <h1 className="text-white text-7xl font-bold typewriter-text select-none text-center">
            {typewriterText}
            <span className="cursor-blink">|</span>
          </h1>
        </div>

        {/* Form with slide-in animation and enhanced container effects */}
        <div className={`absolute right-[126px] top-[42px] bottom-0 w-[450px] max-w-[500px] transition-all duration-1000 ease-out ${
          showForm ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-16 scale-95'
        }`}>
          {/* Form background with animated border */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30 rounded-t-[5rem] border-glow shadow-2xl" />
          <div className="absolute inset-[3px] bg-white/98 backdrop-blur-xl rounded-t-[5rem] shadow-inner" />
          
          <form 
            onSubmit={handleLogin}  
            className="relative z-10 p-10 h-full flex flex-col justify-center gap-8 form-float"
          >
            {/* Animated decorative elements */}
            <div className="absolute top-6 left-6 w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0s'}} />
            <div className="absolute top-10 right-10 w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.5s'}} />
            <div className="absolute bottom-24 left-10 w-2.5 h-2.5 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '1s'}} />
            
            {/* Title */}
            <div className="mb-6 relative">
              <h2 className="relative text-3xl font-bold text-center text-white word-fade-in">
                <span className="inline-block word-fade-1 hover:animate-bounce">Sign</span>
                <span className="inline-block word-fade-2 ml-2 hover:animate-bounce">in</span>
                <span className="inline-block word-fade-3 ml-2 hover:animate-bounce">to</span>
                <span className="inline-block word-fade-4 ml-2 hover:animate-bounce">Your</span>
                <span className="inline-block word-fade-5 ml-2 hover:animate-bounce">Dashboard</span>
              </h2>
            </div>

            {/* Role Selector */}
            <div className="relative flex bg-gradient-to-r from-gray-100 to-gray-200 rounded-full p-1.5 mb-6 shadow-inner overflow-hidden selector-glow">
        <div
          className={`absolute top-1.5 bottom-1.5 w-[calc(33.33%-4px)] bg-gradient-to-r from-blue-800 to-blue-900 rounded-full shadow-xl transition-all duration-700 ease-out transform ${
            role === 'CEO' ? 'left-1' : role === 'Counsellor' ? 'left-[34%]' : 'left-[67%]'
          }`}
        />
        {roles.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`relative z-10 flex-1 py-4 px-6 rounded-full font-semibold text-sm sm:text-base transition-all duration-500 ease-out transform ${
              role === r
                ? 'text-white scale-105 pulse-text'
                : 'text-gray-600 hover:text-gray-900 hover:scale-105'
            }`}
          >
            {r}
          </button>
        ))}
      </div>
            {/* Email Input */}
            <div className="group relative input-slide-1">
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-5 py-5 bg-gray-50 border-2 border-gray-300 rounded-2xl text-gray-900 text-lg focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-500 ease-out hover:border-gray-400 hover:shadow-lg placeholder-gray-500 input-focus-lift"
              />
            </div>

            {/* Password Input */}
            <div className="group relative input-slide-2">
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-5 py-5 pr-14 bg-gray-50 border-2 border-gray-300 rounded-2xl text-gray-900 text-lg focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-500 ease-out hover:border-gray-400 hover:shadow-lg placeholder-gray-500 input-focus-lift"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-[calc(50%+16px)] transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:scale-110 transition-all duration-500 ease-out active:scale-95 z-10"
              >
                {showPassword ? 
                  <EyeOff className="h-6 w-6" /> : 
                  <Eye className="h-6 w-6" />
                }
              </button>
            </div>

            {/* Login Button */}
            <div className="relative button-slide mt-4">
              <button 
                type="submit" 
                disabled={isLoading}
                className={`relative w-full py-5 bg-gradient-to-r from-blue-700 to-blue-800 text-white font-bold text-lg rounded-2xl shadow-xl overflow-hidden
                  transition-all duration-500 ease-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 
                  active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer group button-float`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                    <span className="animate-pulse">Signing in...</span>
                  </div>
                ) : (
                  <span className="relative z-10 text-glow">Login</span>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              </button>
            </div>
          </form>
        </div>


        
      </div>
    </>
  );
};

export default Page;