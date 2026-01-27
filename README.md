# FrameLab Back-end

Le Back-end de FrameLab.

## Mise en place

### Base de données

Le back-end de FrameLab **requiert** une base de **données** MariaDB. Pour ce faire, à l'aide de Docker, mettez en place un conteneur MariaDB avec **sa** dernière image Docker publiée : https://hub.docker.com/_/mariadb

Lancez-le ensuite avec ce fichier `compose.yaml` par défaut, avec les ports ouverts ainsi que les identifiants compatibles avec le fichier `.env.example` du dépôt Git :

```yaml
services:
  db:
    image: mariadb
    restart: always
    environment:
      MARIADB_ROOT_PASSWORD: example
    ports:
      - 3306:3306

  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
```

---

## Donner les droits administrateur à un compte

Cette étape **requiert** l’existence d'un compte déjà créé.

Veuillez vous connecter à l'interface d'administration de la base de données via Adminer à l'adresse locale suivante : `127.0.0.1:8080`

Entrez ensuite vos identifiants. Si vous arrivez sur la liste des tables, sélectionnez **framelab** (sinon passez à la suite). Sélectionnez "select" à gauche de la table **users** dans le menu situé à gauche, puis modifiez l'utilisateur concerné pour passer **sa** valeur **is_admin** à `1`.

---

## Note

D'autres **informations** sont **disponibles** sur le fichier `README.md` du dépôt front-end.
