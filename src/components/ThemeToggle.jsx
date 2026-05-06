export default function ThemeSwitcher({ isDarkMode, toggleTheme }) {
  return (
    <button className="border px-3 py-1" onClick={toggleTheme}>
      {isDarkMode ? "Light" : "Dark"}
    </button>
  );
}