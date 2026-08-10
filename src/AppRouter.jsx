import { Routes, Route, Navigate, NavLink, Outlet } from 'react-router-dom';
import Home from './views/home/Home';

import Workouts from './views/workouts/Workouts';
import Exercises from './views/exercises/Exercises';


function AppLayout() {
    return (
        <>
            <nav>
                <NavLink to="/home">Home</NavLink> |{' '}
                <NavLink to="/workouts">Workouts</NavLink> |{' '}
                <NavLink to="/exercises">Exercises</NavLink>
            </nav>
            <Outlet />
        </>
    );
}

function AppRouter() {
    return (
        <>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route index element={<Navigate to="/home" replace />} />
                    <Route path="home" element={<Home />} />
                    <Route path="workouts" element={<Workouts />} />
                    <Route path="exercises" element={<Exercises />} />
                </Route>
            </Routes>
        </>
    );

}

export default AppRouter;
