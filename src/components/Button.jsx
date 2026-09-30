function Button({ text, variant, disabled,onClick }) {
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    danger:"bg-red-600 hover:bg-red-700 text-white",
    warning:"bg-yellow-400 hover:bg-yellow-500 text-black",
    info:"bg-cyan-500 hover:bg-cyan-600 text-white",
    dark:"bg-gray-900 hover:bg-gray-800 text-white",
    light:"bg-gray-100 hover:bg-gray-200 text-gray-900",
    outline:"border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    ghost:"bg-transparent text-blue-600 hover:bg-blue-100",
    link:"bg-transparent text-blue-600 hover:underline",
  };

  return (
    <button
      className={`px-4 py-2 rounded ${variantClasses[variant]}`}
      disabled={disabled} onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;