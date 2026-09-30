import useThemeStore from "../store/themeStore";

function Footer() {
  //Get Theme
  const theme = useThemeStore((state) => state.theme);

  return (
    <footer
      className={
        theme === "dark"
          ? "w-full bg-gray-800 text-white shadow-md text-center p-6"
          : "w-full bg-white text-gray-800 shadow-md text-center p-6"
      }
    >
      <p>
        © 2026 <span className="text-pink-500">eman.</span> All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
