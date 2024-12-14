# Welcome to React Router V7 with server side rendering and instant client navigation!

This repos is for demonstration how you can get instant client side navigtion wihtout awaiting data, but still have full server side rendering and optimal SEO.

To run the application, run "npm install" and "npm dev".

Usually the server/api is pretty fast, so you might want to turn on throtteling in the network tab i the web dev tools to see how navigation is handled.

The main idea is to show what we already have on the previous page and load the rest of the data after the navigation. This is done with client loaders.
