# Groupon Test

Hello there, my name is Otavio and I developed this small test using the following tech stack:

- NuxtJS
- Tailwind CSS

It really is just very straight forward as it should, we have a base page with an input where you can search for whatever word you want, that input has a debounce of 500ms so that it doesn't trigger the api at every key press.
When you finish typing, the application will make a request to Wikimedia, using the server from NuxtJS (in Node) and will fetch the results, with those results, we display a virtualised list on the frontend where the user can see the results and click on them, which will open the wikipedia page.

# Comments

All the implementation was using Vue3 from Nuxt, along with some libraries like lodash and UseVue, for simplicity and also to speed up things.
I could obviously create the debounce using timeout, etc, but it's just easier and faster with implementations that are already there, same goes for the virtualised list...
Also, we could have used .env for variables like Wikimedia URL, etc.

# To run the project

As straight forward as it should be:
`npm i` to install all the required packages
and
`npm run dev` to start the application and see it running

OBS: It is recommended to have Node 20 installed for some of the packages like Vite, etc

Thank you for the opportunity :)
