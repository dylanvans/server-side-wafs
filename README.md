# Performance Matters - Server side wafs
## Use case
> As a user, I want to read articles offline, so when my internet connection fails I can still read.

## Installation
### Clone
```
git clone https://github.com/dylanvans/server-side-wafs.git
cd server-side-wafs
```
### Install Dependencies
```
npm install
```
### Development
Compile style.scss:
```
npm run sass
```
Minify files:
```
npm run minify
```
Build javascript:
```
npm run build
```
All of the above together:
```
npm test
```

### Start localhost:3000
```
npm start
```

## Performance
### Features
#### File Minification 
```
npm run minify
```
Minifies the style.css file and the build.js file with UglifyCSS and esmangle.

The JS file does not contain much, so minification did not result in an overwhelming reduction of file-size. 899b to 860kb. A reduction of 5%.

The CSS file was 14kb and with minification it is only 10kb. That is a reduction of 29%.

##### Without minification - Load: 14s
![Screenshot timeline - without minification](https://github.com/dylanvans/server-side-wafs/blob/dev/readme-img/normal.png)
##### With minification - Load: 13.5s
![Screenshot timeline - with minification](https://github.com/dylanvans/server-side-wafs/blob/dev/readme-img/minify.png)

##### Conclusion
The results are minimal because the files aren't that big. Especially the Javascript file contains almost no script. If in the future the Javascript file grows, this feature will have a greater impact on the loading time than it has now.

#### Reserved Image Space
It's very annoying when you are reading an article and suddenly your text jumps down, because of a large image that is loading. We can solve this problem with some pre-defined space on our webpage.

All of the images received from the The Guardian API have an aspect ratio of 5:3. So we know how big the images are going to be when loaded. The thing we have to do is set a 60% padding-top on the container of the image and place the image in the top left corner like this:

``` css
.container-img {
	position: relative;
	height: 0;
	overflow: hidden;
	padding-top: 60%;
}

.container-img img {
	position: absolute;
	top: 0;
	left: 0;
	width:100%;
}
```
##### Result
No space reserved
![screenshot - no space reserved for image](https://github.com/dylanvans/server-side-wafs/blob/dev/readme-img/no-space-reserved.png)
Space reserved
![screenshot - space reserved for image](https://github.com/dylanvans/server-side-wafs/blob/dev/readme-img/space-reserved.png)

#### Gzip Compression
With compression activated the requested files are zipped on the server and send to the browser. The browser then unzips the files and shows it to the user. This way we send smaller files to the user, which will be downloaded faster. To activate Gzip compression we have to add the following code to the server.js:
```
var compression = require('compression');
app.use(compression());
```

##### Without Compression - Load: 14s
![Screenshot timeline - without Compression](https://github.com/dylanvans/server-side-wafs/blob/dev/readme-img/normal.png)
##### With Compression - Load: 13s
![Screenshot timeline - with Compression](https://github.com/dylanvans/server-side-wafs/blob/dev/readme-img/minify.png)

#### No Javascript
If there is a problem with the users Javascript in the browser the app is still usable. I disabled Javascript in the browser and the app runs just the same.

#### Offline
The app can be used without an internet connection. So users can still read their articles, even offline. When there is an internet connection every page the user visits is cached in the browser of the user. Via the installed service worker on the browser, we can serve the cached pages without a connection.

### Lighthouse
Via the plugin of lighthouse I could test my localhost:3000 on how 'progressive' my web app is. It gave back a score of 87/100, with the following issues:
- Network connection not secure. No HTTPS (because I used localhost)
- Using modern protocols like HTTPS and HTTP/2
- 1 element (the button) lacks sufficient contrast ratio (doubtful)

[Link to report](https://github.com/dylanvans/server-side-wafs/lighthouse-report.html)

## Wishlist
- Save article function
- Working readtime filter

## Sources
- https://www.npmjs.com/package/esmangle
- https://github.com/fmarcia/UglifyCSS
- https://www.npmjs.com/package/compression
- https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk
- http://andmag.se/2012/10/responsive-images-how-to-prevent-reflow/