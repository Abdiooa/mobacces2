from flask import Flask, request, jsonify
import numpy as np
import cv2
from tensorflow.keras.models import load_model
import os

# Set environment to suppress TensorFlow logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

# Charger le modèle
model = load_model("modele_billets_ameliore.h5")

# Définir les noms des classes
class_names = [
    'Ceci est une billet de 1000 franc',
    'Ceci est une billet de 10000 franc',
    'Ceci est une billet de 2000 franc',
    'Ceci est une billet de 5000 franc',
    'Ceci est une pièces de 10 franc',
    'Ceci est une pièces de 100 franc',
    'Ceci est une pièces de 20 franc',
    'Ceci est une pièces de 250 franc',
    'Ceci est une pièces de 50 franc',
    'Ceci est une pièces de 500 franc'
]

# Créer l'application Flask
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    """
    Endpoint pour traiter une image et retourner la prédiction.
    """
    if 'image' not in request.files:
        return jsonify({"error": "Aucune image n'a été envoyée."}), 400

    # Récupérer l'image depuis la requête
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "Le fichier est vide."}), 400

    try:
        # Lire l'image
        file_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        # Prétraiter l'image
        img_height, img_width = 224, 224  # Dimensions utilisées pour entraîner le modèle
        image_resized = cv2.resize(image, (img_width, img_height))
        image_normalized = image_resized / 255.0  # Normalisation
        image_input = np.expand_dims(image_normalized, axis=0)  # Ajouter une dimension batch

        # Prédiction
        predictions = model.predict(image_input)
        confidence_score = np.max(predictions)  # Récupérer la probabilité maximale
        predicted_class = np.argmax(predictions)  # Récupérer l'indice de la classe prédite

        # Résultat
        if confidence_score < 0.2:  # Si la confiance est inférieure à 20%
            return jsonify({
                "prediction": "Ce n'est pas un billet Djiboutien",
                "confidence": f"{confidence_score:.2%}"
            })
        else:
            return jsonify({
                "prediction": class_names[predicted_class],
                "confidence": f"{confidence_score:.2%}"
            })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/')
def home():
    return "Bienvenue sur votre API Flask !"

if __name__ == '__main__':
    host = '192.168.177.157'
    port = 5000
    print(f"Le serveur est en cours d'exécution sur l'adresse IP {host} et le port {port}.")
    app.run(host=host, port=port, debug=True)
