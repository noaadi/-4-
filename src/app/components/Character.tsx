import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Character Assets
import baseImg from '../../assets/character/base.png';
import capImg from '../../assets/character/cap.png';
import jerseyImg from '../../assets/character/jersey.png';
import shadesImg from '../../assets/character/shades.png';

interface CharacterProps {
    state: {
        skin: string;
        hat: string;
        shirt: string;
        pants: string;
        shoes: string;
        accessory: string;
    };
    /** Width of the character in pixels (height follows naturally from the image ratio). */
    width?: number;
    /** Kept for backward-compat, ignored — use `width` instead. */
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    animate?: boolean;
}

// Map legacy size prop → pixel width so old callers still work
const SIZE_PX: Record<string, number> = {
    sm: 128,
    md: 192,
    lg: 256,
    xl: 320,
};

/**
 * Character overlays accessories on the base image.
 *
 * KEY DESIGN DECISION:
 *   The outer `div` is `position: relative` with an explicit pixel width and
 *   `height: auto` derived from the image.  Because we set the <img> to
 *   `w-full h-auto` (NOT `object-contain`), the rendered image exactly fills
 *   the div — no invisible padding — so `top/left` percentages on accessories
 *   always land on the right body part regardless of zoom level.
 */
export const Character = ({
    state,
    size = 'md',
    width,
    className = '',
    animate = true,
}: CharacterProps) => {
    const px = width ?? SIZE_PX[size] ?? 192;
    const spring = { type: 'spring', damping: 18, stiffness: 260 } as const;

    return (
        // Outer box: pixel-wide, height follows the image naturally
        <div
            className={`relative inline-block ${className}`}
            style={{ width: px }}
        >
            {/* ── Base Character ─────────────────────────────────── */}
            <img
                src={baseImg}
                alt="Character"
                // w-full h-auto: image fills the width exactly, no letterboxing
                className="block w-full h-auto relative z-0"
                draggable={false}
            />

            {/* ── Jersey / Shirt ────────────────────────────────── */}
            <AnimatePresence>
                {state.shirt !== 'none' && (
                    <motion.img
                        key="shirt"
                        src={jerseyImg}
                        alt=""
                        className="absolute pointer-events-none z-10 mix-blend-multiply"
                        style={{
                            width: '75%',
                            height: 'auto',
                            top: '38%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                        initial={animate ? { opacity: 0, scale: 0.7 } : false}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={animate ? { opacity: 0, scale: 0.7 } : undefined}
                        transition={spring}
                    />
                )}
            </AnimatePresence>

            {/* ── Cap / Hat ───────────────────────────────────────
                 Cap image has transparent space below; anchor its top
                 at around -2% so it sits right on top of the head.       */}
            <AnimatePresence>
                {state.hat !== 'none' && (
                    <motion.img
                        key="hat"
                        src={capImg}
                        alt=""
                        className="absolute pointer-events-none z-20 mix-blend-multiply"
                        style={{
                            width: '100%',
                            height: 'auto',
                            top: '-5%',
                            left: '0%',
                        }}
                        initial={animate ? { opacity: 0, y: -16, scale: 0.8 } : false}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={animate ? { opacity: 0, y: -16, scale: 0.8 } : undefined}
                        transition={spring}
                    />
                )}
            </AnimatePresence>

            {/* ── Shades / Accessory ──────────────────────────────
                 Shades sit in the face area (~25-45% from top).          */}
            <AnimatePresence>
                {state.accessory !== 'none' && (
                    <motion.img
                        key="accessory"
                        src={shadesImg}
                        alt=""
                        className="absolute pointer-events-none z-30 mix-blend-multiply"
                        style={{
                            width: '100%',
                            height: 'auto',
                            top: '18%',
                            left: '0%',
                        }}
                        initial={animate ? { opacity: 0, scale: 0.7 } : false}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={animate ? { opacity: 0, scale: 0.7 } : undefined}
                        transition={spring}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
