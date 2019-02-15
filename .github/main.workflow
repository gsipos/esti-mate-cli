workflow "New workflow" {
  on = "push"
  resolves = ["GitHub Action for npm"]
}

action "GitHub Action for npm" {
  uses = "actions/npm@1.0.0"
  args = "run build"
}

workflow "New workflow 1" {
  on = "push"
}
