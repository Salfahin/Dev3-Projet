# Tutoriel pour se lancer

## Construction de l'application Next.js

Pour commencer, il faut que node.js soit installé sur le systěme. Se référer aux instructions sur cette page-ci pour le faire : [Node.js — Download Node.js®](https://nodejs.org/en/download). Bien s'assurer que l'application utilise :

1. La version 22.17.0 LTS ;

2. nvm ;

3. pnpm.

(Note : Sur Windows il se peut que ce soit légèrement différent mais du moment que c'est la version 22.17 LTS et pnpm, c'est bon)

<img width="829" height="627" alt="image" src="https://github.com/user-attachments/assets/c88cbb70-f7fd-4743-b8d0-cbe346ce1173" />

Ensuite, se référer aux instructions suivantes pour lancer l'application : [Getting Started: Installation | Next.js](https://nextjs.org/docs/app/getting-started/installation). À l'étape `npx create-next-app@latest`, choisir ces options :

<img width="624" height="142" alt="image" src="https://github.com/user-attachments/assets/207016e9-6948-4eec-875d-7ddad36621c6" />

Si tout se passe bien, un répertoire ayant la structure suivante devrait avoir été créé :

```shell
projet_dev3_aout/  
├── next.config.ts  
├── next-env.d.ts  
├── node_modules  
├── package.json  
├── package-lock.json  
├── postcss.config.mjs  
├── public  
├── README.md  
├── src  
└── tsconfig.json
```

## Démarrage du serveur de développement

S'assurer que votre terminal est bien dans le répertoire portant le nom du projet.

Exécuter la commande `pnpm install` de sorte à installer toutes les dépendences listées dans `package.json` pour le serveur.

Une fois le téléchargement effectué, simplement taper la commande `pnpm run dev` pour lancer le serveur de développement.

<img width="626" height="192" alt="image" src="https://github.com/user-attachments/assets/372fef31-fb58-4c95-833f-dc72b605c369" />

Normalement, visiter l'une des adresses listées (Local ou Network) mènera à cette page-ci :

<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/058cdb02-53c0-42c9-9384-53acd4555e85" />

Pour stopper le serveur, un Ctrl+C fera l'affaire et pour ensuite le relancer à l'avenir, il suffira de retaper la commande `pnpm run dev`.
