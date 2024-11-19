# Étape 1 : Construire l'application React (Vite)
FROM node:18-alpine AS build

# Définir le répertoire de travail pour l'application frontend
WORKDIR /app

# Cloner le dépôt GitHub du frontend
#RUN git clone https://github.com/xavier-massart-vinci/3BIN-Web3-Project-Front.git .

# Copier le package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances du frontend
RUN npm install

# Copier le reste des fichiers du backend
COPY . .

# Construire l'application React en mode production
RUN npm run build




# Étape 2 : Utiliser Nginx pour servir l'application frontend
FROM nginx:alpine

# Copier les fichiers de l'application construite dans le dossier de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Ajouter la configuration personnalisée de Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80 pour Nginx
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]