// Demo HTML variations for testing RAJ AI
export const demoVariations = [
  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Portfolio - Variation 1</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; background: #0a0a0a; color: #fff; }
        .hero { height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(45deg, #1a1a1a, #2a2a2a); }
        .hero h1 { font-size: 4rem; animation: glow 2s ease-in-out infinite alternate; }
        @keyframes glow { from { text-shadow: 0 0 20px #00ff88; } to { text-shadow: 0 0 30px #00ff88; } }
        .skills { padding: 4rem 2rem; background: #111; }
        .skill-bar { background: #333; height: 20px; margin: 1rem 0; border-radius: 10px; overflow: hidden; }
        .skill-fill { height: 100%; background: linear-gradient(90deg, #00ff88, #00ccff); animation: fillUp 2s ease-out; }
        @keyframes fillUp { from { width: 0; } to { width: var(--width); } }
    </style>
</head>
<body>
    <div class="hero">
        <h1>Creative Developer</h1>
    </div>
    <div class="skills">
        <h2>Skills</h2>
        <div class="skill-bar"><div class="skill-fill" style="--width: 90%;"></div></div>
        <div class="skill-bar"><div class="skill-fill" style="--width: 85%;"></div></div>
    </div>
</body>
</html>`,

  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Showcase - Variation 2</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Courier New', monospace; background: #000; color: #00ff00; }
        .terminal { padding: 2rem; }
        .typing::after { content: '|'; animation: blink 1s infinite; }
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; padding: 2rem; }
        .card { background: #111; border: 1px solid #00ff00; padding: 2rem; transform: perspective(1000px) rotateX(0deg); transition: transform 0.3s; }
        .card:hover { transform: perspective(1000px) rotateX(10deg) scale(1.05); }
    </style>
</head>
<body>
    <div class="terminal">
        <h1 class="typing">$ whoami > John Doe - Web Developer</h1>
    </div>
    <div class="grid">
        <div class="card">
            <h3>Project Alpha</h3>
            <p>Advanced web application with modern stack</p>
        </div>
        <div class="card">
            <h3>Project Beta</h3>
            <p>Mobile-first responsive design solution</p>
        </div>
    </div>
</body>
</html>`,

  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minimalist Portfolio - Variation 3</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Helvetica', sans-serif; background: #fafafa; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .hero { text-align: center; padding: 6rem 0; }
        .hero h1 { font-size: 3rem; font-weight: 100; margin-bottom: 1rem; }
        .projects { display: flex; flex-wrap: wrap; gap: 2rem; margin: 4rem 0; }
        .project { flex: 1; min-width: 300px; background: white; box-shadow: 0 4px 20px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; transition: transform 0.3s; }
        .project:hover { transform: translateY(-10px); }
        .project-img { height: 200px; background: linear-gradient(45deg, #667eea, #764ba2); }
    </style>
</head>
<body>
    <div class="container">
        <div class="hero">
            <h1>Design. Code. Innovate.</h1>
            <p>Creating digital experiences that matter</p>
        </div>
        <div class="projects">
            <div class="project">
                <div class="project-img"></div>
                <div style="padding: 1.5rem;">
                    <h3>E-commerce Platform</h3>
                    <p>Full-stack solution with React and Node.js</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`,

  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Neon Portfolio - Variation 4</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; background: #0a0a0a; color: #fff; overflow-x: hidden; }
        .neon-text { color: #fff; text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff, 0 0 20px #ff00ff; }
        .hero { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle, #1a0033, #000); }
        .hero h1 { font-size: 5rem; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        .grid-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-image: linear-gradient(rgba(255,0,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,255,0.1) 1px, transparent 1px); background-size: 50px 50px; z-index: -1; }
    </style>
</head>
<body>
    <div class="grid-bg"></div>
    <div class="hero">
        <h1 class="neon-text">CYBER DEV</h1>
        <p style="font-size: 1.5rem; margin-top: 1rem;">Building the future, one line at a time</p>
    </div>
</body>
</html>`,

  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glassmorphism Portfolio - Variation 5</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
        .glass { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.2); }
        .hero { height: 100vh; display: flex; align-items: center; justify-content: center; }
        .hero-card { padding: 3rem; text-align: center; color: white; }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; font-weight: 300; }
        .floating { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .contact-form { max-width: 400px; margin: 2rem auto; padding: 2rem; }
        .contact-form input, .contact-form textarea { width: 100%; padding: 1rem; margin: 0.5rem 0; background: rgba(255,255,255,0.1); border: none; border-radius: 10px; color: white; }
        .contact-form input::placeholder, .contact-form textarea::placeholder { color: rgba(255,255,255,0.7); }
    </style>
</head>
<body>
    <div class="hero">
        <div class="glass hero-card floating">
            <h1>Alex Johnson</h1>
            <p>Full Stack Developer & UI/UX Designer</p>
            <div class="contact-form glass">
                <input type="text" placeholder="Name">
                <input type="email" placeholder="Email">
                <textarea placeholder="Message" rows="4"></textarea>
                <button style="width: 100%; padding: 1rem; background: rgba(255,255,255,0.2); border: none; border-radius: 10px; color: white; cursor: pointer;">Send Message</button>
            </div>
        </div>
    </div>
</body>
</html>`
];