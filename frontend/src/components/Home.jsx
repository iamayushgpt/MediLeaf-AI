import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import profileService from "../services/profileService";
import {
  Leaf,
  Camera,
  Upload,
  History,
  User,
  LogOut,
  Shield,
  Scan,
  BookOpen,
  TrendingUp,
  Settings,
  UserCircle,
  Edit3,
  ChevronDown,
  Brain,
  Home as HomeIcon,
  Search,
} from "lucide-react";

const Home = () => {
  const { user, logout } = useAuth();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const features = [
    {
      icon: Camera,
      title: "Camera Scan",
      description: "Capture medicinal leaf images directly with your camera",
      color: "bg-emerald-500",
      comingSoon: true,
    },
    {
      icon: Upload,
      title: "Upload Image",
      description: "Upload leaf images from your device for identification",
      color: "bg-teal-500",
      comingSoon: false,
      link: "/identify",
    },
    {
      icon: Brain,
      title: "Quiz & Facts",
      description:
        "Test your knowledge and learn fascinating facts about medicinal plants",
      color: "bg-purple-500",
      comingSoon: false,
      link: "/quiz",
    },
    {
      icon: Scan,
      title: "AI Analysis",
      description: "Advanced ML models identify plant species and properties",
      color: "bg-green-500",
      comingSoon: false,
      link: "/identify",
    },
    {
      icon: BookOpen,
      title: "Plant Database",
      description: "Comprehensive information about medicinal plants",
      color: "bg-emerald-600",
      comingSoon: true,
    },
  ];

  const stats = [
    { label: "Plants Identified", value: "70+", icon: Leaf },
    { label: "Scans Completed", value: "100+", icon: Scan },
    { label: "Accuracy Rate", value: "98%", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-emerald-100/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-md">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  MediLeaf
                </h1>
                <p className="text-xs text-gray-600">AI Plant Identification</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1 bg-gray-50/50 rounded-2xl p-1">
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-emerald-600 bg-white shadow-sm border border-emerald-100 font-medium transition-all duration-200 group hover:bg-emerald-50"
              >
                <HomeIcon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span>Home</span>
              </button>
              <Link
                to="/identify"
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-gray-700 hover:text-emerald-600 hover:bg-white hover:shadow-sm hover:border hover:border-emerald-100 transition-all duration-200 group"
              >
                <Search className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Identify Plant</span>
              </Link>
              <Link
                to="/quiz"
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-gray-700 hover:text-emerald-600 hover:bg-white hover:shadow-sm hover:border hover:border-emerald-100 transition-all duration-200 group"
              >
                <Brain className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Quiz & Facts</span>
              </Link>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-3 bg-white/80 hover:bg-white border border-emerald-200 hover:border-emerald-300 rounded-xl px-4 py-2.5 transition-all duration-200 shadow-sm hover:shadow-md group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center overflow-hidden ring-2 ring-emerald-100">
                    {user?.profileImage ? (
                      <img
                        src={profileService.formatImageUrl(user.profileImage)}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.fullName}
                    </p>
                    <p className="text-xs text-emerald-600">{user?.email}</p>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-emerald-600 transition-all duration-200 group-hover:scale-110 ${
                      isProfileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50 backdrop-blur-sm">
                    {/* User Info Section */}
                    <div className="px-4 py-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center ring-2 ring-emerald-100 overflow-hidden">
                          {user?.profileImage ? (
                            <img
                              src={profileService.formatImageUrl(
                                user.profileImage
                              )}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="h-6 w-6 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">
                            {user?.fullName}
                          </p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                          <div className="flex items-center mt-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                            <span className="text-xs text-green-600 font-medium">
                              Active
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {/* Mobile Navigation Links */}
                      <div className="md:hidden border-b border-gray-100 pb-2 mb-2">
                        <button
                          onClick={() => {
                            scrollToTop();
                            setIsProfileDropdownOpen(false);
                          }}
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-all duration-200 rounded-xl mx-2 group border border-emerald-200 w-full"
                        >
                          <HomeIcon className="h-4 w-4 text-emerald-600 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium">Home</span>
                        </button>

                        <Link
                          to="/identify"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 rounded-xl mx-2 group"
                        >
                          <Search className="h-4 w-4 text-gray-500 group-hover:text-emerald-500 group-hover:scale-110 transition-all duration-200" />
                          <span className="font-medium">Identify Plant</span>
                        </Link>

                        <Link
                          to="/quiz"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 rounded-xl mx-2 group"
                        >
                          <Brain className="h-4 w-4 text-gray-500 group-hover:text-emerald-500 group-hover:scale-110 transition-all duration-200" />
                          <span className="font-medium">Quiz & Fun Facts</span>
                        </Link>
                      </div>

                      {/* Profile Menu Items */}
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 rounded-xl mx-2 group"
                      >
                        <UserCircle className="h-4 w-4 text-gray-500 group-hover:text-gray-700 group-hover:scale-110 transition-all duration-200" />
                        <span className="font-medium">View Profile</span>
                      </Link>

                      <Link
                        to="/profile/edit"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 rounded-xl mx-2 group"
                      >
                        <Edit3 className="h-4 w-4 text-gray-500 group-hover:text-gray-700 group-hover:scale-110 transition-all duration-200" />
                        <span className="font-medium">Edit Profile</span>
                      </Link>

                      <Link
                        to="/settings"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 rounded-xl mx-2 group"
                      >
                        <Settings className="h-4 w-4 text-gray-500 group-hover:text-gray-700 group-hover:scale-110 transition-all duration-200" />
                        <span className="font-medium">Account Settings</span>
                      </Link>

                      <div className="border-t border-gray-100 mt-3 pt-3">
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            handleLogout();
                          }}
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 w-full text-left rounded-xl mx-2 group"
                        >
                          <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2">
                Welcome back, {user?.fullName?.split(" ")[0]}! 🌿
              </h2>
              <p className="text-emerald-100 text-lg mb-6">
                Ready to explore the world of medicinal plants? Upload an image
                or use your camera to get started.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/identify"
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 border border-white/20"
                >
                  <div className="flex items-center space-x-2">
                    <Camera className="h-5 w-5" />
                    <span>Start Identifying</span>
                  </div>
                </Link>
                <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-200 border border-white/20">
                  <div className="flex items-center space-x-2">
                    <History className="h-5 w-5" />
                    <span>View History</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg">
                  <stat.icon className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Platform Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const FeatureCard = ({ children }) => {
                if (feature.link && !feature.comingSoon) {
                  return (
                    <Link to={feature.link} className="block">
                      {children}
                    </Link>
                  );
                }
                return <div>{children}</div>;
              };

              return (
                <FeatureCard key={index}>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:shadow-lg transition-all duration-200 transform hover:scale-105 group cursor-pointer relative overflow-hidden">
                    {feature.comingSoon && (
                      <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                        Coming Soon
                      </div>
                    )}
                    {!feature.comingSoon && feature.link && (
                      <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                        Available
                      </div>
                    )}
                    <div
                      className={`flex items-center justify-center w-12 h-12 ${feature.color} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-200`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </FeatureCard>
              );
            })}
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-4">
                <Upload className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                1. Upload Image
              </h4>
              <p className="text-gray-600">
                Take a photo or upload an image of a medicinal leaf you want to
                identify.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mx-auto mb-4">
                <Scan className="h-8 w-8 text-teal-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                2. AI Analysis
              </h4>
              <p className="text-gray-600">
                Our advanced ML models analyze the image to identify the plant
                species.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                3. Get Results
              </h4>
              <p className="text-gray-600">
                Receive detailed information about the plant's medicinal
                properties and uses.
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">
                Secure & Private
              </h4>
              <p className="text-sm text-blue-700">
                Your uploaded images and identification results are processed
                securely and stored with encryption. We respect your privacy and
                never share your data with third parties.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
