# Règles de Développement IVOIReXpress

Ces règles ont été établies par l'utilisateur et doivent être respectées scrupuleusement par l'agent IA.

## 1. Respect Strict du Périmètre
- **MODIFICATION EXPLICITE UNIQUEMENT** : Ne modifier que les fichiers, composants ou fonctionnalités explicitement demandés.
- **PAS DE REFACTORISATION SPONTANÉE** : Ne pas améliorer, nettoyer, ou refactoriser de code non concerné par la tâche.
- **PAS DE CHANGEMENT D'ARCHITECTURE** : L'architecture, la base de données (Firebase), l'authentification et les routes sont protégées.

## 2. Procédure avant Modification
1. Identifier précisément les fichiers concernés.
2. Vérifier leur rôle dans l'application.
3. Déterminer les modifications strictement nécessaires.
4. Si une modification hors périmètre semble indispensable, **DEMANDER L'AUTORISATION** avant d'agir.

## 3. Communication
- Si une amélioration est identifiée hors tâche : « J'ai identifié ce point qui pourrait être amélioré, mais il n'est pas concerné par la tâche actuelle. Voulez-vous que je le modifie ? »
- Attendre l'autorisation explicite avant toute action non demandée.

## 4. Modifications d'Interface (UI)
- Pour une demande UI : Modification de l'interface **uniquement**.
- Ne pas toucher au backend, aux API, à Firebase ou aux règles métier sauf instruction contraire.

## 5. Protection de l'Existant
- Ne rien supprimer ou remplacer sans autorisation.
- Considérer l'infrastructure actuelle comme immuable sauf demande de changement.
