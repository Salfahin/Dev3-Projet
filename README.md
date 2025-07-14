# How to launch the project

## Building the Next.js application

To start with, you need to have node.js installed on your system. Refer to the instructions on this page to do this: [Node.js - Download Node.js®](https://nodejs.org/en/download). Make sure that the application uses :

1. Version 22.17.0 LTS ;

2. nvm ;

3. pnpm.

<img width="829" height="627" alt="image" src="https://github.com/user-attachments/assets/c88cbb70-f7fd-4743-b8d0-cbe346ce1173" />

Then refer to the following instructions to launch the application: [Getting Started: Installation | Next.js](https://nextjs.org/docs/app/getting-started/installation). At the `npx create-next-app@latest` step, choose these options:

<img width="624" height="142" alt="image" src="https://github.com/user-attachments/assets/207016e9-6948-4eec-875d-7ddad36621c6" />

If all goes well, a directory with the following structure should have been created:

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

## Starting the development server

Make sure that your terminal is in the directory bearing the project name. Run the `pnpm install` command to install all the dependencies listed in `package.json`.

Once the download is complete, simply type the command `pnpm run dev` to launch the server.

<img width="626" height="192" alt="image" src="https://github.com/user-attachments/assets/372fef31-fb58-4c95-833f-dc72b605c369" />

Normally, visiting one of the addresses listed (Local or Network) will take you to this page:

<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/058cdb02-53c0-42c9-9384-53acd4555e85" />
