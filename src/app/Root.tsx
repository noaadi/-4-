import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { AppProvider } from './context/AppContext';
import { PhoneFrame } from './components/PhoneFrame';
import { LayoutGrid } from 'lucide-react';

export const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGallery = location.pathname === '/gallery';

  return (
    <AppProvider>
      {isGallery ? (
        <Outlet />
      ) : (
        <>
          <PhoneFrame>
            <Outlet />
          </PhoneFrame>

          {/* Floating Gallery Shortcut - For Development */}
          <button
            onClick={() => navigate('/gallery')}
            className="fixed bottom-6 right-6 z-[9999] bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition-all hover:scale-110 active:scale-95 group flex items-center gap-2"
            title="Go to Screens Gallery"
          >
            <LayoutGrid size={24} />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold">Gallery</span>
          </button>
        </>
      )}
    </AppProvider>
  );
};
