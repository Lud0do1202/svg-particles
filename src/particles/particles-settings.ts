/**
 * Interface for the settings of Particles
 *
 * @author Lud0do1202 (Traina Ludo)
 */
export interface ParticlesSettings {
    /**
     * The width minimum of the svg (px)
     */
    minWidth: number;

    /**
     * The width maximum of the svg (px)
     */
    maxWidth: number;

    /**
     * The red (r) in a rgba format
     */
    r: number;

    /**
     * The green (g) in a rgba format
     */
    g: number;

    /**
     * The blue (b) in a rgba format
     */
    b: number;

    /**
     * The opacity minimum (a) in a rgba format
     */
    minOpacity: number;

    /**
     * The opacity maximum (a) in a rgba format
     */
    maxOpacity: number;

    /**
     * The speed minimum of particles
     */
    minSpeed: number;

    /**
     * The speed maximum of particles
     */
    maxSpeed: number;

    /**
     * The lifetime minimum of a particle
     */
    minDuration: number;

    /**
     * The lifetime maximum of a particle
     */
    maxDuration: number;

    /**
     * The number maximum of particles displayed
     */
    maxParticles: number;


    /**
     * The timeout between two new particles
     */
    timeout: number;
}
