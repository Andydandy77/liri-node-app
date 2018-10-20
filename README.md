### Liri Node App

## Summary
This command line application allows the user to either, discover where an artist or band is playing using the bandsintown API, 
display a song's information using the Spotify API, or display a movie's information using the OMDB API. This application utilizes 
node to call API's without using a CDN. 

## Instructions

To search shows for a band the user needs to type in the command line:

``` 
node liri.js concert-this (Artist Name)
```

Once the user submits this request:

![Alt text](concert.png?raw=true "Concert request screenShot")

To search a song and its information the user needs to type in the command line:

``` 
node liri.js spotify-this-song (Song Name)
```
Once the user submits this request:

![Alt text](spotify.png?raw=true "Song request screenShot")

If the user doesn't specify a song, it defaults to:

![Alt text](spotify-default.png?raw=true "Song request screenShot")

To search a movie and its information the user needs to type in the command line:

``` 
node liri.js movie-this (Movie Name)
```
Once the user submits this request:

![Alt text](movie.png?raw=true "movie request screenShot")

If the user doesn't specify a movie, it defaults to:

![Alt text](movie-default.png?raw=true "movie request screenShot")

To read from a text file and execute the request, the user submits this request:

![Alt text](do-what.png?raw=true "movie request screenShot")


## Logging 

Every time a user submits a request, liri logs the results to log.txt

Here is a screenshot of what that log file looks like

![Alt text](log.png?raw=true "movie request screenShot")

## Languages, Libraries, and API's Used

Javascript, Node, Bandsintown, OMDB, Spotify API








