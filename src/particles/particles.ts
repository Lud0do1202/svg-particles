import { ParticlesSettings } from './particles-settings';

/**
 * Generate particles based on a SVG
 *
 * @author Lud0do1202 (Traina Ludo)
 */
export class Particles {
    private container!: HTMLElement;
    private svg!: SVGSVGElement;
    private aspectRatio!: number;
    private interval!: number;

    private settings!: ParticlesSettings;

    /**
     * Create an instance of Particles
     *
     * @param container The element which will contain the particles
     * @param svg The <svg>...</svg> as a string
     * @param settings Settings for the particles
     */
    constructor(container: HTMLElement, svg: string, settings: ParticlesSettings) {
        // Check args
        if (!(container instanceof HTMLElement))
            throw new Error('PARTICLES\ncontainer arg must be an instance of HTMLElement');
        if (typeof svg !== 'string') throw new Error('PARTICLES\nsvg arg must be a string');
        if (typeof settings.minWidth !== 'number') throw new Error('PARTICLES\nsettings.minWidth must be a number');
        if (typeof settings.maxWidth !== 'number') throw new Error('PARTICLES\nsettings.maxWidth must be a number');
        if (typeof settings.r !== 'number') throw new Error('PARTICLES\nsettings.r must be a number');
        if (typeof settings.g !== 'number') throw new Error('PARTICLES\nsettings.g must be a number');
        if (typeof settings.b !== 'number') throw new Error('PARTICLES\nsettings.b must be a number');
        if (typeof settings.minOpacity !== 'number') throw new Error('PARTICLES\nsettings.minOpacity must be a number');
        if (typeof settings.maxOpacity !== 'number') throw new Error('PARTICLES\nsettings.maxOpacity must be a number');
        if (typeof settings.minSpeed !== 'number') throw new Error('PARTICLES\nsettings.minSpeed must be a number');
        if (typeof settings.maxSpeed !== 'number') throw new Error('PARTICLES\nsettings.maxSpeed must be a number');
        if (typeof settings.minDuration !== 'number')
            throw new Error('PARTICLES\nsettings.minDuration must be a number');
        if (typeof settings.maxDuration !== 'number')
            throw new Error('PARTICLES\nsettings.maxDuration must be a number');
        if (typeof settings.maxParticles !== 'number')
            throw new Error('PARTICLES\nsettings.maxParticles must be a number');
        if (typeof settings.timeout !== 'number') throw new Error('PARTICLES\nsettings.timeout must be a number');

        // Initialize properties with constructor arguments
        this.container = container;
        this.settings = settings;

        // Create svg based on a string
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = svg;
        this.svg = tempContainer.querySelector('svg');
        if (!this.svg) throw new Error('PARTICLES\nThe svg must have a <svg>...</svg>');

        // Get aspect ratio of svg
        if (this.svg.hasAttribute('viewBox')) {
            const viewBox = this.svg.getAttribute('viewBox')!;
            const [viewBoxMinX, viewBoxMinY, viewBoxWidth, viewBoxHeight] = viewBox.split(' ');
            this.aspectRatio = Number.parseFloat(viewBoxWidth) / Number.parseFloat(viewBoxHeight);
        } else if (this.svg.width.baseVal.value && this.svg.height.baseVal.value) {
            this.aspectRatio = this.svg.width.baseVal.value / this.svg.height.baseVal.value;
        } else {
            const rect = this.svg.getBoundingClientRect();
            this.aspectRatio = rect.width / rect.height;
        }

        // Set default size
        const width = this.randomRange(this.settings.minWidth, this.settings.maxWidth);
        const height = width * this.aspectRatio;
        this.svg.style.width = width + 'px';
        this.svg.style.height = height + 'px';

        // Set the position absolute
        this.svg.style.position = 'absolute';
    }

    /**
     * Randomly return the input number or its opposite
     *
     * @param number The number used
     * @returns The number or its opposite
     */
    private oppositeChance(number: number): number {
        return Math.floor(Math.random() * 2) % 2 == 0 ? number : -number;
    }

    /**
     * Get a number randomly between two numbers
     *
     * @param min The min value
     * @param max The max value
     * @returns A number between those two values
     */
    private randomRange(min: number, max: number): number {
        return min + Math.random() * (max - min);
    }

    /**
     * Start the generator of particles
     */
    start(): void {
        let nbParticles: number = 0;
        this.interval = setInterval(() => {
            // Don't create another particles if max reached
            if (nbParticles >= this.settings.maxParticles) return;

            // Clone svg
            const svgClone: SVGSVGElement = this.svg.cloneNode(true) as SVGSVGElement;
            const path: SVGPathElement | null = svgClone.querySelector('path');
            if (path == null) {
                this.stop();
                throw new Error('START\n<path>...</path> is require in the SVG');
            }

            // Scale
            const width = this.randomRange(this.settings.minWidth, this.settings.maxWidth);
            const height = width * this.aspectRatio;
            this.svg.style.width = width + 'px';
            this.svg.style.height = height + 'px';

            // Color
            const r = this.randomRange(this.settings.r - 5, this.settings.r + 5);
            const g = this.randomRange(this.settings.g - 5, this.settings.g + 5);
            const b = this.randomRange(this.settings.b - 5, this.settings.b + 5);
            const a = this.randomRange(this.settings.minOpacity, this.settings.maxOpacity);
            const color = `rgba(${r}, ${g}, ${b}, ${a})`;
            path.style.fill = color;

            // Spawn
            const spawnX = this.randomRange(0, 100);
            const spawnY = this.randomRange(0, 100);
            svgClone.style.top = spawnY + '%';
            svgClone.style.left = spawnX + '%';

            // Rotation
            const rotation = this.randomRange(0, 360);

            // Movement
            const speed = this.randomRange(this.settings.minSpeed, this.settings.maxSpeed);
            const translateX = this.oppositeChance(Math.floor(this.randomRange(0, speed)));
            const translateY = this.oppositeChance(Math.floor(Math.sqrt(speed ** 2 - translateX ** 2)));

            const duration = this.randomRange(this.settings.minDuration, this.settings.maxDuration);

            svgClone.animate(
                [
                    { transform: `translate(-50%, -50%) rotate(${rotation}deg)`, opacity: '0' },
                    { opacity: '1' },
                    { opacity: '1' },
                    { opacity: '1' },
                    { opacity: '1' },
                    { opacity: '1' },
                    {
                        transform: `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) rotate(${rotation}deg)`,
                        opacity: '0',
                    },
                ],
                {
                    duration: duration,
                    iterations: 1,
                }
            );

            // Create the particle
            const particle = this.container.appendChild(svgClone);
            nbParticles++;

            // Destroy
            setTimeout(() => {
                // Remove particle
                particle.remove();

                // Decrease nb particles
                nbParticles--;
            }, duration);
        }, this.settings.timeout);
    }

    /**
     * Stop the generator of particles
     */
    stop(): void {
        clearInterval(this.interval);
    }
}
