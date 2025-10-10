import './ToggleButton.css';

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                           TOGGLE BUTTON COMPONENT                           ║
║                                                                               ║
║  THEORY: A reusable button component that toggles between two states       ║
║  ANALOGY: Like a light switch - click to turn on/off                       ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/

const ToggleButton = ({
  isActive,
  onToggle,
  activeText,
  inactiveText,
  className = '',
  style = {}
}) => {
  /*
   * PROPS:
   * - isActive: Boolean indicating current state
   * - onToggle: Function to call when clicked
   * - activeText: Text to show when active
   * - inactiveText: Text to show when inactive
   * - className: Additional CSS classes
   * - style: Inline styles
   */

  return (
    <button
      onClick={onToggle}
      className={`toggleButton ${className}`}
      
    >
      {isActive ? activeText : inactiveText}
    </button>
  );
};

export default ToggleButton;