#!/usr/bin/env node

const fetch = require('node-fetch');
const querystring = require('querystring');

const {CI_COMMIT_REF_NAME, SONAR_HOST, SONAR_TOKEN, SONAR_PROJECT} = process.env;

const SONAR_METRICS = [
    'coverage',
    'bugs',
    'vulnerabilities',
    'security_hotspots',
    'code_smells',
    'branch_coverage',
    'conditions_to_cover',
    'uncovered_conditions',
    'line_coverage',
    'lines_to_cover',
    'uncovered_lines',
    'new_coverage',
];

(async () => {
    const query = querystring.stringify({
        branch: CI_COMMIT_REF_NAME,
        component: SONAR_PROJECT,
        metricKeys: SONAR_METRICS.join(','),
    });
    const response = await fetch(`${SONAR_HOST}/api/measures/component?${query}`, {
        headers: {Authentication: `Basic ${SONAR_TOKEN}`},
    });
    const data = await response.json();

    if (!response.ok) {
        const error = data.errors.map(({msg}) => msg).join('\n');

        console.log(`SonarQube request failed:\n${error}`);

        return;
    }

    const measures = component.measures.reduce((carry, current) => {
        const metricName = `sonar_metric_${current.metric}`;
        if (current.value !== undefined) {
            carry.push(`${metricName} ${current.value}`);
        } else if (current.periods) {
            carry.push(`${metricName} ${Number(current.periods[0].value).toFixed(2)}`);
        }

        return carry;
    }, []).join('\n');

    console.log(`\nSonarQube statistics:\n${measures}\n`);
})();