import React from 'react';
import { useNavigate } from 'react-router';
import {
    SplashScreen,
    LoginScreen,
    LanguageScreen,
    StepGender,
    StepAge,
    StepWeightHeight,
    StepGoal,
    StepFitness,
    StepMilitary,
    StepComplete,
    MainScreen,
    SettingsScreen,
    WorkoutsScreen,
    PointsScreen,
    SummaryScreen,
    HistoryScreen,
    SocialScreen,
    NutritionScreen
} from './index';

const screens = [
    { name: 'Splash Screen', Component: SplashScreen },
    { name: 'Login Screen', Component: LoginScreen },
    { name: 'Language Screen', Component: LanguageScreen },
    { name: 'Main Screen', Component: MainScreen },
    { name: 'Settings Screen', Component: SettingsScreen },
    { name: 'Workouts Screen', Component: WorkoutsScreen },
    { name: 'Points Screen', Component: PointsScreen },
    { name: 'Summary Screen', Component: SummaryScreen },
    { name: 'History Screen', Component: HistoryScreen },
    { name: 'Social Screen', Component: SocialScreen },
    { name: 'Nutrition Screen', Component: NutritionScreen },
    { name: 'Step: Gender', Component: StepGender },
    { name: 'Step: Age', Component: StepAge },
    { name: 'Step: Weight/Height', Component: StepWeightHeight },
    { name: 'Step: Goal', Component: StepGoal },
    { name: 'Step: Fitness', Component: StepFitness },
    { name: 'Step: Military', Component: StepMilitary },
    { name: 'Step: Complete', Component: StepComplete, path: '/questionnaire/complete' },
];

const screenRoutes: { [key: string]: string } = {
    'Splash Screen': '/splash',
    'Login Screen': '/login',
    'Language Screen': '/language',
    'Main Screen': '/main',
    'Settings Screen': '/settings',
    'Workouts Screen': '/workouts',
    'Points Screen': '/points',
    'Summary Screen': '/summary',
    'History Screen': '/history',
    'Social Screen': '/social',
    'Nutrition Screen': '/nutrition',
    'Step: Gender': '/questionnaire/gender',
    'Step: Age': '/questionnaire/age',
    'Step: Weight/Height': '/questionnaire/weight-height',
    'Step: Goal': '/questionnaire/goal',
    'Step: Fitness': '/questionnaire/fitness',
    'Step: Military': '/questionnaire/military',
    'Step: Complete': '/questionnaire/complete',
};

export const GalleryScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-50 min-h-screen p-6 md:p-10">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 justify-items-center">
                    {screens.map((item, index) => (
                        <div key={index} className="flex flex-col items-center group">
                            <div className="mb-6 text-center">
                                <span className="text-xs font-bold text-pink-500 uppercase tracking-widest bg-pink-50 px-3 py-1 rounded-full mb-2 inline-block">Screen {index + 1}</span>
                                <h2 className="text-xl font-bold text-slate-800">{item.name}</h2>
                            </div>

                            {/* iPhone 14 Pro Frame Simulation */}
                            <div
                                onClick={() => navigate(screenRoutes[item.name] || '/')}
                                className="relative border-slate-900 bg-slate-900 border-[8px] rounded-[2.5rem] h-[667px] w-[308px] shadow-2xl transition-all duration-500 group-hover:shadow-pink-100 group-hover:scale-[1.02] cursor-pointer"
                            >
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-b-xl z-20"></div>

                                {/* Screen Content */}
                                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative">
                                    <div className="h-full w-full overflow-y-auto scrollbar-hide scale-[0.82] origin-top h-[122%] w-[122%] -ml-[11%] -mt-[11%] pt-[15px] pointer-events-none">
                                        <item.Component />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
