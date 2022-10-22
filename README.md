**Mapping application** is developed for practicing and educative purposes. The code is written in ReactJS and pure JavaScript and makes use of OpenStreetMap throught LeafletJS library. The aim of this application is to provide a cloud platform where registered users can create their own mappings, which could stay privately accessible or become visible to anyone visiting the site of the application.

A map should have a title, optionally a description and a definition as published (visible to anyone) or not. A number of lines and points can be placed over the map, each one with it's own title and description, as well as in variable colors and sizes. It can also be defined the initial center and zoom level of the mapping presentation.

---

**There is a demo deployment**, where anyone can view some available mapping samples or even signin as guest (username: guest, password: guest) and modify existing or create new mappings. Keep in mind that it is a demo and the data not stored. Actually, data are temporarily stored in browser's localstorage and getting removed on signin and signout operations. 

Demo deployment: https://gc-mapping.netlify.app/

---

**A few words about the code:** 

The part of the code that handles OpenStreetMap throught LeafletJS library is written in pure JavaScript (ES6 classes syntax) and placed in 'geometry' folder.

The rest of the code is written in ReactJS and placed in different folders broken by feature ('app', 'search', 'signin', 'myMaps', 'map', 'profile', 'users', 'user'). Also, the '_commons' and '_templates' folders contains more generic components as the base for the higher-level components and the '_samples' folder contains a mocking API and some samples for the demo deployment.

Each of the ReactJS folders contains a number of functional components and two subfolders, the 'logic' for the logic operations in the form of custom hooks and the 'style' for the css settings. 

