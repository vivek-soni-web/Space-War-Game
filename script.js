const player = document.getElementById("player");
const alien = document.getElementById("alien");
const game = document.getElementById("game");
const scoreText = document.getElementById("score");
const gameOver = document.getElementById("gameOver");

let playerX = 180;
let score = 0;
let alienY = 20;

document.addEventListener("keydown", function (e) {

    if (gameOver.style.display === "block") {
        return;
    }

    if (e.key === "ArrowLeft") {
        playerX -= 20;
    }

    if (e.key === "ArrowRight") {
        playerX += 20;
    }

    if (playerX < 0) playerX = 0;
    if (playerX > 410) playerX = 410;

    player.style.left = playerX + "px";

    if (e.code === "Space" && gameOver.style.display !== "block") {
        shoot();
    }
});

function shoot() {

    const bullet = document.createElement("div");

    bullet.className = "bullet";

    bullet.innerHTML = `
        <img src="bullet.png" class="bulletImg">
    `;

    bullet.style.left = playerX + 10 + "px";
    bullet.style.top = "5px";

    game.appendChild(bullet);

    let bulletY = 410;

    const moveBullet = setInterval(function () {

        bulletY -= 9;
        bullet.style.top = bulletY + "px";

        if (
            bulletY < alienY + 10 &&
            bulletY > alienY &&
            playerX + 20 > alien.offsetLeft &&
            playerX < alien.offsetLeft + 20
        ) {
            clearInterval(moveBullet);
            bullet.remove();

            alien.style.display = "none";
            score++;
            scoreText.innerText = "Score: " + score;

            setTimeout(function () {

                alien.style.left =
                    Math.random() * 260 + "px";
                alienY = 20;
                alien.style.top = alienY + "px";
                alien.style.display = "block";
            }, 300);
        }
        if (bulletY < 0) {
            clearInterval(moveBullet);
            bullet.remove();
        }

    }, 30);
}

setInterval(function () {
    if (alien.style.display === "none") return;
    alienY += 2;
    alien.style.top = alienY + "px";
    if (alienY > 470) {
        gameOver.style.display = "block";
    }
}, 30);