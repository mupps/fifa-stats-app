# FIFA Stats Comparison App 
A repository for the final project for CIS450, adapted to be public.
My main responsibilities were in developing the frontend pages and login state system. See project outline for details.

## Contibutors
Armaan Uppal, Ali Krema, Julia Kafozoff, Alejandro Resendiz

## Description
This application serves as an interface for FIFA players that allows them to find different statistics and information about players, nations, and clubs in FIFA22 and FIFA17. Some of the data is being processed to cover only FIFA22, since it is the currently active game, as in top players, most expensive players, top players by attribute, etc. Other features, however, which represent the majority of this application, use the intersection of the two datasets to produce interesting facts about the last 5 years of FIFA: differences in wage, top important attributes, average overall rating of national teams in 2017 vs 2022, etc. The information in the two datasets, FIFA22 and FIFA17, allow for a space of creativity in queries and, thus, services provided to the user.

## How To Run
In order to run the application, please first CD to the server/ directory. Create a .env file for the variable "MONGO_URI" in the server folder. Additionally, add the MySQL Database credentials (in server/routes.js) as well as the port and IP for the backend to run on.

Once the credentials are properly inputted, please CD back to the root of the server/ directory, and run npm install. Once this is completed, the backend (server) can be run using npm start.

Next, open another command-line window and CD to the client/ directory, and run npm install. Once this is completed, the frontend (client) can be run using npm start. The application can now be accessed at http://localhost:3000/.