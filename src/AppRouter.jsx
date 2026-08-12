import {
    Routes,
    Route,
    Navigate, 
} from "react-router-dom";

import Home from "./views/home/Home";
import Workouts from "./views/workouts/Workouts";
import Exercises from "./views/exercises/Exercises";
import AppLayout from "./layout/AppLayout";

function AppRouter() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/exercises" element={<Exercises />} />
            </Route>
        </Routes>
    );
}

export default AppRouter;