import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";

export default function App() {
  return (
    <div className="relative size-full overflow-hidden flex items-center justify-center">
      {/* Layer 1 - Base gradient: radial from top center */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at top center, #0a0a0f 0%, #050506 50%, #020203 100%)',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 3 - Technical grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Floating ambient gradient blobs */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
        animate={{
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [-100, -50, -100],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/4 right-0 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.13) 0%, transparent 70%)',
          filter: 'blur(110px)',
        }}
        animate={{
          x: [100, 50, 100],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 8.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
        animate={{
          y: [0, -40, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 9.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main heart animation with glassmorphism card */}
      <GlassmorphismCard>
        <HeartParticleEffect />
      </GlassmorphismCard>
    </div>
  );
}

function GlassmorphismCard({ children }: { children: React.ReactNode }) {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative z-10 rounded-2xl overflow-hidden"
      style={{
        padding: '80px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(24px)',
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.5),
          0 2px 8px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.08),
          0 0 120px rgba(236, 72, 153, 0.15),
          0 0 60px rgba(168, 85, 247, 0.1)
        `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      {/* Hover spotlight effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(236, 72, 153, 0.12), rgba(168, 85, 247, 0.08), transparent 40%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Ambient glow layers */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(236, 72, 153, 0.06), transparent 50%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(168, 85, 247, 0.04), transparent 50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Particle system based on the reference code
interface Point {
  x: number;
  y: number;
}

class Particle {
  position: Point;
  velocity: Point;
  acceleration: Point;
  age: number;

  constructor() {
    this.position = { x: 0, y: 0 };
    this.velocity = { x: 0, y: 0 };
    this.acceleration = { x: 0, y: 0 };
    this.age = 0;
  }

  initialize(x: number, y: number, dx: number, dy: number, effect: number) {
    this.position.x = x;
    this.position.y = y;
    this.velocity.x = dx;
    this.velocity.y = dy;
    this.acceleration.x = dx * effect;
    this.acceleration.y = dy * effect;
    this.age = 0;
  }

  update(deltaTime: number) {
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
    this.velocity.x += this.acceleration.x * deltaTime;
    this.velocity.y += this.acceleration.y * deltaTime;
    this.age += deltaTime;
  }

  draw(context: CanvasRenderingContext2D, image: HTMLCanvasElement, duration: number) {
    const ease = (t: number) => (--t) * t * t + 1;
    const size = image.width * ease(this.age / duration);
    context.globalAlpha = 1 - this.age / duration;
    context.drawImage(image, this.position.x - size / 2, this.position.y - size / 2, size, size);
  }
}

function HeartParticleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Settings
    const settings = {
      particleCount: 500,
      duration: 2,
      velocity: 100,
      effect: -0.75,
      size: 30,
    };

    // Particle pool
    const particles: Particle[] = [];
    for (let i = 0; i < settings.particleCount; i++) {
      particles.push(new Particle());
    }

    let firstActive = 0;
    let firstFree = 0;
    const particleRate = settings.particleCount / settings.duration;

    // Get point on heart curve
    const pointOnHeart = (t: number): Point => {
      return {
        x: 160 * Math.pow(Math.sin(t), 3),
        y: 130 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25,
      };
    };

    // Create particle image (small heart)
    const createParticleImage = (): HTMLCanvasElement => {
      const particleCanvas = document.createElement('canvas');
      const particleContext = particleCanvas.getContext('2d')!;
      particleCanvas.width = settings.size;
      particleCanvas.height = settings.size;

      const to = (t: number): Point => {
        const point = pointOnHeart(t);
        return {
          x: settings.size / 2 + (point.x * settings.size) / 350,
          y: settings.size / 2 - (point.y * settings.size) / 350,
        };
      };

      particleContext.beginPath();
      let t = -Math.PI;
      let point = to(t);
      particleContext.moveTo(point.x, point.y);
      while (t < Math.PI) {
        t += 0.01;
        point = to(t);
        particleContext.lineTo(point.x, point.y);
      }
      particleContext.closePath();

      // Create gradient for particle
      const gradient = particleContext.createLinearGradient(0, 0, settings.size, settings.size);
      gradient.addColorStop(0, '#ec4899');
      gradient.addColorStop(0.5, '#a855f7');
      gradient.addColorStop(1, '#6366f1');
      particleContext.fillStyle = gradient;
      particleContext.fill();

      return particleCanvas;
    };

    const particleImage = createParticleImage();

    // Add particle to pool
    const addParticle = (x: number, y: number, dx: number, dy: number) => {
      particles[firstFree].initialize(x, y, dx, dy, settings.effect);
      firstFree++;
      if (firstFree === particles.length) firstFree = 0;
      if (firstActive === firstFree) firstActive++;
      if (firstActive === particles.length) firstActive = 0;
    };

    // Update particles
    const updateParticles = (deltaTime: number) => {
      // Update active particles
      if (firstActive < firstFree) {
        for (let i = firstActive; i < firstFree; i++) {
          particles[i].update(deltaTime);
        }
      }
      if (firstFree < firstActive) {
        for (let i = firstActive; i < particles.length; i++) {
          particles[i].update(deltaTime);
        }
        for (let i = 0; i < firstFree; i++) {
          particles[i].update(deltaTime);
        }
      }

      // Remove inactive particles
      while (
        particles[firstActive].age >= settings.duration &&
        firstActive !== firstFree
      ) {
        firstActive++;
        if (firstActive === particles.length) firstActive = 0;
      }
    };

    // Draw particles
    const drawParticles = () => {
      if (firstActive < firstFree) {
        for (let i = firstActive; i < firstFree; i++) {
          particles[i].draw(context, particleImage, settings.duration);
        }
      }
      if (firstFree < firstActive) {
        for (let i = firstActive; i < particles.length; i++) {
          particles[i].draw(context, particleImage, settings.duration);
        }
        for (let i = 0; i < firstFree; i++) {
          particles[i].draw(context, particleImage, settings.duration);
        }
      }
    };

    // Animation loop
    let time: number;
    const render = () => {
      const newTime = new Date().getTime() / 1000;
      const deltaTime = newTime - (time || newTime);
      time = newTime;

      context.clearRect(0, 0, canvas.width, canvas.height);

      // Create new particles from heart outline
      const amount = particleRate * deltaTime;
      for (let i = 0; i < amount; i++) {
        const pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
        const dir = {
          x: pos.x,
          y: pos.y,
        };
        const length = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
        dir.x = (dir.x / length) * settings.velocity;
        dir.y = (dir.y / length) * settings.velocity;

        addParticle(
          canvas.width / 2 + pos.x,
          canvas.height / 2 - pos.y,
          dir.x,
          -dir.y
        );
      }

      updateParticles(deltaTime);
      drawParticles();

      // Draw text in the center
      context.save();
      context.globalAlpha = 1;

      // Draw glow effect for text
      context.shadowBlur = 30;
      context.shadowColor = 'rgba(236, 72, 153, 0.8)';

      // Set font and text properties
      context.font = 'bold 48px Arial, sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      // Create gradient for text
      const gradient = context.createLinearGradient(
        canvas.width / 2 - 100,
        canvas.height / 2,
        canvas.width / 2 + 100,
        canvas.height / 2
      );
      gradient.addColorStop(0, '#ec4899');
      gradient.addColorStop(0.5, '#a855f7');
      gradient.addColorStop(1, '#6366f1');

      context.fillStyle = gradient;
      context.fillText('đời và đá', canvas.width / 2, canvas.height / 2);

      // Draw text outline
      context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      context.lineWidth = 1;
      context.strokeText('đời và đá', canvas.width / 2, canvas.height / 2);

      context.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    // Handle resize
    const onResize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    onResize();
    window.addEventListener('resize', onResize);

    let animationFrameId: number;
    setTimeout(() => {
      render();
    }, 10);

    return () => {
      window.removeEventListener('resize', onResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-[600px] h-[600px]"
      style={{
        display: 'block',
      }}
    />
  );
}
