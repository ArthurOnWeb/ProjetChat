# -*- coding: utf-8 -*-
"""
Created on Thu Feb 22 10:31:38 2024

@author: hp
"""
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import redis
from pymongo import MongoClient
import os
from bson import ObjectId

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})  # Activer CORS pour le port 4200
PORT = int(os.environ.get('PORT', 3000))

# Connect to MongoDB
app.config['MONGO_URI'] = 'mongodb://localhost:27017/info834'
mongo = PyMongo(app)
client = MongoClient('mongodb://localhost:27017/')
db = client['info834']
collection_conversations = db['chats']
# Connect to Redis
redis_client = redis.StrictRedis(host='localhost', port=6379, decode_responses=True)

# Endpoint pour vérifier l'authentification
@app.route('/authentification', methods=['POST'])
def verifier_authentification():
    utilisateur_data = request.json
    if utilisateur_data:
        # Récupérer les informations d'authentification
        email = utilisateur_data.get('email')
        mot_de_passe = utilisateur_data.get('mot_de_passe')

        # Vérifier les informations d'authentification dans MongoDB
        utilisateur = mongo.db.utilisateurs.find_one({'email': email, 'mot_de_passe': mot_de_passe})
        if utilisateur:
            # Convertir ObjectId en chaîne et utiliser la chaîne pour la clé Redis
            # redis_client.set(str(utilisateur['_id']), 'connecté')
            return jsonify({'message': 'Authentification réussie', 'utilisateur_id': str(utilisateur['_id'])}), 200
        else:
            return jsonify({'error': 'Email ou mot de passe incorrect'}), 401
    else:
        return jsonify({'error': 'Les données d\'authentification sont requises'}), 400


# Endpoint pour créer un utilisateur
@app.route('/utilisateurs', methods=['POST'])
def creer_utilisateur():
    utilisateur_data = request.json
    if utilisateur_data:
        # Vérifier si l'utilisateur existe déjà dans la base de données
        utilisateur_existant = mongo.db.utilisateurs.find_one({"email": utilisateur_data["email"]})
        if utilisateur_existant:
            return jsonify({'message': 'Cet utilisateur existe déjà', 'id': str(utilisateur_existant["_id"])}), 400
        else:
            # Insérer l'utilisateur dans la base de données MongoDB
            result = mongo.db.utilisateurs.insert_one(utilisateur_data)
            # Retourner l'ID de l'utilisateur créé
            return jsonify({'message': 'Utilisateur créé avec succès', 'id': str(result.inserted_id)}), 201
    else:
        return jsonify({'error': 'Les données de l\'utilisateur sont requises'}), 400
    
    
# Endpoint pour envoyer un message
@app.route('/chats/<conversation_id>/messages', methods=['POST'])
def envoyer_message(conversation_id):
    message_data = request.json
    if message_data:
        # Insérer le message dans la conversation spécifiée dans la base de données MongoDB
        result = mongo.db.chats.update_one(
            {'_id': ObjectId(conversation_id)},
            {'$push': {'messages': message_data}}
        )
        if result.modified_count == 1:
            return jsonify({'message': 'Message envoyé avec succès'}), 201
        else:
            return jsonify({'error': 'Conversation introuvable'}), 404
    else:
        return jsonify({'error': 'Les données du message sont requises'}), 400

@app.route('/chats', methods=['POST'])
def creer_conversation():
    try:
        # Récupérer les données de la requête
        data = request.json
        participants = data.get('participants')  # Liste des participants à la conversation

        # Créer une nouvelle conversation
        chats= {
            'participants': participants,
            'messages': []  # Initialiser la liste des messages à vide
        }

        # Insérer la conversation dans la base de données
        result = collection_conversations.insert_one(chats)

        # Retourner l'ID de la conversation créée
        return jsonify({'message': 'Conversation créée avec succès', 'id': str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/utilisateurs/noms', methods=['GET'])
def recuperer_noms_utilisateurs():
    try:
        # Récupérer tous les utilisateurs de la base de données
        utilisateurs = mongo.db.utilisateurs.find({}, {"email": 1, "_id": 0})
        
        # Extraire les emails (ou noms) des documents MongoDB et les stocker dans une liste
        noms_utilisateurs = [utilisateur["email"] for utilisateur in utilisateurs]
        
        # Retourner la liste des noms d'utilisateurs
        return jsonify({'utilisateurs': noms_utilisateurs}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/chats/participants', methods=['POST'])
def verifier_conversation():
    try:
        # Récupérer les données de la requête
        data = request.json
        participants = data.get('participants')  # Liste des participants à vérifier dans la conversation

        # Rechercher une conversation avec les deux participants dans la base de données
        conversation = collection_conversations.find_one({'participants': participants})

        if conversation:
            return jsonify({'message': 'La conversation existe', 'conversation_id': str(conversation['_id'])}), 200
        else:
            return jsonify({'message': 'La conversation n\'existe pas'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# Start the server
if __name__ == '__main__':
    app.run(port=PORT)

