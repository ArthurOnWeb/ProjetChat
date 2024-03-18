# -*- coding: utf-8 -*-
"""
Created on Thu Feb 22 10:40:26 2024

@author: hp
"""

import requests
import json
def authentification():
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



def create_user(): 
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
    # Affichage de la réponse
    print(response.json())



def send_message():
    # Données du message à envoyer
    message_data = {
        "expediteur": {"_id": "65e21b432d85d3e960c873e5", "nom": "Tom"},
        "contenu": "weshhh",
        "timestamp": "2024-03-12T19:40:00Z"
    }

    # ID de la conversation
    conversation_id = "65f1816cea929c4893702cba"

 # URL de l'endpoint
    url = f'http://localhost:3000/chats/{conversation_id}/messages'

    # Envoi de la requête POST avec les données JSON du message
    response = requests.post(url, json=message_data)
    # Affichage de la réponse
    print(response.json())



def create_conversation():
    # Données de la conversation à envoyer
    conversation_data = {
        "nom": "Conversation entre Alice et Bob",
        "participants": ["Tom", "Bob"]
    }

    # URL de l'endpoint
    url = 'http://localhost:3000/chats'

    # Envoi de la requête POST avec les données JSON de la conversation
    response = requests.post(url, json=conversation_data)

    # Affichage de la réponse
    print(response.json())
    
import requests

def tester_endpoint_noms_utilisateurs():
    # URL de l'endpoint
    url = 'http://localhost:3000/utilisateurs/noms'

    try:
        # Envoyer la requête GET à l'endpoint
        reponse = requests.get(url)

        # Vérifier que la requête a réussi
        if reponse.status_code == 200:
            # Extraire les données JSON de la réponse
            data = reponse.json()
            print('Liste des utilisateurs récupérée avec succès :')
            for email in data['utilisateurs']:
                print(email)
        else:
            print(f'Erreur lors de la récupération des utilisateurs (code d\'état {reponse.status_code})')
    except Exception as e:
        print(f'Erreur lors de l\'envoi de la requête : {e}')

# Appeler la fonction de test
tester_endpoint_noms_utilisateurs()


if __name__ == "__main__":
    tester_endpoint_noms_utilisateurs()