import {defineConfig} from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
    plugins: [
        monkey({
            entry: 'src/main.ts',
            userscript: {
                author: 'starxg',
                namespace: 'github.com/starxg',
                connect: ['baidu.com', 'localhost', '*'],
                name: "AK Box",
                'run-at': "document-start",
                match: [
                    '*://www.baidu.com/*',
                ],
                description: 'a box',
                license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans',
            },
            build: {
                externalGlobals: {
                    'jquery': ['jQuery', (version, name) => `https://registry.npmmirror.com/${name}/${version}/files/dist/jquery.min.js`],
                },
            }

        }),
    ],
    server: {
        host: 'localhost'
    },
    esbuild: {
        pure: ['console.log', 'console.error', 'console.warn'],
        drop: ['debugger'],
    },
    build: {
        minify: false,
    }
});
