let trail = []; // 🟢 포탄의 궤적 좌표를 저장할 배열

function fire() {
    const angleDeg = parseFloat(document.getElementById('angle').value);
    const power = parseFloat(document.getElementById('power').value);

    const angleRad = angleDeg * Math.PI / 180;

    projectile = {
        x: cannon.x,
        y: cannon.y,
        vx: Math.cos(angleRad) * power / 2,
        vy: -Math.sin(angleRad) * power / 2,
        radius: 5
    };

    trail = []; // 🔄 새로 발사할 때 궤적 초기화
}

function update() {
    if (projectile) {
        // 🟢 위치 저장
        trail.push({ x: projectile.x, y: projectile.y });

        projectile.x += projectile.vx;
        projectile.vy += gravity;
        projectile.y += projectile.vy;

        // 충돌 체크
        if (projectile.x > target.x && projectile.x < target.x + target.width &&
            projectile.y > target.y && projectile.y < target.y + target.height) {
            score++;
            alert(`🎯 명중! 점수: ${score}`);
            resetGame();
        }

        if (projectile.y > canvas.height) {
            projectile = null;
        }
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 대포
    ctx.fillStyle = 'black';
    ctx.fillRect(cannon.x - 10, cannon.y - 10, 20, 20);

    // 🟢 궤적 그리기
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    for (let i = 0; i < trail.length; i++) {
        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    // 포탄
    if (projectile) {
        ctx.beginPath();
        ctx.arc(projectile.x, projectile.y, projectile.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    // 목표물
    ctx.fillStyle = 'green';
    ctx.fillRect(target.x, target.y, target.width, target.height);

    // 점수
    ctx.fillStyle = 'black';
    ctx.font = '16px sans-serif';
    ctx.fillText(`점수: ${score}`, 10, 20);
}
let message = "";
let messageTimer = 0;
if (projectile.x > target.x && projectile.x < target.x + target.width &&
    projectile.y > target.y && projectile.y < target.y + target.height) {
    
    score++;

    if (score % 3 === 0) {
        level++;
        message = `🎉 레벨업! 현재 레벨: ${level}`;
    } else {
        message = `🎯 명중! 점수: ${score}`;
    }

    messageTimer = 120;  // 약 2초간 표시 (60FPS 기준)
    resetGame();
}
// 메시지 표시
if (messageTimer > 0) {
    ctx.fillStyle = 'blue';
    ctx.font = '20px bold sans-serif';
    ctx.fillText(message, canvas.width / 2 - 100, 50);
    messageTimer--;
}
