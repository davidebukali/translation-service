# Kasha Translation Service
It is a language translation service that changes words and phrases from different languages around the world to their meanings in other languages as selected.

## Client Setup and Installation
- Clone the repository to your development server root (www for wampserver) - **git clone git@bitbucket.org:davidserenity/kasha-translation-service.git**
- Navigate to the cloned directory - **cd kasha-translation-service**
- Install dependencies by running - **npm install**
- Build the project and run tests by running - **gulp**
- Project runs at http://localhost/kasha-translation-service

## Server Setup
- Extract **translationAPI.zip** (found inside cloned ./kasha-translation-service) into a folder translationAPI (**www/translationAPI/** client web app uses this location **http://localhost/tranlationAPI/** to save and read completed translations) on your development server root
- Create user, password and database with names **kasha**
- Import database file **translationAPI.sql** to the new kasha database you created


## Copyright and license
MIT license.