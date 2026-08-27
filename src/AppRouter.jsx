import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./views/home/Home";
import Workouts from "./views/workouts/Workouts";
import Exercises from "./views/exercises/Exercises";
import AppLayout from "./layout/AppLayout";
import Settings from "./views/settings/Settings";
import Roullete from "./views/roullete/Roullete";

function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/roullete" element={<Roullete />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
