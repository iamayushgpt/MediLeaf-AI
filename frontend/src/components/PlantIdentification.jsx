import React, { useState, useRef } from "react";
import {
  Camera,
  Upload,
  X,
  Loader,
  CheckCircle,
  AlertCircle,
  Info,
  Leaf,
  Award,
  Clock,
  FileImage,
  Sparkles,
  Zap,
  Microscope,
  Shield,
  BookOpen,
  Star,
  TrendingUp,
} from "lucide-react";
import { plantService } from "../services/plantService";

const PlantIdentification = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = (file) => {
    // Validate file
    const validation = plantService.validateImageFile(file);
    if (!validation.valid) {
      setError(validation.errors.join(" "));
      return;
    }

    setSelectedImage(file);
    setError(null);
    setResult(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleIdentify = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const response = await plantService.identifyPlant(
        selectedImage,
        (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        }
      );

      if (response.success) {
        setResult(response);
      } else {
        setError(response.message || "Identification failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const clearSelection = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Professional Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6 shadow-lg shadow-emerald-500/25">
            <Leaf className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            MediLeaf <span className="text-emerald-600">AI</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
            Advanced artificial intelligence for precise medicinal plant
            identification and comprehensive botanical analysis
          </p>

          {/* Stats Section */}
          <div className="flex items-center justify-center mt-8 space-x-8">
            <div className="flex items-center space-x-2 text-slate-500">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="font-medium">80+ Species Database</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="font-medium">97% Accuracy Rate</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-500">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="font-medium">Real-time Analysis</span>
            </div>
          </div>
        </div>

        {/* Clean Upload Area */}
        {!selectedImage ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50">
              <div
                className="relative border-2 border-dashed border-slate-300 rounded-3xl p-16 text-center hover:border-emerald-400 hover:bg-emerald-50/50 transition-all duration-500 cursor-pointer group"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={triggerFileInput}
              >
                <div className="space-y-8">
                  {/* Upload Icon */}
                  <div className="relative mx-auto w-24 h-24">
                    <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-all duration-500">
                      <Upload className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Camera className="w-4 h-4 text-emerald-600" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      Upload Plant Image
                    </h3>
                    <p className="text-lg text-slate-600 mb-6 font-light">
                      Drag and drop your image here, or click to browse
                    </p>
                    <div className="text-sm text-slate-500 space-y-1">
                      <p>Supported formats: JPEG, PNG, BMP, TIFF</p>
                      <p>Maximum file size: 10MB</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    <FileImage className="w-5 h-5 mr-3" />
                    Select Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Professional Analysis Interface */
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden">
              {/* Header Bar */}
              <div className="bg-gradient-to-r from-slate-50 to-emerald-50 px-8 py-6 border-b border-slate-200/60">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 flex items-center">
                      <Microscope className="w-6 h-6 mr-3 text-emerald-600" />
                      Analysis in Progress
                    </h3>
                    <p className="text-slate-600 mt-1">
                      {selectedImage.name} •{" "}
                      {plantService.formatFileSize(selectedImage.size)}
                    </p>
                  </div>
                  <button
                    onClick={clearSelection}
                    className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-8">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Image Section */}
                  <div className="space-y-6">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                      <div className="relative bg-white rounded-2xl p-4 shadow-lg">
                        <img
                          src={imagePreview}
                          alt="Plant specimen"
                          className="w-full h-80 object-cover rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Processing Info */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Clock className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-900 text-lg mb-2">
                            AI Processing Times
                          </h4>
                          <div className="text-blue-700 space-y-1 text-sm">
                            <p>• Initial analysis: 10-15 seconds</p>
                            <p>• Subsequent scans: 3-5 seconds</p>
                            <p>• Deep learning model optimization included</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={handleIdentify}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-6 px-8 rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center text-lg"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-6 h-6 mr-3">
                            <div className="w-full h-full border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          </div>
                          Analyzing Plant...
                          {uploadProgress > 0 && (
                            <span className="ml-2 font-normal">
                              ({uploadProgress}%)
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-6 h-6 mr-3" />
                          Start AI Analysis
                        </>
                      )}
                    </button>
                  </div>

                  {/* Results Section */}
                  <div className="space-y-6">
                    {/* Loading State */}
                    {isLoading && (
                      <div className="text-center py-12">
                        <div className="relative mx-auto w-20 h-20 mb-6">
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl opacity-20"></div>
                          <div className="absolute inset-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                            <Leaf className="w-8 h-8 text-white animate-pulse" />
                          </div>
                          <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-2xl animate-spin"></div>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">
                          Neural Network Processing
                        </h3>
                        <p className="text-slate-600 mb-6">
                          Our AI is analyzing botanical features...
                        </p>
                        {uploadProgress > 0 && (
                          <div className="max-w-xs mx-auto">
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-sm font-medium text-slate-600">
                                Analysis Progress
                              </span>
                              <span className="text-sm font-bold text-emerald-600">
                                {uploadProgress}%
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Error State */}
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="w-6 h-6 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-red-900 mb-2">
                              Analysis Error
                            </h3>
                            <p className="text-red-700 mb-4">{error}</p>
                            <button
                              onClick={() => setError(null)}
                              className="text-sm font-medium text-red-600 hover:text-red-800 underline"
                            >
                              Try again
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Success Results */}
                    {result && (
                      <div className="space-y-6">
                        {/* Success Header */}
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-4">
                            <CheckCircle className="w-10 h-10 text-emerald-600" />
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-2">
                            Plant Identified
                          </h3>
                          <p className="text-slate-600">
                            Analysis completed with high confidence
                          </p>
                        </div>

                        {/* Primary Result Card */}
                        {result.prediction.predictions.length > 0 && (
                          <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-2 border-emerald-200 rounded-2xl p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 rounded-full -translate-y-16 translate-x-16"></div>

                            <div className="relative">
                              <div className="flex items-start justify-between mb-6">
                                <div className="flex-1">
                                  <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-3">
                                      <Award className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-sm font-bold text-emerald-800 uppercase tracking-wider">
                                      Primary Match
                                    </span>
                                  </div>

                                  <h4 className="text-3xl font-bold text-slate-900 mb-3">
                                    {
                                      result.prediction.predictions[0]
                                        .plant_name
                                    }
                                  </h4>

                                  <p className="text-lg text-slate-600 italic mb-2">
                                    {
                                      result.prediction.predictions[0]
                                        .scientificName
                                    }
                                  </p>

                                  <p className="text-slate-500 font-medium">
                                    Family:{" "}
                                    {result.prediction.predictions[0].family}
                                  </p>
                                </div>

                                <div className="text-center">
                                  <div
                                    className={`inline-flex items-center px-6 py-3 rounded-2xl font-bold text-lg border-2 ${plantService.getConfidenceBadge(
                                      result.prediction.predictions[0]
                                        .confidence
                                    )}`}
                                  >
                                    <TrendingUp className="w-5 h-5 mr-2" />
                                    {
                                      result.prediction.predictions[0]
                                        .confidence_percentage
                                    }
                                    %
                                  </div>
                                  <p className="text-sm text-slate-500 mt-2 font-medium">
                                    Confidence
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Alternative Matches */}
                        {result.prediction.predictions.length > 1 && (
                          <div className="bg-white border border-slate-200 rounded-2xl p-6">
                            <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                              <Star className="w-5 h-5 mr-3 text-slate-600" />
                              Alternative Possibilities
                            </h4>
                            <div className="space-y-3">
                              {result.prediction.predictions
                                .slice(1, 4)
                                .map((pred, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between items-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200"
                                  >
                                    <div>
                                      <p className="font-semibold text-slate-900">
                                        {index + 2}. {pred.plant_name}
                                      </p>
                                      <p className="text-sm text-slate-600 italic">
                                        {pred.scientificName}
                                      </p>
                                    </div>
                                    <div
                                      className={`px-3 py-1 rounded-lg font-bold ${
                                        pred.confidence > 0.3
                                          ? "bg-emerald-100 text-emerald-700"
                                          : pred.confidence > 0.1
                                          ? "bg-yellow-100 text-yellow-700"
                                          : "bg-slate-100 text-slate-600"
                                      }`}
                                    >
                                      {pred.confidence_percentage}%
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Medicinal Information Section */}
        {result && (
          <div className="max-w-6xl mx-auto mt-12 space-y-8">
            {/* Information Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Medicinal Uses */}
              {result.prediction.predictions[0].medicinalUses && (
                <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                      <Leaf className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900">
                      Medicinal Properties
                    </h4>
                  </div>
                  <div className="space-y-4">
                    {result.prediction.predictions[0].medicinalUses.map(
                      (use, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-slate-700 leading-relaxed">
                            {use}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Preparation */}
              {result.prediction.predictions[0].preparation && (
                <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4">
                      <BookOpen className="w-6 h-6 text-amber-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900">
                      Preparation Method
                    </h4>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {result.prediction.predictions[0].preparation}
                  </p>
                </div>
              )}
            </div>

            {/* Precautions */}
            {result.prediction.predictions[0].precautions && (
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/60 rounded-2xl p-8 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-red-900 mb-4">
                      Safety Precautions
                    </h4>
                    <p className="text-red-800 leading-relaxed text-lg">
                      {result.prediction.predictions[0].precautions}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {result.prediction.recommendedActions && (
              <div className="bg-slate-50/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-8 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Info className="w-6 h-6 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">
                      Expert Recommendations
                    </h4>
                    <div className="space-y-4">
                      {result.prediction.recommendedActions.map(
                        (action, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-slate-700 leading-relaxed">
                              {action}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* Professional Tips Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                <Info className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">
                Best Practices for Accurate Results
              </h4>
              <p className="text-slate-600">
                Follow these guidelines for optimal plant identification
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-6 h-6 text-emerald-600" />
                </div>
                <h5 className="font-bold text-slate-900 mb-3">Image Quality</h5>
                <ul className="text-slate-600 space-y-2 text-sm">
                  <li>• High resolution photos</li>
                  <li>• Good lighting conditions</li>
                  <li>• Sharp, focused images</li>
                </ul>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-6 h-6 text-amber-600" />
                </div>
                <h5 className="font-bold text-slate-900 mb-3">
                  Plant Features
                </h5>
                <ul className="text-slate-600 space-y-2 text-sm">
                  <li>• Include leaves clearly</li>
                  <li>• Show distinctive patterns</li>
                  <li>• Capture multiple angles</li>
                </ul>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h5 className="font-bold text-slate-900 mb-3">Safety First</h5>
                <ul className="text-slate-600 space-y-2 text-sm">
                  <li>• Consult experts always</li>
                  <li>• Never consume unknown plants</li>
                  <li>• Check for allergies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantIdentification;
