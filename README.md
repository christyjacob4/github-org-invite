# 👨‍🚀 GitHub Org Invite

![NuxtJS](https://img.shields.io/badge/nuxt.js-00C58E?style=for-the-badge&logo=nuxtdotjs&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

<p align="center">
  <img src="readme-image.png"/>
</p>

### A simple web app to easily **invite users to your GitHub Organization**! Built with **Nuxt + Talwind + ❤️**

## 🎯 Features
* Customizable **Background** and **Accent** Colors
* Optionally invite users to **teams**
* **One Click deploy** to Heroku
* **Lightweight** and **fast ⚡️**
* **Nuxt + Tailwind**  
* [WIP] **Discord** org validation 

## 💫 Get Started 


## 🧑‍💻 Development

This project is built with **Nuxt SSR**. All the API calls to the GitHub API are made on the server side and all sensitive information is stored on the Server Side as env variables. 

To run this project locally, you can follow these simple steps

```sh
$ git clone git@github.com:christyjacob4/github-org-invite.git
$ cd github-org-invite
$ cp .env.example .env
```

Fill in the values in the `.env` file.

```sh
# [ REQUIRED ] Your GitHub Access Token
GITHUB_ACCESS_TOKEN=

# [ REQUIRED ] The organization you wish to invite users to
ORG_NAME=

# [ OPTIONAL ] The URL of your hosted app. Eg: https://invite-to-org.herokuapp.com
BASE_URL=

# [OPTIONAL] The team in the organization that you wish to invite users to
TEAM_NAME=   

# [ OPTIONAL ] The Background color you wish to use.
BACKGROUND_COLOR= 

# [ OPTIONAL ] The Accent color you wish to use
ACCENT_COLOR=
```

Once these values have been filled, you can run and visit [http://localhost:3000](http://localhost:3000)

```sh
$ npm install
$ npm run dev
```

## 🤝 Credits
Special thanks to [*thundergolfer*](https://github.com/thundergolfer/automated-github-organization-invites) for setting the foundation for this project.