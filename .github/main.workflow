workflow "New workflow" {
  on = "push"
  resolves = ["Test"]
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
  args = "run coverage"
  needs = "Build"
}
