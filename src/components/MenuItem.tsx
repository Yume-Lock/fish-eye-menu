import { motion } from 'framer-motion';
import type { UsabilityHeuristic } from '../data/usabilityHeuristics';
import './MenuItem.css';

interface MenuItemProps {
    heuristic: UsabilityHeuristic;
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
}

export const MenuItem = ({ heuristic, isHovered, onHover, onLeave }: MenuItemProps) => {
    return (
        <motion.div
            className="menu-item"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            initial={{ scale: 1 }}
            animate={{
                scale: isHovered ? 1.8 : 1,
                zIndex: isHovered ? 10 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
            }}
            style={{
                background: `linear-gradient(135deg, ${heuristic.color}dd, ${heuristic.color}99)`,
            }}
        >
            <motion.div
                className="menu-item-content"
                animate={{
                    opacity: isHovered ? 1 : 0.8,
                }}
            >
                <div className="menu-item-icon">{heuristic.icon}</div>
                <div className="menu-item-label">{heuristic.label}</div>
            </motion.div>

            <motion.div
                className="menu-item-tooltip"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 10,
                    pointerEvents: isHovered ? 'auto' : 'none',
                }}
                transition={{ duration: 0.3 }}
            >
                <div className="tooltip-content">
                    {heuristic.title}
                </div>
            </motion.div>
        </motion.div>
    );
};
