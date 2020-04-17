# @ringcentral/gitlab-sonarqube-echo-coverage
## Description
Package sends a request to SonarQube API and prints various statistics inside gitlab pipeline.

Use cases:
- [Gitlab's test coverage parsing](https://docs.gitlab.com/ee/user/project/pipelines/settings.html#test-coverage-parsing)
- [Gitlab's Metrics Reports](https://docs.gitlab.com/ee/ci/metrics_reports.html)

## Installation
```
npm install @ringcentral/gitlab-sonarqube-echo-coverage
// or
yarn add @ringcentral/gitlab-sonarqube-echo-coverage
```

## Configuration
Package can be configured with environment variables below

| Variable           | Description                                         |
|:-------------------|:----------------------------------------------------|
| CI_COMMIT_REF_NAME | Gitlab CI env variable containing the source branch |
| SONAR_HOST         | Variable containing sonar host                      |
| SONAR_TOKEN        | Variable containing sonar token                     |
| SONAR_PROJECT      | Variable containing sonar project name              |

Configure your [Gitlab's test coverage parsing](https://docs.gitlab.com/ee/user/project/pipelines/settings.html#test-coverage-parsing) with the following regular expression: `^sonar_metric_coverage (.+)$`.

## Running
Run this script at the end of your pipeline (the best option is right after sonar coverage upload completed).
```bash
rc-gitlab-sonarqube-echo-coverage
# or add it to your package json scripts and do something like
npm run rc-gitlab-sonarqube-echo-coverage
# or
yarn rc-gitlab-sonarqube-echo-coverage
# send statistics to gitlab metrics
npm run rc-gitlab-sonarqube-echo-coverage >> metrics.txt
yarn rc-gitlab-sonarqube-echo-coverage >> metrics.txt
```
