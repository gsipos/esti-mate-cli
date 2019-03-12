workflow "New workflow" {
  on = "push"
  resolves = [
    "Build",
    "Test",
  ]
}

action "npm install" {
  uses = "actions/npm@1.0.0"
  args = "ci"
}

action "Build" {
  uses = "actions/npm@1.0.0"
  args = "run build"
  needs = ["npm install"]
}

action "Test" {
  uses = "actions/npm@1.0.0"
  needs = ["npm install"]
  args = "run coverage"
}
