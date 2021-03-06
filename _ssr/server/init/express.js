import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import flash from 'express-flash';
import methodOverride from 'method-override';
import gzip from 'compression';
import helmet from 'helmet';
import { ENV } from '../../config/env';
import axios from 'axios';

export default app => {
    const port = process.env.PORT || '9999';
    app.set('port', port);
    const clientConfig = {
        host: process.env.HOSTNAME || 'localhost',
        port
    };
    // configure baseURL for axios requests (for serverside API calls)
    axios.defaults.baseURL = `http://${'localhost'}:${clientConfig.port}`;

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    if (ENV === 'production') {
        app.use(gzip());
        // Secure your Express apps by setting various HTTP headers. Documentation: https://github.com/helmetjs/helmet
        app.use(helmet());
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(methodOverride());
    app.use(express.static(path.join(process.cwd(), 'public')));
    app.set('trust proxy', 'loopback');
    const sessionStore = null;

    const sess = {
        resave: false,
        saveUninitialized: true,
        secret: 'keyboard cat',
        proxy: true, // The "X-Forwarded-Proto" header will be used.
        name: '_sessionid',
        // Add HTTPOnly, Secure attributes on Session Cookie
        // If secure is set, and you access your site over HTTP, the cookie will not be set
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 3600000
        },
        store: sessionStore
    };

    if (ENV === 'production') {
        sess.cookie.secure = true; // Serve secure cookies
    }
    console.log(' Server Started ==>  ' +
            ` Environment: ${ENV}` +
            ' ==> ' +
            ` port: ${app.get('port')}`);
    app.use(session(sess));
    app.use(flash());
};
