import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const VisitedPages = lazy(() => import('../pages/VisitedPages'));
const DeletedPages = lazy(() => import('../pages/DeletedPages'));

const AppRoutes: React.FC = () => {
    return (
        <Suspense>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/visited" element={<VisitedPages />} />

                    <Route path="/deleted" element={<DeletedPages />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
