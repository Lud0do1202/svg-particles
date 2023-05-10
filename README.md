# svg-particles

## Installation
```
npm i svg-particles
```

## Usage
### Html
- The size of the container defines the area spawn
- The container cannot be static

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <style>
            .container-particles {
                /* Set the area of spawn */
                width: 50%;
                height: 50px;

                /* Cannot be static */
                position: relative;
                
                margin: 100px auto;
            }
        </style>
    </head>
    <body>
        <div class="container-particles" id="circles" style="background-color: #ff000050"></div>

        <script src="./js/circles.js" type="module"></script>
    </body>
</html>
```

### Javascript
- The svg is a string
- The svg pust have a \<path>...\</path>

```javascript
import { Particles } from 'svg-particles';

const svg = `
    <svg
        height="800px"
        width="800px"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 451.827 451.827"
        xml:space="preserve"
    >
        <g>
            <g>
                <path
                    style="fill: #010002"
                    d="M225.922,0C101.351,0,0.004,101.347,0.004,225.917s101.347,225.909,225.917,225.909
			c124.554,0,225.901-101.347,225.901-225.909C451.823,101.347,350.476,0,225.922,0z"
                />
            </g>
        </g>
    </svg>`;
const circlesContainer = document.querySelector('#circles');
const circles = new Particles(circlesContainer, svg, {
    // Size
    minWidth: 10,
    maxWidth: 50,

    // Color
    r: 255,
    g: 0,
    b: 0,
    minOpacity: 0.5,
    maxOpacity: 0.9,

    // Speed
    minSpeed: 10,
    maxSpeed: 30,

    // Duration
    minDuration: 1000,
    maxDuration: 2000,

    // Max particles
    maxParticles: 100,

    // Timeout
    timeout: 50,
});

circles.start();

setTimeout(() => circles.stop(), 10000);
```

### Result
![svg-particles](https://user-images.githubusercontent.com/110570511/236704342-2a6b2a14-be6d-4f6c-9ed3-3fb02e37d848.gif)


## Donation
Be the cool kid on the block - donate to my project and brag to your friends about how awesome you are.

***Paypal account :*** ludo.traina@gmail.com
