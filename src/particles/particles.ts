import { ParticlesSettings } from './particles-settings';

export class Particles {
    private container!: HTMLElement;
    private svg!: SVGSVGElement;
    private interval!: number;

    private settings!: ParticlesSettings;

    /** CONSTRUCTOR *************************/
    constructor(container: HTMLElement, svg: string, settings: ParticlesSettings) {
        // Checking settings
        const checkSettings = this.checkSettings(settings);
        if (!checkSettings.success) {
            alert('ERROR SVG PARTICLES SETTINGS\n\n' + checkSettings.message);
            return;
        }

        // Set
        this.container = container;
        this.settings = settings;

        // Create svg based on a string
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = svg;
        this.svg = tempContainer.querySelector('svg')!;

        // Set default settings
        this.svg.style.position = 'absolute';
        this.svg.style.width = this.settings.width + 'px';
        this.svg.style.height = this.settings.height + 'px';
    }

    /** HELP FUNCTIONS *************************/
    private checkSettings(settings: ParticlesSettings): { success: boolean; message: string } {
        let message = '';
        if (settings.width === undefined) message = 'settings.width cannot be undefined';
        else if (settings.height === undefined) message = 'settings.height cannot be undefined';
        else if (settings.minScale === undefined) message = 'settings.minScale cannot be undefined';
        else if (settings.maxScale === undefined) message = 'settings.maxScale cannot be undefined';
        else if (settings.r === undefined) message = 'settings.r cannot be undefined';
        else if (settings.g === undefined) message = 'settings.g cannot be undefined';
        else if (settings.b === undefined) message = 'settings.b cannot be undefined';
        else if (settings.minOpacity === undefined) message = 'settings.minOpacity cannot be undefined';
        else if (settings.maxOpacity === undefined) message = 'settings.maxOpacity cannot be undefined';
        else if (settings.minSpeed === undefined) message = 'settings.minSpeed cannot be undefined';
        else if (settings.maxSpeed === undefined) message = 'settings.maxSpeed cannot be undefined';
        else if (settings.minDuration === undefined) message = 'settings.minDuration cannot be undefined';
        else if (settings.maxDuration === undefined) message = 'settings.maxDuration cannot be undefined';
        else if (settings.maxParticles === undefined) message = 'settings.maxParticles cannot be undefined';
        else if (settings.timeout === undefined) message = 'settings.timeout cannot be undefined';

        return { success: message === '', message };
    }

    private oppositeChance(number: number): number {
        return Math.floor(Math.random() * 2) % 2 == 0 ? number : -number;
    }

    private randomRange(min: number, max: number): number {
        return min + Math.random() * (max - min);
    }

    /** START *************************/
    start() {
        let nbParticles: number = 0;
        this.interval = setInterval(() => {
            // Don't create another particles if max reached
            if (nbParticles >= this.settings.maxParticles) return;

            // Clone svg
            const svgClone: SVGSVGElement = this.svg.cloneNode(true) as SVGSVGElement;
            const path: SVGPathElement = svgClone.querySelector('path')!;

            // Scale
            svgClone.style.scale = this.randomRange(this.settings.minScale, this.settings.maxScale) + '';

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

    /** STOP *************************/
    stop() {
        clearInterval(this.interval);
    }
}
