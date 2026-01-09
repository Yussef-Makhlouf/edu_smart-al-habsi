
const fs = require('fs');
const path = require('path');

try {
    const pkgPath = require.resolve('react-resizable-panels');
    console.log('Resolved path:', pkgPath);

    const pkg = require('react-resizable-panels');
    console.log('Exports:', Object.keys(pkg));
} catch (e) {
    console.error('Error:', e);
}
