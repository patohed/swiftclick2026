// Visión Section - Floating Stars with Wave Motion
(function() {
    const canvas = document.getElementById('vision-canvas');
    if (!canvas) return;
    
    // Desactivar animaciones en dispositivos móviles para mejor rendimiento
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (isMobileDevice) {
        canvas.style.display = 'none';
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Colores SwiftClick
    const colors = ['#6a5acd', '#9d8df1', '#b8a9ff'];
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Clase para estrellas con movimiento ondulante
    class WaveStar {
        constructor() {
            this.baseX = Math.random() * canvas.width;
            this.baseY = Math.random() * canvas.height;
            this.x = this.baseX;
            this.y = this.baseY;
            
            // Parámetros del movimiento ondulante
            this.waveAmplitudeX = Math.random() * 30 + 20;
            this.waveAmplitudeY = Math.random() * 30 + 20;
            this.waveSpeedX = Math.random() * 0.02 + 0.01;
            this.waveSpeedY = Math.random() * 0.02 + 0.01;
            this.waveOffsetX = Math.random() * Math.PI * 2;
            this.waveOffsetY = Math.random() * Math.PI * 2;
            
            // Drift lento
            this.driftSpeedX = (Math.random() - 0.5) * 0.1;
            this.driftSpeedY = (Math.random() - 0.5) * 0.1;
            
            this.size = Math.random() * 0.8 + 0.4;
            this.baseOpacity = Math.random() * 0.3 + 0.4;
            this.opacity = this.baseOpacity;
            
            // Color ponderado hacia tonos violeta
            const colorRandom = Math.random();
            if (colorRandom < 0.5) {
                this.color = colors[0]; // Más frecuente: primary
            } else if (colorRandom < 0.8) {
                this.color = colors[1]; // accent
            } else {
                this.color = colors[2]; // light
            }
            
            // Efecto de pulso
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.pulseOffset = Math.random() * Math.PI * 2;
            
            this.time = 0;
        }
        
        update() {
            this.time += 1;
            
            // Movimiento ondulante sinusoidal
            const waveX = Math.sin(this.time * this.waveSpeedX + this.waveOffsetX) * this.waveAmplitudeX;
            const waveY = Math.cos(this.time * this.waveSpeedY + this.waveOffsetY) * this.waveAmplitudeY;
            
            // Drift gradual de la posición base
            this.baseX += this.driftSpeedX;
            this.baseY += this.driftSpeedY;
            
            // Wrapping en los bordes (sin rebote)
            if (this.baseX < -50) this.baseX = canvas.width + 50;
            if (this.baseX > canvas.width + 50) this.baseX = -50;
            if (this.baseY < -50) this.baseY = canvas.height + 50;
            if (this.baseY > canvas.height + 50) this.baseY = -50;
            
            // Posición final
            this.x = this.baseX + waveX;
            this.y = this.baseY + waveY;
            
            // Efecto de pulso en la opacidad
            const pulse = Math.sin(this.time * this.pulseSpeed + this.pulseOffset) * 0.15;
            this.opacity = Math.max(0.2, Math.min(0.8, this.baseOpacity + pulse));
        }
        
        draw() {
            // Glow externo
            const glowSize = this.size * 8;
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowSize);
            gradient.addColorStop(0, `${this.color}${Math.floor(this.opacity * 80).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(0.3, `${this.color}${Math.floor(this.opacity * 40).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(1, `${this.color}00`);
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
            ctx.fill();
            
            // Estrella central
            ctx.fillStyle = `${this.color}${Math.floor(this.opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Sparkle ocasional
            if (Math.random() > 0.995) {
                ctx.strokeStyle = `${this.color}${Math.floor(this.opacity * 180).toString(16).padStart(2, '0')}`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(this.x - this.size * 3, this.y);
                ctx.lineTo(this.x + this.size * 3, this.y);
                ctx.moveTo(this.x, this.y - this.size * 3);
                ctx.lineTo(this.x, this.y + this.size * 3);
                ctx.stroke();
            }
        }
    }
    
    // Crear estrellas
    const stars = [];
    const isMobile = window.innerWidth < 768;
    const numStars = isMobile ? 80 : 150;
    
    for (let i = 0; i < numStars; i++) {
        stars.push(new WaveStar());
    }
    
    // Animación
    function animate() {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
})();
