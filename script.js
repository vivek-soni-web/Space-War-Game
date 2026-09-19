const player = document.getElementById("player");
const alien = document.getElementById("alien");
const game = document.getElementById("game");
const scoreText = document.getElementById("score");
const gameOver = document.getElementById("gameOver");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const fireBtn = document.getElementById("fireBtn");

let playerX = 480;
let score = 0;
let alienY = 20;
let movingLeft = false;
let movingRight = false;
let alienHit = false;

function movePlayer() {

    if (gameOver.style.display === "block") {
        return;
    }

    if (movingLeft) {
        playerX -= 5;
    }

    if (movingRight) {
        playerX += 5;
    }

    if (playerX < 0) {
        playerX = 0;
    }

    const maxPlayerX =
        game.clientWidth - player.offsetWidth;

    if (playerX > maxPlayerX) {
        playerX = maxPlayerX;
    }

    player.style.left =
        playerX + "px";
    requestAnimationFrame(movePlayer);
}

movePlayer();

document.addEventListener("keydown", function (e) {

    if (gameOver.style.display === "block") {
        return;
    }

    if (e.key === "ArrowLeft") {
        e.preventDefault();
        movingLeft = true;
    }

    if (e.key === "ArrowRight") {
        e.preventDefault();
        movingRight = true;
    }

    if (e.code === "Space") {
        e.preventDefault();
        shoot();
    }
});

document.addEventListener("keyup", function (e) {

    if (e.key === "ArrowLeft") {
        movingLeft = false;
    }

    if (e.key === "ArrowRight") {
        movingRight = false;
    }
});

leftBtn.addEventListener("pointerdown", function (e) {
    e.preventDefault();
    movingLeft = true;
});

leftBtn.addEventListener("pointerup", function (e) {
    e.preventDefault();
    movingLeft = false;
});

leftBtn.addEventListener("pointerleave", function () {
    movingLeft = false;
});

leftBtn.addEventListener("pointercancel", function () {
    movingLeft = false;
});

rightBtn.addEventListener("pointerdown", function (e) {
    e.preventDefault();
    movingRight = true;
});

rightBtn.addEventListener("pointerup", function (e) {
    e.preventDefault();
    movingRight = false;
});

rightBtn.addEventListener("pointerleave", function () {
    movingRight = false;
});

rightBtn.addEventListener("pointercancel", function () {
    movingRight = false;
});

fireBtn.addEventListener("pointerdown", function (e) {
    e.preventDefault();
    shoot();
});

function shoot() {

    if (gameOver.style.display === "block") {
        return;
    }

    const bullet =
        document.createElement("div");

    bullet.className = "bullet";

    bullet.innerHTML = `
        <img src="bullet.png" class="bulletImg">
    `;

    bullet.style.left =
        playerX + 10 + "px";

    const gameHeight =
        game.clientHeight;

    let bulletY =
        gameHeight - 90;

    bullet.style.top =
        bulletY + "px";

    game.appendChild(bullet);

    const moveBullet =
        setInterval(function () {

            bulletY -= 10;
            bullet.style.top =
                bulletY + "px";

if (
    !alienHit &&
    bulletY < alienY + alien.offsetHeight &&
    bulletY + bullet.offsetHeight > alienY &&
    playerX + player.offsetWidth > alien.offsetLeft &&
    playerX < alien.offsetLeft + alien.offsetWidth
) {
                alienHit = true;
                clearInterval(moveBullet);

                bullet.remove();

                alien.style.display =
                    "none";

                score++;
                scoreText.innerText =
                    "Score: " + score;

                setTimeout(function () {

                    const maxAlienX =
                        game.clientWidth -
                        alien.offsetWidth;
                    alien.style.left =
                        Math.random() *
                        maxAlienX + "px";
                    alienY = 20;
                    alien.style.top =
                        alienY + "px";
                    alien.style.display =
                        "block";
                    alienHit = false;
                }, 400);
            }
            if (bulletY < 70) {
                clearInterval(moveBullet);
                bullet.remove();
            }
        }, 15);
}

setInterval(function () {

    if (alien.style.display === "none") {
        return;
    }
    if (gameOver.style.display === "block") {
        return;
    }
    alienY += 2;
    alien.style.top =
        alienY + "px";
    if (
        alienY >
        game.clientHeight - 100
    ) {
        gameOver.style.display =
            "block";
        movingLeft = false;
        movingRight = false;
    }
}, 10);