'use client';

import React from 'react';

/**
 * EVMapExactReplica - Restored Simplified Version
 * Renders ONLY the map background layer as requested.
 */
export default function EVMapExactReplica() {
    return (
        <div className="absolute inset-0 w-full h-full bg-[#111111] overflow-hidden">
            {/* Map Layer (Replica of user provided structure) */}
            <div className="ev-map-layer w-full h-full absolute inset-0 pointer-events-none" />

            <style jsx global>{`
                .ev-map-layer {
                    background-image: url('/ev-map-replacement.png');
                    background-size: cover;
                    background-position: center;
                    transform-origin: center center;
                    will-change: transform;
                    transform: scale(1.0) translate(0, 0); 
                }
            `}</style>
        </div>
    );
}
