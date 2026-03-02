import React from 'react';

interface PhoneFrameProps {
    children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4 font-sans">
            {/* Device Frame */}
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[844px] w-[390px] shadow-2xl transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,0,0,0.2)]">
                {/* Notch/Dynamic Island */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-800 rounded-b-2xl z-20"></div>

                {/* Top Speaker/Sensors (Inside Notch) */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                    <div className="h-1.5 w-10 bg-gray-700 rounded-full"></div>
                    <div className="h-1.5 w-1.5 bg-gray-700 rounded-full"></div>
                </div>

                {/* Side Buttons - Left (Volume) */}
                <div className="absolute -left-[17px] top-32 w-[3px] h-8 bg-gray-800 rounded-l-lg"></div>
                <div className="absolute -left-[17px] top-48 w-[3px] h-16 bg-gray-800 rounded-l-lg"></div>
                <div className="absolute -left-[17px] top-68 w-[3px] h-16 bg-gray-800 rounded-l-lg"></div>

                {/* Side Button - Right (Power) */}
                <div className="absolute -right-[17px] top-40 w-[3px] h-24 bg-gray-800 rounded-r-lg"></div>

                {/* Screen Content */}
                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative">
                    <div className="h-full w-full overflow-y-auto scrollbar-hide pt-[40px]">
                        {children}
                    </div>
                </div>

                {/* Bottom Indicator */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-900/10 rounded-full z-10"></div>
            </div>

            {/* Visual background elements to make it look premium */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-pink-50 to-green-50"></div>
        </div>
    );
};
