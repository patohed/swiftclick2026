// Filosofía Section - Floating Stars Animation
(function() {
    const canvas = document.getElementById('filosofia-canvas');
    if (!canvas) return;
    
    // Desactivar animaciones en dispositivos móviles para mejor rendimiento
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (isMobileDevice) {
        canvas.style.display = 'none';
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Colores SwiftClick
    const colors = [
        { r: 157, g: 141, b: 241, weight: 0.4 },  // #9d8df1
        { r: 184, g: 169, b: 255, weight: 0.3 },  // #b8a9ff
        { r: 106, g: 90, b: 205, weight: 0.3 }    // #6a5acd
    ];
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Clase para estrellas flotantes
    class FloatingStar {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.pulsePhase = Math.random() * Math.PI * 2;
            
            // Seleccionar color basado en peso
            const rand = Math.random();
            let cumulative = 0;
            for (let color of colors) {
                cumulative += color.weight;
                if (rand <= cumulative) {
                    this.color = color;
                    break;
                }
            }
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.pulsePhase += this.pulseSpeed;
            
            // Rebote en los bordes
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            
            // Mantener dentro del canvas
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }
        
        draw() {
            const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
            const currentOpacity = this.opacity * pulse;
            const currentSize = this.size * pulse;
            
            // Estrella principal
            ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${currentOpacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
            ctx.fill();
            
            // Glow sutil
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, currentSize * 3);
            gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${currentOpacity * 0.3})`);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, currentSize * 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Sparkle ocasional (cruz)
            if (Math.random() > 0.98 && currentSize > 1) {
                ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${currentOpacity * 0.6})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(this.x - currentSize * 2, this.y);
                ctx.lineTo(this.x + currentSize * 2, this.y);
                ctx.moveTo(this.x, this.y - currentSize * 2);
                ctx.lineTo(this.x, this.y + currentSize * 2);
                ctx.stroke();
            }
        }
    }
    
    // Crear estrellas
    const stars = [];
    const isMobile = window.innerWidth < 768;
    const numStars = isMobile ? 80 : 150;
    
    for (let i = 0; i < numStars; i++) {
        stars.push(new FloatingStar());
    }
    
    // Animación
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
})();
