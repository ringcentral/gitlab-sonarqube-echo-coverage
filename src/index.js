const fetch = require('node-fetch');
const querystring = require('querystring');

const {CI_COMMIT_REF_NAME, SONAR_HOST, SONAR_LOGIN, SONAR_PROJECT} = process.env;

(async () => {
    const query = querystring.stringify({
        branch: CI_COMMIT_REF_NAME,
        component: SONAR_PROJECT,
        metricKeys: 'coverage',
    });
    const request = await fetch(`${SONAR_HOST}/api/measures/component?${query}`, {
        headers: {Authentication: `Basic ${SONAR_LOGIN}`},
    });
    const data = await request.json();

    if (request.status !== 200) {
        const error = data.errors.map(({msg}) => msg).join('\n');

        console.log(`SonarQube request failed:\n${error}`);

        return;
    }

    console.log(`OVERALL COVERAGE: ${data.component.measures[0].value}%`);
})();