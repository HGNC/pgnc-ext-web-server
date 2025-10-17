import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine, isMainModule } from '@angular/ssr/node';
import express from 'express';

import bootstrap from './main.server';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

const app = express();
const commonEngine = new CommonEngine();

type RuntimeConfig = {
    apiUser: string;
    apiPassword: string;
};

const computeRuntimeConfig = (): RuntimeConfig => ({
    apiUser: process.env['API_USER'] ?? '',
    apiPassword: process.env['API_PASSWORD'] ?? '',
});

const applyRuntimeConfig = () => {
    const config = computeRuntimeConfig();
    (globalThis as { __PGNC_RUNTIME_CONFIG__?: RuntimeConfig }).__PGNC_RUNTIME_CONFIG__ =
        config;
    return config;
};

let runtimeConfig = applyRuntimeConfig();

app.use((_, __, next) => {
    runtimeConfig = applyRuntimeConfig();
    next();
});

app.get('/runtime-config.js', (_req, res) => {
    res.type('application/javascript');
    res.setHeader('Cache-Control', 'no-store');
    res.send(`window.__PGNC_RUNTIME_CONFIG__ = ${JSON.stringify(runtimeConfig)};`);
});

/**
 * Serve static files from /browser
 */
app.get(
    '**/*.js',
    express.static(browserDistFolder, {
        maxAge: '1y',
    })
);

app.get(
    '**/*.css',
    express.static(browserDistFolder, {
        maxAge: '1y',
    })
);

app.get(
    '**/*.png',
    express.static(browserDistFolder, {
        maxAge: '1y',
    })
);

app.get(
    '**/*.svg',
    express.static(browserDistFolder, {
        maxAge: '1y',
    })
);

app.get(
    '**/*.jpg',
    express.static(browserDistFolder, {
        maxAge: '1y',
    })
);

app.get(
    '**/*.ico',
    express.static(browserDistFolder, {
        maxAge: '1y',
    })
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.get('**', (req, res) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
        .render({
            bootstrap,
            documentFilePath: indexHtml,
            url: `${protocol}://${headers.host}${originalUrl}`,
            publicPath: browserDistFolder,
            providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
        })
        .then(html => {
            // Here you can check if the rendered content is a 404 page
            // This logic assumes your Angular app uses a specific structure
            // to determine if a page was found. Adjust as necessary.
            if (html.includes('404 - Page Not Found')) {
                res.status(404); // Set 404 status code
            }
            res.send(html); // Send the rendered HTML
        })
        .catch(err => {
            console.error(err); // Log the error for debugging
            res.status(500).send('Internal Server Error');
        });
});

/**
 * Start the server if this module is the main entry point.
 */
if (isMainModule(import.meta.url)) {
    const port = process.env['PORT'] || 4000;
    app.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}
