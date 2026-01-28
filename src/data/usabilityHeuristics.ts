export interface UsabilityHeuristic {
    id: number;
    label: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    examples: string[];
    tips: string[];
}

export const usabilityHeuristics: UsabilityHeuristic[] = [
    {
        id: 1,
        label: "UH#1",
        title: "Visibility of System Status",
        description: "The design should always keep users informed about what is going on, through appropriate feedback within a reasonable amount of time.",
        icon: "👁️",
        color: "#667eea",
        examples: [
            "Loading spinners during data fetch",
            "Progress bars for file uploads",
            "Read receipts in messaging apps"
        ],
        tips: [
            "Provide immediate feedback for user actions",
            "Use visual indicators for system state",
            "Show clear progress for long operations"
        ]
    },
    {
        id: 2,
        label: "UH#2",
        title: "Match Between System and Real World",
        description: "The design should speak the users' language. Use words, phrases, and concepts familiar to the user, rather than internal jargon.",
        icon: "🌍",
        color: "#764ba2",
        examples: [
            "Shopping cart icon for e-commerce",
            "Trash bin for delete operations",
            "Natural date formats (e.g., 'Today', 'Yesterday')"
        ],
        tips: [
            "Use familiar metaphors and terminology",
            "Avoid technical jargon where possible",
            "Present information in logical order"
        ]
    },
    {
        id: 3,
        label: "UH#3",
        title: "User Control and Freedom",
        description: "Users often perform actions by mistake. They need a clearly marked 'emergency exit' to leave the unwanted action without having to go through an extended process.",
        icon: "🚪",
        color: "#f093fb",
        examples: [
            "Undo/Redo buttons in text editors",
            "Cancel button in dialog boxes",
            "Back button in navigation"
        ],
        tips: [
            "Always provide undo and redo options",
            "Make exit paths clearly visible",
            "Allow users to cancel operations easily"
        ]
    },
    {
        id: 4,
        label: "UH#4",
        title: "Consistency and Standards",
        description: "Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform and industry conventions.",
        icon: "📐",
        color: "#4facfe",
        examples: [
            "Submit buttons always in the same position",
            "Consistent navigation across pages",
            "Standard icons (save, print, search)"
        ],
        tips: [
            "Use consistent terminology throughout",
            "Follow platform conventions (iOS, Android, Web)",
            "Maintain consistent visual hierarchy"
        ]
    },
    {
        id: 5,
        label: "UH#5",
        title: "Error Prevention",
        description: "Good error messages are important, but the best designs carefully prevent problems from occurring in the first place.",
        icon: "🛡️",
        color: "#00f2fe",
        examples: [
            "Confirmation dialogs for destructive actions",
            "Input validation before submission",
            "Disabling invalid options"
        ],
        tips: [
            "Validate inputs in real-time",
            "Provide constraints and guidelines",
            "Use confirmation for critical actions"
        ]
    },
    {
        id: 6,
        label: "UH#6",
        title: "Recognition Rather Than Recall",
        description: "Minimize the user's memory load by making elements, actions, and options visible. The user should not have to remember information from one part of the interface to another.",
        icon: "🧠",
        color: "#43e97b",
        examples: [
            "Dropdown menus showing available options",
            "Recent search suggestions",
            "Visible toolbar with labeled icons"
        ],
        tips: [
            "Make objects and actions visible",
            "Provide helpful defaults",
            "Use tooltips for additional context"
        ]
    },
    {
        id: 7,
        label: "UH#7",
        title: "Flexibility and Efficiency of Use",
        description: "Shortcuts—hidden from novice users—may speed up the interaction for the expert user so that the design can cater to both inexperienced and experienced users.",
        icon: "⚡",
        color: "#fa709a",
        examples: [
            "Keyboard shortcuts (Ctrl+C, Ctrl+V)",
            "Quick access menus and gestures",
            "Customizable workflows"
        ],
        tips: [
            "Provide keyboard shortcuts for power users",
            "Allow customization of frequent actions",
            "Support both mouse and keyboard navigation"
        ]
    },
    {
        id: 8,
        label: "UH#8",
        title: "Aesthetic and Minimalist Design",
        description: "Interfaces should not contain information that is irrelevant or rarely needed. Every extra unit of information competes with the relevant units of information.",
        icon: "✨",
        color: "#fee140",
        examples: [
            "Clean, uncluttered interfaces",
            "Hidden advanced options",
            "Focus on essential content"
        ],
        tips: [
            "Remove unnecessary elements",
            "Use white space effectively",
            "Prioritize essential information"
        ]
    },
    {
        id: 9,
        label: "UH#9",
        title: "Help Users Recognize, Diagnose, and Recover from Errors",
        description: "Error messages should be expressed in plain language, precisely indicate the problem, and constructively suggest a solution.",
        icon: "🔧",
        color: "#30cfd0",
        examples: [
            "Clear error messages with solutions",
            "Inline validation feedback",
            "Helpful suggestions for corrections"
        ],
        tips: [
            "Use plain language in error messages",
            "Indicate exactly what went wrong",
            "Suggest actionable solutions"
        ]
    },
    {
        id: 10,
        label: "UH#10",
        title: "Help and Documentation",
        description: "It's best if the system doesn't need any additional explanation. However, it may be necessary to provide documentation to help users understand how to complete their tasks.",
        icon: "📚",
        color: "#a8edea",
        examples: [
            "Contextual help buttons",
            "Searchable FAQ sections",
            "Interactive tutorials"
        ],
        tips: [
            "Make help easily accessible",
            "Provide context-specific assistance",
            "Use clear, concise instructions"
        ]
    }
];
