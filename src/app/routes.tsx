import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./Root";
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
  NutritionScreen,
  GalleryScreen,
  CharacterScreen
} from "./screens";

export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        Component: LoginScreen,
      },
      {
        path: "/gallery",
        Component: GalleryScreen,
      },
      {
        path: "/splash",
        Component: SplashScreen,
      },
      {
        path: "/login",
        Component: LoginScreen,
      },
      {
        path: "/language",
        Component: LanguageScreen,
      },
      {
        path: "/settings",
        Component: SettingsScreen,
      },
      {
        path: "/points",
        Component: PointsScreen,
      },
      {
        path: "/workouts",
        Component: WorkoutsScreen,
      },
      {
        path: "/social",
        Component: SocialScreen,
      },
      {
        path: "/nutrition",
        Component: NutritionScreen,
      },
      {
        path: "/history",
        Component: HistoryScreen,
      },
      {
        path: "/summary",
        Component: SummaryScreen,
      },
      {
        path: "/questionnaire",
        children: [
          {
            path: "gender",
            Component: StepGender,
          },
          {
            path: "age",
            Component: StepAge,
          },
          {
            path: "weight-height",
            Component: StepWeightHeight,
          },
          {
            path: "goal",
            Component: StepGoal,
          },
          {
            path: "fitness",
            Component: StepFitness,
          },
          {
            path: "military",
            Component: StepMilitary,
          },
          {
            path: "complete",
            Component: StepComplete,
          },
          {
            index: true,
            element: <Navigate to="/questionnaire/gender" replace />,
          }
        ]
      },
      {
        path: "/character",
        Component: CharacterScreen,
      },
      {
        path: "/main",
        Component: MainScreen,
      },
    ]
  }
]);
