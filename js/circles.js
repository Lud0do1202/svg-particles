import { Particles } from 'svg-particles-alpha';

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
