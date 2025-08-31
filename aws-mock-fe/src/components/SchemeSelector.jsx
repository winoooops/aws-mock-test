import { useState, startTransition } from "react";
import { useColorScheme } from "../hooks/useColorScheme";

export default function SchemeSelector() {
  const { colorScheme, availableSchemes, setColorScheme } = useColorScheme();
  const [isOpen, setIsOpen] = useState(false);

  const getSchemeDisplayName = (schemeName) => {
    switch (schemeName) {
      case 'deepCove':
        return 'Deep Cove';
      case 'cyberBlue':
        return 'Cyber Blue';
      case 'neonGreen':
        return 'Neon Green';
      case 'claude':
        return 'Claude';
      default:
        return schemeName;
    }
  };

  const getSchemeColors = (schemeName) => {
    switch (schemeName) {
      case 'deepCove':
        return {
          primary: '#1E40AF',
          secondary: '#7C3AED',
          background: '#0F172A'
        };
      case 'cyberBlue':
        return {
          primary: '#06B6D4',
          secondary: '#3B82F6',
          background: '#0C4A6E'
        };
      case 'neonGreen':
        return {
          primary: '#10B981',
          secondary: '#059669',
          background: '#064E3B'
        };
      case 'claude':
        return {
          primary: '#CC785C',
          secondary: '#E8B4A0',
          background: '#FAF7F5'
        };
      default:
        return {
          primary: '#3B82F6',
          secondary: '#7C3AED',
          background: '#1E293B'
        };
    }
  };

  const currentColors = getSchemeColors(colorScheme);

  const handleSchemeSelect = (scheme) => {
    startTransition(() => {
      setColorScheme(scheme.name);
      setIsOpen(false);
    });
  };

  const toggleDropdown = () => {
    startTransition(() => setIsOpen(!isOpen));
  };



  return (
    <div className="scheme-selector-container">
      <button
        className="scheme-selector-button"
        onClick={toggleDropdown}
        aria-label="Color scheme selector"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div
          className="scheme-color-indicator"
          style={{
            background: `linear-gradient(45deg, ${currentColors.primary} 50%, ${currentColors.secondary} 50%)`,
          }}
        />
        <svg
          className={`scheme-dropdown-arrow ${isOpen ? 'open' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M7 10L12 15L17 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="scheme-dropdown" role="listbox">
          {availableSchemes.map((scheme, index) => {
            const schemeColors = getSchemeColors(scheme.name);
            const isSelected = colorScheme === scheme.name;
            return (
              <div
                key={scheme.id}
                className={`scheme-dropdown-item ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSchemeSelect(scheme)}
                role="option"
                aria-selected={isSelected}
              >
                <div className="scheme-color-swatches">
                  <div
                    className="scheme-color-swatch"
                    style={{ backgroundColor: schemeColors.primary }}
                  />
                  <div
                    className="scheme-color-swatch"
                    style={{ backgroundColor: schemeColors.secondary }}
                  />
                  <div
                    className="scheme-color-swatch"
                    style={{ backgroundColor: schemeColors.background }}
                  />
                </div>
                <span className={`scheme-dropdown-text ${isSelected ? 'selected' : ''}`}>
                  {getSchemeDisplayName(scheme.name)}
                </span>
                {isSelected && (
                  <svg
                    className="scheme-check-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ color: schemeColors.primary }}
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
