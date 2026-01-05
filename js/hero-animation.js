// Hero Section Space Animation
(function() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Configuración adaptada a SwiftClick
    const config = {
        speed: 2.5,
        numStars: 400,
        numParticles: 15
    };
    
    // Colores del diseño SwiftClick
    const colors = {
        primary: { r: 106, g: 90, b: 205 },      // #6a5acd
        accent: { r: 157, g: 141, b: 241 },      // #9d8df1
        light: { r: 184, g: 169, b: 255 }        // #b8a9ff
    };
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Clase Star optimizada para SwiftClick
    class Star {
        constructor() {
            this.reset();
            this.color = Math.random() > 0.5 ? colors.accent : colors.light;
        }
        
        reset() {
            this.x = Math.random() * canvas.width - canvas.width / 2;
            this.y = Math.random() * canvas.height - canvas.height / 2;
            this.z = Math.random() * canvas.width;
            this.size = Math.random() * 1.5 + 0.5;
        }
        
        update() {
            this.z -= config.speed;
            if (this.z <= 0) {
                this.reset();
                this.z = canvas.width;
            }
        }
        
        draw() {
            const x = (this.x / this.z) * canvas.width + canvas.width / 2;
            const y = (this.y / this.z) * canvas.height + canvas.height / 2;
            const size = (1 - this.z / canvas.width) * this.size * 2;
            
            if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
                this.reset();
                return;
            }
            
            const brightness = (1 - this.z / canvas.width) * 0.6;
            ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${brightness})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
            
            // Estela sutil
            if (size > 1) {
                const px = (this.x / (this.z + config.speed * 2)) * canvas.width + canvas.width / 2;
                const py = (this.y / (this.z + config.speed * 2)) * canvas.height + canvas.height / 2;
                
                ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${brightness * 0.2})`;
                ctx.lineWidth = size * 0.3;
                ctx.beginPath();
                ctx.moveTo(px, py);
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        }
    }
    
    // Partículas flotantes (más sutiles que asteroides)
    class Particle {
        constructor() {
            this.reset();
            this.rotation = 0;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            this.pulse = Math.random() * Math.PI * 2;
        }
        
        reset() {
            this.x = Math.random() * canvas.width - canvas.width / 2;
            this.y = Math.random() * canvas.height - canvas.height / 2;
            this.z = Math.random() * canvas.width;
            this.baseSize = Math.random() * 3 + 2;
        }
        
        update() {
            this.z -= config.speed * 0.5;
            this.rotation += this.rotationSpeed;
            this.pulse += 0.02;
            if (this.z <= 0) {
                this.reset();
                this.z = canvas.width;
            }
        }
        
        draw() {
            const x = (this.x / this.z) * canvas.width + canvas.width / 2;
            const y = (this.y / this.z) * canvas.height + canvas.height / 2;
            const size = (1 - this.z / canvas.width) * this.baseSize;
            
            if (x < -50 || x > canvas.width + 50 || y < -50 || y > canvas.height + 50) {
                return;
            }
            
            const brightness = (1 - this.z / canvas.width) * 0.4;
            const pulseFactor = Math.sin(this.pulse) * 0.3 + 0.7;
            
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(this.rotation);
            
            // Partícula hexagonal sutil
            ctx.fillStyle = `rgba(${colors.primary.r}, ${colors.primary.g}, ${colors.primary.b}, ${brightness * pulseFactor})`;
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                const px = Math.cos(angle) * size;
                const py = Math.sin(angle) * size;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();
            
            // Glow
            ctx.strokeStyle = `rgba(${colors.accent.r}, ${colors.accent.g}, ${colors.accent.b}, ${brightness * 0.2})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            
            ctx.restore();
        }
    }
    
    let stars = [];
    let particles = [];
    
    function init() {
        stars = [];
        particles = [];
        
        for (let i = 0; i < config.numStars; i++) {
            stars.push(new Star());
        }
        
        for (let i = 0; i < config.numParticles; i++) {
            particles.push(new Particle());
        }
    }
    
    init();
    
    // Animación
    function animate() {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
})();
