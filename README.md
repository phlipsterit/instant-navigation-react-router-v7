# Welcome to React Router V7 with server side rendering and instant client navigation!

This repos is for demonstration how you can get instant client side navigtion without awaiting data, but still have full server side rendering and optimal SEO.

To run the application, run "npm install" and "npm run dev".

Usually the server/api is pretty fast, so you might want to turn on throtteling in the network tab in the web dev tools to see how navigation is handled.

The main idea is to show what we already have on the previous page and load the rest of the data after the navigation. This is done with client loaders.

## features
 - Standard server side rendering with meta tags based on the full data
 - Instant navigation. The data-fetching is started in the client loader, so it's initated as soon as possible and before the first render of the component
 - Meta tags are updated client side after the navigation when all data is available.

