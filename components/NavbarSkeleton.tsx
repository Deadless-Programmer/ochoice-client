const NavbarSkeleton = () => {
  return (
    <div className="sticky top-0 max-w-7xl mx-auto z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 animate-pulse">
        {/* Left: Logo */}
        <div className="h-6 w-24 bg-gray-200 rounded"></div>

        {/* Center: Menu */}
        <div className="hidden md:flex gap-6">
          <div className="h-4 w-10 bg-gray-200 rounded"></div>
          <div className="h-4 w-10 bg-gray-200 rounded"></div>
          <div className="h-4 w-10 bg-gray-200 rounded"></div>
          <div className="h-4 w-10 bg-gray-200 rounded"></div>
        </div>

        {/* Right: Buttons */}
        <div className="flex gap-3 items-center">
          <div className="h-8 w-14 bg-gray-200 rounded"></div>
          <div className="h-8 w-14 bg-gray-200 rounded"></div>
          <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
export default NavbarSkeleton