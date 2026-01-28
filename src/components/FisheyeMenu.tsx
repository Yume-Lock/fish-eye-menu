import { useState } from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from './MenuItem';
import { usabilityHeuristics } from '../data/usabilityHeuristics';
import './FisheyeMenu.css';

export const FisheyeMenu = () => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <div className="fisheye-container">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="header"
            >
                <h1>Nielsen's 10 Usability Heuristics</h1>
                <p>Hover over each item to explore the principles of good design</p>
            </motion.div>

            <motion.div
                className="fisheye-menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                {usabilityHeuristics.map((heuristic, index) => (
                    <motion.div
                        key={heuristic.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: 0.5 + index * 0.1,
                            type: "spring",
                            stiffness: 200,
                        }}
                    >
                        <MenuItem
                            heuristic={heuristic}
                            isHovered={hoveredId === heuristic.id}
                            onHover={() => setHoveredId(heuristic.id)}
                            onLeave={() => setHoveredId(null)}
                        />
                    </motion.div>
                ))}
            </motion.div>

            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="footer"
            >
                <p>Interactive Fisheye Menu - ICS 2402 Assignment 2</p>
                <p className="footer-subtitle">Based on Jakob Nielsen's 10 Usability Heuristics</p>
            </motion.footer>
        </div>
    );
};
