# ReqUML Diagrams GUI

This is the diagrams GUI of the ReqUML application whose main role is to render the UML class diagram and use case diagrams based on the results of analysis retrieved from the database in a JSON format.


# Installation

Run the following command to install all the packages required to start the server. These are all open-source MIT-licenced packages that are core for Express.js (Node.js) applications.
> npm install

  
## Environment variables

These are the environment variable required to run the application:
> PUBLIC_API= (URL of the public server API)

# Running the server

To run the application after installing the packages and filling in the environment variables with correct values, run the following command:
> npm start
  

# Route Endpoints

> GET /uc/:ucParam

This route invokes a function that contacts the public server API to obtain the analysed use cases for a specific order based on the unique parameter and renders the client-side page with the UML diagrams. 

> GET /class/:classParam

This route invokes a function that contacts the public server API to obtain the analysed classes for a specific order based on the unique parameter and renders the client-side page with the UML diagram.

> GET /error

This route invokes a function that renders the error page.


# Folder structure and files

Folder *controllers* contains files with functions that are invoked when a certain route endpoint is called. Files:

 1. diagrams.js: contains the functions that render the client-side pages with UML class diagrams and use case diagrams

Folder *public* contains folders and files that the client-side application has access to when rendering the page in the browser:

 1. media: contains PNG and SVG files that appear on the website. The SVGs were imported from a website that provides royalty free graphics: https://2.flexiple.com/scale/all-illustrations
 2. scripts: contains front-end JavaScript code that uses Fabric.min.js to render UML diagrams in the canvas > class-diagram.js, uc-diagrams.js, fabric.min.js
 3. styles.css: the style sheets of the front-end website

Folder *routes* contains a file that defines the routes of the website and the specific functions that are invoked when a route is called. Files:

 1. routes.js: contains all the server routes available and the call to *controller* functions that handle the request and website rendering

Folder *views* contains EJS files which are HTML pages with embedded JavaScript code executed before the website is rendered to the client side. Files:

 1. class-diagrams.ejs: an HTML/EJS webpage where a UML class diagram is drawn 
 2. uc-diagrams.ejs: an HTML/EJS webpage where UML use case diagrams are drawn
 3. error.ejs:  an HTML/EJS webpage where an error message is rendered

*Root* folder mostly contains core Express.js files required for the normal operation of the application. Files:

 1. .env: contains all environment variables of the application
 2. .gitignore: contains a list of folders and files that should not be pushed to the Git repository
 3. app.js: the main entry point of the application where the server starts listening on a given port
 4. Avowal.txt: the statement certifying that the project is my own work
 5. package-log.json: Node.js config file
 6. package.json: Node.js config file
 7. README: the current file

 # Deployment

 The website is deployed on Heroku and can be accessed via URL:
 > https://requml-ready.herokuapp.com

 or

 > http://ready.requml.co.uk

 To access the website with diagrams, you need a specific URL that you can obtain via email when the analysis is completed or manually by obtaining the parameter for URL using Postman. Otherwise, you will be redirected to the home GUI: 
 
 > https://requml.co.uk