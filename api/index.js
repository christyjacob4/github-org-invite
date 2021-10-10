const express = require("express");
const bodyParser = require("body-parser");
const { Octokit, App, Action } = require("octokit");

const ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const ORG_NAME = process.env.ORG_NAME
const octokit = new Octokit({ auth: ACCESS_TOKEN });

// Create express instance
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userExists = async username => {
  try {
    const user = await octokit.rest.users.getByUsername({
      username
    });
    return user.data;
  } catch (error) {
    return null;
  }
};

const getOrgID = () => {};

const getTeam = async org => {
  try {
    const res = await octokit.rest.teams.list({
      org
    });
    return res.data.find(val => val.name == "Contributors");
  } catch (error) {
    return null;
  }
};

const addUserToOrg = async (username, org, team) => {
  try {
    await octokit.rest.orgs.createInvitation({
      org,
      invitee_id: username,
      team_ids: [team]
    });
  } catch (error) {
    return false;
  }
  return true;
};

// app.use(function(req, res, next) {
//   console.log("Time:", Date.now());
//   next();
// });

app.get("/org", async (req, res) => {
  try {
    const org = await octokit.rest.orgs.get({
      org: ORG_NAME
    });
    res.json({
      url: org.data.avatar_url
    });
  } catch (error) {
    res.json({
      error
    });
  }
});

app.post("/add", async (req, res) => {
  const githubUsername = req.body.github;

  const user = await userExists(githubUsername);
  if (user === null) {
    res.json({
      error: true,
      message: "User not found. Check your Github Username"
    });
  }

  const team = await getTeam(ORG_NAME);
  if (team === null) {
    res.json({
      error: true,
      message: "Team not found"
    });
  }

  const status = await addUserToOrg(user.id, ORG_NAME, team != null ? team.id : "");
  if (status === false) {
    res.json({
      error: true,
      message: "Unable to invite user to team"
    });
  }

  res.json({
    error: false,
    message: "Invite sent"
  });
});

// Export express app
module.exports = app;
