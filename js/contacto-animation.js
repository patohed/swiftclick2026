// Contacto Section - Energy Pulse Effect
(function() {
    const canvas = document.getElementById('contacto-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Colores SwiftClick
    const colors = ['#6a5acd', '#9d8df1', '#b8a9ff'];
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Clase para partículas con efecto de pulso energético
    class EnergyParticle {
        constructor() {
            this.reset();
            // Inicializar en posición aleatoria en lugar de desde el centro
            this.life = Math.random();
        }
        
        reset() {
            // Partículas nacen desde el botón (parte inferior-central)
            this.centerX = canvas.width / 2;
            this.centerY = canvas.height * 0.75 - 300;
            
            // Ángulo aleatorio para expansión radial
            this.angle = Math.random() * Math.PI * 2;
            
            // Velocidad de expansión
            this.speed = Math.random() * 0.8 + 0.3;
            
            // Distancia inicial desde el centro
            this.distance = 0;
            this.maxDistance = Math.random() * 500 + 400;
            
            this.size = Math.random() * 1.5 + 0.5;
            
            // Color
            this.color = colors[Math.floor(Math.random() * colors.length)];
            
            // Vida de la partícula (0 a 1)
            this.life = 0;
            this.lifeSpeed = Math.random() * 0.0015 + 0.0005;
            
            // Oscillación
            this.oscillationSpeed = Math.random() * 0.05 + 0.02;
            this.oscillationAmount = Math.random() * 20 + 10;
            this.oscillationOffset = Math.random() * Math.PI * 2;
        }
        
        update() {
            this.life += this.lifeSpeed;
            
            // Expandir desde el centro
            this.distance += this.speed;
            
            // Calcular posición con oscillación
            const oscillation = Math.sin(this.life * 50 + this.oscillationOffset) * this.oscillationAmount * (this.life);
            
            this.x = this.centerX + Math.cos(this.angle) * (this.distance + oscillation);
            this.y = this.centerY + Math.sin(this.angle) * (this.distance + oscillation);
            
            // Resetear cuando se aleja mucho o la vida termina
            if (this.distance > this.maxDistance || this.life > 1) {
                this.reset();
            }
        }
        
        draw() {
            // Opacidad basada en vida (fade in/out)
            let opacity;
            if (this.life < 0.2) {
                opacity = this.life / 0.2; // Fade in
            } else if (this.life > 0.8) {
                opacity = (1 - this.life) / 0.2; // Fade out
            } else {
                opacity = 1;
            }
            
            opacity *= 0.6;
            
            // Glow
            const glowSize = this.size * 6;
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowSize);
            gradient.addColorStop(0, `${this.color}${Math.floor(opacity * 120).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(0.5, `${this.color}${Math.floor(opacity * 60).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(1, `${this.color}00`);
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
            ctx.fill();
            
            // Partícula central
            ctx.fillStyle = `${this.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Crear partículas
    const particles = [];
    const numParticles = 100;
    
    for (let i = 0; i < numParticles; i++) {
        particles.push(new EnergyParticle());
    }
    
    // Animación
    function animate() {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar partículas
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
})();
