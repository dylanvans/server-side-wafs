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

#### No Javascript
If there is a problem with the users Javascript in the browser the app is still usable. I disabled Javascript in the browser and the app runs just the same.

#### Offline

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
### Lighthouse


## Sources
- https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk
- http://andmag.se/2012/10/responsive-images-how-to-prevent-reflow/