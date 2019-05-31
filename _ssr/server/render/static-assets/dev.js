import { GOOGLE_ANALYTICS_ID } from '../../../config/env';

const createAppScript = () =>
    `<script async type="text/javascript" charset="utf-8" src="/assets/app.js"></script>`;

const createAppCSS = () =>
    '<link rel= "stylesheet" type="text/css" href="/assets/styles/styles.css">';

const createBootstrapCSS = () =>
    '<link rel= "stylesheet" type="text/css" href="/assets/styles/bootstrap.css"> ';

export {
    createAppScript,
    createBootstrapCSS,
    createAppCSS
};
