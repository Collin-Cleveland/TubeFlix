# TubeFlix

TubeFlix is a video streaming web application that will allow users to view, post and interact with videos. Users not logged in will be able to browse and watch videos listed on the web application home page. Once registered/signed in, users will be able to like, dislike, comment and upload videos which can be displayed on profile page. Home page may also include tabs in the header to toggle between types of videos (music videos, podcasts, movie trailers, etc…). 

Front-end: A React-based web application that allows users to browse and watch videos. The front-end would make API calls to the back-end to retrieve and display data.

Business layer: A Spring Boot-based application that handles API calls from the front-end, query a MySQL database to retrieve and store data, and potentially integrate with other services such as AWS S3 for storing video files.

Database: A MySQL database that stores data such as user information and video metadata.

AWS S3: Amazon Web Services Simple Storage Service (S3) could be used to store and serve video files for the application. The back-end application would interface with S3 to store and retrieve video files as needed.

Overall, this project would provide a functional clone of the popular streaming service Netflix, with a React-based front-end, a Spring Boot-based business layer, a MySQL database, and potentially integration with AWS S3 for storing and serving video content.
