# -*- coding: utf-8 -*-
"""
Created on Thu Feb 22 10:40:26 2024

@author: hp
"""

import requests
import json

# Données d'authentification à envoyer
auth_data = {
    "email": "alice@example.com",
    "mot_de_passe": "motdepasse123"
}

# URL de l'endpoint d'authentification
url = 'http://localhost:3000/authentification'

# Envoi de la requête POST avec les données d'authentification
response = requests.post(url, json=auth_data)

# Affichage de la réponse
print(response.json())



'''
# Données de l'utilisateur à envoyer
utilisateur_data = {
    "nom": "Alice",
    "email": "alice@example.com",
    "mot_de_passe": "motdepasse123"
}

# URL de l'endpoint
url = 'http://localhost:3000/utilisateurs'

# Envoi de la requête POST avec les données JSON de l'utilisateur
response = requests.post(url, json=utilisateur_data)

# Données du message à envoyer
message_data = {
    "expediteur": {"_id": "65d716d6bf13b296b7109749", "nom": "Alice"},
    "contenu": "Salut Bob, comment ça va ?",
    "timestamp": "2024-02-21T12:00:00Z"
}

# ID de la conversation
conversation_id = "conversation1"

# URL de l'endpoint
url = f'http://localhost:3000/chats/{conversation_id}/messages'

# Envoi de la requête POST avec les données JSON du message
response = requests.post(url, json=message_data)

'''

