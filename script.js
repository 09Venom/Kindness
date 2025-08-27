let currentAnimation = null;

function showScene(number) {
  const scenes = document.querySelectorAll('.scene');
  scenes.forEach((scene, index) => {
    scene.style.display = (index === number - 1) ? 'block' : 'none';
  });

  if(currentAnimation) cancelAnimationFrame(currentAnimation);

  if(number === 1) currentAnimation = animateScene1();
  if(number === 2) currentAnimation = animateScene2();
  if(number === 3) currentAnimation = animateScene3();
  if(number === 4) currentAnimation = animateScene4();
}

// Scene 1
function animateScene1() {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let x = 0;
  function loop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x,100,30,0,Math.PI*2);
    ctx.fill();
    x += 2;
    if (x > canvas.width) x = 0;
    currentAnimation = requestAnimationFrame(loop);
  }
  loop();
  return currentAnimation;
}

// Scene 2
function animateScene2() {
  const canvas = document.getElementById('canvas2');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let y = 0;
  function loop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(200,y,50,50);
    y += 2;
    if(y > canvas.height) y = 0;
    currentAnimation = requestAnimationFrame(loop);
  }
  loop();
  return currentAnimation;
}

// Scene 3 - random anime images
function animateScene3() {
  const canvas = document.getElementById('canvas3');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const imageUrls = [
    'https://i.ibb.co/0s5Kjkt/anime1.png',
    'https://i.ibb.co/dG3t6mX/anime2.png',
    'https://i.ibb.co/2k2Y7cK/anime3.png'
  ];
  const images = imageUrls.map(url => {
    const img = new Image();
    img.src = url;
    return img;
  });

  const objects = [];
  for(let i=0;i<10;i++){
    objects.push({
      img: images[Math.floor(Math.random()*images.length)],
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      speed: Math.random()*1 + 0.5
    });
  }

  function loop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    objects.forEach(obj => {
      ctx.drawImage(obj.img, obj.x, obj.y, 80, 80);
      obj.y -= obj.speed;
      if(obj.y + 80 < 0) obj.y = canvas.height;
    });
    currentAnimation = requestAnimationFrame(loop);
  }
  loop();
  return currentAnimation;
}

// Scene 4 - middle circle
function animateScene4() {
  const canvas = document.getElementById('canvas4');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let radius = 10;
  let growing = true;

  function loop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, radius, 0, Math.PI*2);
    ctx.fill();

    if(growing) radius += 1;
    else radius -=1;

    if(radius > 100) growing = false;
    if(radius < 10) growing = true;

    currentAnimation = requestAnimationFrame(loop);
  }
  loop();
  return currentAnimation;
}

showScene(1);