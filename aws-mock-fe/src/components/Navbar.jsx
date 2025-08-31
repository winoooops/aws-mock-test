import SchemeSelector from "./SchemeSelector";

function NavbarLeftContent() {
  // AWS Cloud icon
  const CloudIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );

  return (
    <div
      className="navbar-left-container"
      role="banner"
      aria-label="Website branding"
    >
      <div className="navbar-icon-container">
        <CloudIcon />
      </div>

      <div className="navbar-text-container">
        <h1 className="navbar-title">AWS Mock Test</h1>
        <p className="navbar-subtitle hidden sm:block">
          Practice & Excel
        </p>
      </div>
    </div>
  );
}

export default function Navbar() {
  return (
    <nav className="h-16 w-[90%] shadow-lg border-primary border-accent mx-auto">
      <div className="flex h-full items-center justify-between">
        <NavbarLeftContent />
        <SchemeSelector />
      </div>
    </nav>
  );
}
