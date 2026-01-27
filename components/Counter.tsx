'use client';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface CounterProps {
    value: number;
    duration?: number;
    decimals?: number;
    suffix?: string;
}

export default function Counter({ value, duration = 2, decimals = 0, suffix = "" }: CounterProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const count = useMotionValue(0);

    // Transform the motion value to a string with proper decimals
    const rounded = useTransform(count, (latest) => {
        return latest.toFixed(decimals);
    });

    useEffect(() => {
        if (isInView) {
            count.set(0); // Ensure it starts exactly at 0
            const controls = animate(count, value, {
                duration: duration,
                ease: "easeOut", // More visible start than the steep custom cubic-bezier
            });
            return controls.stop;
        }
    }, [isInView, value, duration, count]);

    return (
        <span ref={ref}>
            <motion.span>{rounded}</motion.span>
            {suffix}
        </span>
    );
}
