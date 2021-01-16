# GeoTunes
![](https://media.giphy.com/media/GtMx4U2JkHYSqR1xLF/giphy.gif)

[Video Demo](https://www.loom.com/share/0b41eeabdbd84459a0bfe0c43a16348e?sharedAppSource=personal_library)

## Brief Summary: 
GeoTunes was a collaboration project with Val(https://github.com/valnuccio) after our 4th Module(react) at the flatiron bootcamp. We had one week to try put our new react skills to work! Our goal was to build a webApp that would enable users to attach thier Spotify playlists to a route on a shared google map. Users can preview each others routes/playlists and also listen to them/ get walking directions. Users may also favorite routes for easy access and edit their own routes.

## Installation:
* First, clone the project directory

  ### Backend Steps:
  * cd into folder 'backend'
  * run 'bundle install'
  * run 'rails db:create'
  * Note: if using WSL you may need to run 'sudo service postgresql start' prior to 'rails db:create'
  * If you want demo users/posts/comments/relationships run 'rails db:seed'
  * run 'rails s -p 4000' to run the backend server
  * note this frontEnd expects the server to be on port 4000 so dont forget the '-p'!

  ### Frontend Steps
  * cd into folder 'frontend'
  * run 'npm i'
  * run 'npm start'
  * agree when prompted to run on port 3000
  * you can now access the web app locally at: http://localhost:3000/
  
  ### API Setup
  #### Note: In order for the app to work you will need to setup the following API'S by following these intructions:
  * inside the 'frontend' directory creat a .env file
  * get a client key from spotify here: https://developer.spotify.com/dashboard/login
  * spotify dashboard will need a callBack URL to http://localhost:3000/home
  * inside the .env file add: REACT_APP_SPOT='your key here dont include the quotes'
  
  * get a api key from google here: https://console.developers.google.com/apis/dashboard
  * you will need to make sure google maps have the following sub-apis turned on: googleMaps, placesAPi, geoLocationAPI, directionsAPi
  * inside the the .env file add: REACT_APP_GMK='your key here dont include the quotes'
  * you can now access the web app locally at: http://localhost:3000/
  
## Resources Used:
* https://rubyonrails.org/
* https://reactjs.org/
* https://www.npmjs.com/package/google-maps-react
* https://www.npmjs.com/package/react-spotify-web-playback
* https://www.npmjs.com/package/spotify-web-api-node
