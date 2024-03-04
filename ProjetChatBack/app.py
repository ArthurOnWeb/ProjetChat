# -*- coding: utf-8 -*-
"""
Created on Thu Feb 22 10:31:38 2024

@author: hp
"""
import os
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
import redis
from pymongo import MongoClient

app = Flask(__name__)
PORT = int(os.environ.get('PORT', 3000))

# Connect to MongoDB
app.config['MONGO_URI'] = 'mongodb://localhost:27017/info834'
mongo = PyMongo(app)
client = MongoClient('mongodb://localhost:27017/')
db = client['votre_base_de_donnees']
collection_conversations = db['conversations']
# Connect to Redis
redis_client = redis.StrictRedis(host='localhost', port=6379, decode_responses=True)

# Endpoint pour vérifier l'authentification
# Endpoint pour vérifier l'authentification
@app.route('/authentification', methods=['POST'])
def verifier_authentification():
    data = request.json
    if data:
        # Récupérer les informations d'authentification
        email = data.get('email')
        mot_de_passe = data.get('mot_de_passe')

        # Vérifier les informations d'authentification dans MongoDB
        utilisateur = mongo.db.utilisateurs.find_one({'email': email, 'mot_de_passe': mot_de_passe})
        if utilisateur:
            # Convertir ObjectId en chaîne et utiliser la chaîne pour la clé Redis
            redis_client.set(str(utilisateur['_id']), 'connecté')
            return jsonify({'message': 'Authentification réussie', 'utilisateur_id': str(utilisateur['_id'])}), 200
        else:
            return jsonify({'error': 'Email ou mot de passe incorrect'}), 401
    else:
        return jsonify({'error': 'Les données d\'authentification sont requises'}), 400


# Endpoint pour créer un utilisateur
 

# Endpoint pour envoyer un message
@app.route('/chats/<conversation_id>/messages', methods=['POST'])
def envoyer_message(conversation_id):
    message_data = request.json
    if message_data:
        # Insérer le message dans la conversation spécifiée dans la base de données MongoDB
        result = collection_conversations.update_one(

            {'_id': conversation_id},
            {'$push': {'messages': message_data}}
        )
        # Vérifier si la mise à jour a réussi
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
        conversation = {
            'participants': participants,
            'messages': []  # Initialiser la liste des messages à vide
        }

        # Insérer la conversation dans la base de données
        result = collection_conversations.insert_one(conversation)

        # Retourner l'ID de la conversation créée
        return jsonify({'message': 'Conversation créée avec succès', 'id': str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
# Start the server
if __name__ == '__main__':
    app.run(port=PORT)

