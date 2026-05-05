export default function ThemeSwitcher({ isDarkMode, toggleTheme }) {
  return (
    <button onClick={toggleTheme} className="button">
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}