# CycloBuddy - the final Ironhack Openbank Bootcamp project

It's an individual full stack app project where I applied all the knowledge of Java, Rest API, MySQL and React gained during the Bootcamp.


## Description

CycloBuddy is an APP orientated to cyclist who would like to know other like minded people and go bicycle riding together. Cyclists are the users of the app, they can sign up, log in, create a user profile, create/edit/delete the rides and add routes to the rides. Users can set the meeting place, date, time and a photo of the ride so others can easily decide if that ride suits their needs.

## Technologies used

This repository contains the front-end part of the project.
It contains HTML, CSS and JS code, React library is being used.

Trello is being used for easier organization (https://trello.com/b/SsztL2kH/cyclobuddy).

## Components and Pages structure

List of components: AddRide, AddRoute, EditProfile, Footer, IsAnon, IsPrivate, Navbar, Sidebar.

List of pages: AllRidesPage, AllRoutesPage, EditRidePage, HomePage, LoginPage, MainPage, MyProfilePage, MyRidesPage, MyRoutesPage, RideDetailsPage, SigninPage.

Context list: auth.context.

There are some public routes leading to such pages as sign up, login and home page.

There are also some private routes leading to all rides list page, all routes page, my rides page, my routes page, my profile page, home page.

All the pages contain the navbar and footer component. 

The pages which need authentification and authorization contain sidebar component as well.

## Demo

![plot](readme-gif.gif)

## Future Works

It would be great to work on more front-end functionality. 

Such funcionalities would be great to add:
 - search bars (by date, time, location)
 -  link to the ride organizer profile
 -  calendar with the planned rides
 - map where the route or the meeting point would be shown.

 ## Resources

[CSS basics](https://www.w3schools.com/html/html_css.asp)

[Flexbox guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

[React documentation](https://reactjs.org/)

[React Router](https://reactrouter.com/)

[Ant design](https://ant.design/)