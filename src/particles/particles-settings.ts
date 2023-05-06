export interface ParticlesSettings {
    // Size
    minWidth: number;
    maxWidth: number;

    // Color
    r: number;
    g: number;
    b: number;
    minOpacity: number;
    maxOpacity: number;

    // Speed
    minSpeed: number;
    maxSpeed: number;

    // Duration
    minDuration: number;
    maxDuration: number;

    // Max particles
    maxParticles: number;

    // Timeout
    timeout: number;
}
