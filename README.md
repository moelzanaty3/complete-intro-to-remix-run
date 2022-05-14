# Complete Intro To [remix.run](https://remix.run/)

Learn about Remix: the newest full-stack ReactJS framework from the creators of React Router! In this crash course we'll be build a new application from scratch and you'll get to learn all of the remix fundamentals including routing, loaders, actions, validation, navigation, mutations, and several other concepts! We'll also use tailwind css for styles, and explore a couple other tips and tricks.

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```

---

Made with 💜 by [Mohammed Elzanaty!](https://www.linkedin.com/in/moelzanaty3/) :wave:
