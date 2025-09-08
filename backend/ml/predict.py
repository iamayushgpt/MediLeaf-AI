#!/usr/bin/env python3
"""
MediLeaf Plant Identification Model
Python script for running Keras model predictions
"""

import sys
import json
import numpy as np
import tensorflow as tf
from tensorflow import keras
from PIL import Image
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class PlantIdentifier:
    def __init__(self, model_path):
        """Initialize the plant identifier with model path"""
        self.model_path = model_path
        self.model = None
        self.class_names = None
        self.load_model()
        self.load_class_names()
    
    def load_model(self):
        """Load the trained Keras model"""
        try:
            self.model = keras.models.load_model(self.model_path)
            logger.info(f"Model loaded successfully")
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
            raise
    
    def load_class_names(self):
        """Load class names (plant names) - you'll need to customize this"""
        # CRITICAL: Class names MUST be in the SAME ORDER as during training
        # If you trained with ImageDataGenerator.flow_from_directory(), 
        # the order is typically alphabetical by folder name
        
        # Version 1: Current alphabetical order (may be wrong)
        self.class_names = [
            'Aloevera', 'Amla', 'Amruthaballi', 'Arali', 'Astma_weed', 'Badipala',
            'Balloon_Vine', 'Bamboo', 'Beans', 'Betel', 'Bhrami', 'Bringaraja',
            'Caricature', 'Castor', 'Catharanthus', 'Chakte', 'Chilly',
            'Citron lime (herelikai)', 'Coffee', 'Common rue(naagdalli)', 'Coriender',
            'Curry', 'Doddpathre', 'Drumstick', 'Ekka', 'Eucalyptus', 'Ganigale',
            'Ganike', 'Gasagase', 'Ginger', 'Globe Amarnath', 'Guava', 'Henna',
            'Hibiscus', 'Honge', 'Insulin', 'Jackfruit', 'Jasmine', 'Kambajala',
            'Kasambruga', 'Kohlrabi', 'Lantana', 'Lemon', 'Lemongrass', 'Malabar_Nut',
            'Malabar_Spinach', 'Mango', 'Marigold', 'Mint', 'Neem', 'Nelavembu',
            'Nerale', 'Nooni', 'Onion', 'Padri', 'Palak(Spinach)', 'Papaya',
            'Parijatha', 'Pea', 'Pepper', 'Pomoegranate', 'Pumpkin', 'Raddish',
            'Rose', 'Sampige', 'Sapota', 'Seethaashoka', 'Seethapala', 'Spinach1',
            'Tamarind', 'Taro', 'Tecoma', 'Thumbe', 'Tomato', 'Tulsi', 'Turmeric',
            'ashoka', 'camphor', 'kamakasturi', 'kepala'
        ]
        
        # TODO: Replace with your actual training class order
        # Check your training folder structure or training script
        
        logger.info(f"Loaded {len(self.class_names)} plant classes")
        
        # If you have a classes.json file from training, uncomment this:
        # try:
        #     with open('classes.json', 'r') as f:
        #         self.class_names = json.load(f)
        #     logger.info("Loaded class names from classes.json")
        # except FileNotFoundError:
        #     logger.warning("classes.json not found, using default class names")
    
    def preprocess_image(self, image_path, target_size=(299, 299)):
        """Preprocess image for model prediction"""
        try:
            # Load and resize image
            image = Image.open(image_path)
            
            # Convert to RGB if necessary
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # Resize image
            image = image.resize(target_size)
            
            # Convert to numpy array
            image_array = np.array(image)
            
            # CRITICAL FIX: Your model was trained with NO NORMALIZATION
            # tf.keras.preprocessing.image_dataset_from_directory uses raw pixel values (0-255)
            # DO NOT normalize - keep original pixel values
            image_array = image_array.astype(np.float32)
            
            # NO NORMALIZATION - model expects 0-255 range
            # This matches your training: tf.keras.preprocessing.image_dataset_from_directory
            # which doesn't apply normalization by default
            
            # Add batch dimension
            image_array = np.expand_dims(image_array, axis=0)
            
            return image_array
            
        except Exception as e:
            logger.error(f"Error preprocessing image: {str(e)}")
            raise
    
    def predict(self, image_path, top_k=5):
        """Make prediction on the image"""
        try:
            # Preprocess image
            processed_image = self.preprocess_image(image_path)
            
            # Make prediction
            predictions = self.model.predict(processed_image, verbose=0)
            
            # Get prediction probabilities
            probabilities = predictions[0]
            
            # Get top k predictions
            top_indices = np.argsort(probabilities)[-top_k:][::-1]
            
            results = []
            for i, idx in enumerate(top_indices):
                class_name = self.class_names[idx] if idx < len(self.class_names) else f"Class_{idx}"
                confidence = float(probabilities[idx])
                
                results.append({
                    "rank": i + 1,
                    "plant_name": class_name,
                    "confidence": confidence,
                    "confidence_percentage": round(confidence * 100, 2)
                })
            
            return {
                "success": True,
                "predictions": results,
                "total_classes": len(self.class_names),
                "image_processed": True
            }
            
        except Exception as e:
            logger.error(f"Prediction error: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "image_processed": False
            }

def main():
    """Main function to handle command line arguments"""
    if len(sys.argv) != 3:
        print(json.dumps({
            "success": False,
            "error": "Usage: python predict.py <model_path> <image_path>",
            "image_processed": False
        }))
        sys.exit(1)
    
    model_path = sys.argv[1]
    image_path = sys.argv[2]
    
    # Validate inputs
    if not os.path.exists(model_path):
        print(json.dumps({
            "success": False,
            "error": f"Model file not found: {model_path}",
            "image_processed": False
        }))
        sys.exit(1)
    
    if not os.path.exists(image_path):
        print(json.dumps({
            "success": False,
            "error": f"Image file not found: {image_path}",
            "image_processed": False
        }))
        sys.exit(1)
    
    try:
        # Initialize plant identifier
        identifier = PlantIdentifier(model_path)
        
        # Make prediction
        result = identifier.predict(image_path)
        
        # Output result as JSON
        print(json.dumps(result))
        
    except Exception as e:
        print(json.dumps({
            "success": False,
            "error": f"Unexpected error: {str(e)}",
            "image_processed": False
        }))
        sys.exit(1)

if __name__ == "__main__":
    main()
