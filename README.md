# Imgur Gallery
A simple web app that allows one to browse the Imgur gallery using [api.imgur](https://api.imgur.com/). It is built using React, Redux Toolkit and Material-UI Framework.

<p align="center">
	<img src="preview.png" width="100%">
</p>


## Gallery API
```
https://api.imgur.com/3/gallery/{{section}}/{{sort}}/{{window}}/{{page}}?showViral={{showViral}}&album_previews={{albumPreviews}}
```

#### key / value
- section (optional): Defaults to hot
    - hot
    - top
    - user
- sort (optional): Defaults to viral
    - viral
    - top
    - time
    - rising (only available with user section) 
- page (optional)
    - integer (the data paging number)
- window (optional): Defaults to day
    - day
    - week
    - month
    - year
    - all
    
#### Params (optional)
- showViral: Show or hide viral images from the user section. Defaults to true
- album_previews: Include image metadata for gallery posts which are albums


## Content
- [X] Show gallery images in a grid of thumbnails and lazy load them
- [X] Show image description in the thumbnail, top or bottom
- [X] On clicking an image in the gallery, show its details: big image, title, description, up-votes, down-votes, and score 
- [X] Filters:
    - [X] Filter the images based on: hot, top, user
    - [X] Include or exclude viral images from the result set
    - [X] Filter based on a window and sort parameters
- [ ] Unit test cases


## Libraries and Frameworks

#### External 
- [X] [Create React App](https://github.com/facebook/create-react-app)
- [X] [Redux Toolkit](https://redux-toolkit.js.org/)
- [X] [Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [X] [Material-UI](https://material-ui.com/)
- [X] [uuid](https://github.com/uuidjs/uuid/)


## Information
Check [React-Seed](https://github.com/imransilvake/React-Seed) to understand how to build and serve this project as well as how to use SCSS and JS linting.
