# Audit server-side-wafs
## Minification
``` json
"minify-css": "uglifycss public/css/style.css > public/css/style.min.css",
"minify-js": "esmangle public/js/build.js > public/js/build.min.js",
```

JS from 899b to 883b 😑

CSS from 13.6KB to 9.7KB

### Sources
- https://www.npmjs.com/package/esmangle
- https://github.com/fmarcia/UglifyCSS