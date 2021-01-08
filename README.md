Project Title: GeoTunes

Description: GeoTunes was a one week project developed by https://github.com/valnuccio and myself after our React unit at the Flatiron Bootcamp. Our goal was to enable users to
              attach their spotify playlists to google maps routes on glolbal shared map.
              
              
Demo Vid: https://www.loom.com/share/0b41eeabdbd84459a0bfe0c43a16348e?sharedAppSource=personal_library


How to setup:

Note: Your going to need a spotify api key and a google maps key. Both keys should be saved in a .env file inside the frontend folder.
      They should be named as: REACT_APP_GMK=yourGoogleMapsKey REACT_APP_SPOT=yourSpotifyClientID
      
      google maps will need the following apis enabled: googleMaps, placesAPi, geoLocationAPI, directionsAPi
      
      spotify dashboard will need a callBack URL to http://localhost:3000/home
      
      
clone the project

cd into backend directory

run: bundle install

run: rails db:create

if you want sample users/posts/likes/follows run: rails db:seed

run rails s -p 4000
IMPORTANT: server should be on port 400

cd into frontend directory

run: npm install

run: npm start

