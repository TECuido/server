# Requerimientos

Para probar el proyecto en local se debe instalar postgres14 y NodeJS en versión igual o superior a la 18.12.1. 

# Para comenzar

En la raíz del proyecto crear un archivo .env con los siguientes elementos:

    NODE_ENV=''
    PORT=3000
    DB_USER=''
    DB_PASSWORD=''
    DB_HOST=''
    DB_NAME=''
    DB_PORT=5432
    DATABASE_URL="postgresql://[username]:[password]@localhost:5432/[database]?schema=public"
    JWT_ACCESS_SECRET=''
    JWT_REFRESH_SECRET=''
    KEY_ID=''
    TEAM_ID=''  

Para las variables JTW_ACCESS_SECRET y JWT_REFRESH_SECRET tomar en cuenta que son las claves para la generación de tokens JWT y se pueden generar con el método que se desee. Las vairables KEY_ID y TEAM_ID se pueden obtener de la cuenta de Apple Developer y son necesarias para la generación de notificaciones remotas.

# Desarrollo

Instalar dependencias del proyecto
    npm install

Iniciar la configuración de la base de datos
    npx prisma migrate dev --name init
    npx prisma db seed

Iniciar el servidor
    npm run start
o bien
    nodemon index.js

En caso de generar cambios que afecten el esquema de la base de datos, como lo es una nueva migración, se deberá ejecutar
    npx prisma migrate deploy
    npx prisma generate

# Deployment

Hasta el momento se ha realizado deployment de la API en render

Para ello es necesario realizar los siguientes pasos.

1. Generar una instancia de base de datos de postgresql
2. Generar una instancia de servidor 
3. Configurar en el servidor de render las variables de entorno anteriormente descritas
4. Realizar el deployment del último commit realizado en Github

Tras realizar un nuevo commit en Github es posible realizar el deployment en Render para tener la versión actualizada del proyecto

