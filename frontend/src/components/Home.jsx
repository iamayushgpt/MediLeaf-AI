import React from 'react';
import { useAuth } from '../context/AuthContext';
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
  TrendingUp
} from 'lucide-react';

const Home = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const features = [
    {
      icon: Camera,
      title: 'Camera Scan',
      description: 'Capture medicinal leaf images directly with your camera',
      color: 'bg-emerald-500',
      comingSoon: true
    },
    {
      icon: Upload,
      title: 'Upload Image',
      description: 'Upload leaf images from your device for identification',
      color: 'bg-teal-500',
      comingSoon: true
    },
    {
      icon: Scan,
      title: 'AI Analysis',
      description: 'Advanced ML models identify plant species and properties',
      color: 'bg-green-500',
      comingSoon: true
    },
    {
      icon: BookOpen,
      title: 'Plant Database',
      description: 'Comprehensive information about medicinal plants',
      color: 'bg-emerald-600',
      comingSoon: true
    }
  ];

  const stats = [
    { label: 'Plants Identified', value: '0', icon: Leaf },
    { label: 'Scans Completed', value: '0', icon: Scan },
    { label: 'Accuracy Rate', value: '98%', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MediLeaf</h1>
                <p className="text-xs text-gray-600">AI Plant Identification</p>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-emerald-50 rounded-lg px-3 py-2">
                <User className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-800">
                  {user?.fullName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </button>
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
                Welcome back, {user?.fullName?.split(' ')[0]}! 🌿
              </h2>
              <p className="text-emerald-100 text-lg mb-6">
                Ready to explore the world of medicinal plants? Upload an image or use your camera to get started.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 border border-white/20">
                  <div className="flex items-center space-x-2">
                    <Camera className="h-5 w-5" />
                    <span>Start Scanning</span>
                  </div>
                </button>
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
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
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
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Platform Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:shadow-lg transition-all duration-200 transform hover:scale-105 group cursor-pointer relative overflow-hidden"
              >
                {feature.comingSoon && (
                  <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                    Coming Soon
                  </div>
                )}
                <div className={`flex items-center justify-center w-12 h-12 ${feature.color} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-4">
                <Upload className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">1. Upload Image</h4>
              <p className="text-gray-600">Take a photo or upload an image of a medicinal leaf you want to identify.</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mx-auto mb-4">
                <Scan className="h-8 w-8 text-teal-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">2. AI Analysis</h4>
              <p className="text-gray-600">Our advanced ML models analyze the image to identify the plant species.</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">3. Get Results</h4>
              <p className="text-gray-600">Receive detailed information about the plant's medicinal properties and uses.</p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">Secure & Private</h4>
              <p className="text-sm text-blue-700">
                Your uploaded images and identification results are processed securely and stored with encryption. 
                We respect your privacy and never share your data with third parties.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
