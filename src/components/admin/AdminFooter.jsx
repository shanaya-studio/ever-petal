function AdminFooter() {
  return (
    <footer className="mt-auto bg-gradient-to-r from-[#6d4ca3] to-[#b3a3ec] px-6 py-4 text-center text-sm text-white">
      <p>
        © {new Date().getFullYear()} Ever Petal Admin Panel. All rights reserved.
      </p>
    </footer>
  );
}

export default AdminFooter;