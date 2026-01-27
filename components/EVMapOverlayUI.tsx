'use client';

import React from 'react';

export default function EVMapOverlayUI() {
    return (
        <div className="absolute inset-0 z-10 pointer-events-none select-none">
            {/* HEADER */}
            <header className="app-header absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 pointer-events-auto">
                {/* HEADER LOGO REMOVED AS REQUESTED */}
            </header>
        </div>
    );
}
