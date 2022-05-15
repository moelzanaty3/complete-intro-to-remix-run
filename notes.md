# Notes

## Loading Data

- Data loading is built into Remix.

- If your web dev background is primarily in the last few years, you're probably used to creating two things here: an API route to provide data and a frontend component that consumes it.

- In Remix your frontend component is also its own API route and it already knows how to talk to itself on the server from the browser. That is, you don't have to fetch it.

- If you have your server and browser consoles both open, you'll note that they both logged our post data. That's because Remix rendered on the server to send a full HTML document like a traditional web framework, but it also hydrated in the client and logged there too.

## Module

- A solid practice is to create a module that deals with a particular concern. In our case it's going to be reading and writing posts.
