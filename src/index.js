const fetch = require('node-fetch');
const querystring = require('querystring');

const {CI_COMMIT_REF_NAME, SONAR_HOST, SONAR_TOKEN, SONAR_PROJECT} = process.env;

(async () => {
    const query = querystring.stringify({
        branch: CI_COMMIT_REF_NAME,
        component: SONAR_PROJECT,
        metricKeys: 'coverage',
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

    console.log(`OVERALL COVERAGE: ${data.component.measures[0].value}%`);
})();