const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');
const textBox = document.getElementById('text-box');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// You can change the message inside the quotes!
const message = "Hey you! 💖\nHappy Birthday 🎂\n\nYou're pretty awesome...\nSending good vibes!\nHope you have a great day! ✨";

function typeWriter(text, i) {
    if (i < text.length) {
        textBox.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), 100);
    }
}

function drawTree(x, y, len, angle, width) {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = "#4e342e"; // Trunk color
    ctx.lineWidth = width;
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();

    if (len < 10) {
        // This draws the heart leaves
        ctx.fillStyle = "#ff69b4";
        ctx.font = "14px Arial";
        ctx.fillText("❤️", 0, -len);
        ctx.restore();
        return;
    }

    // This makes the branches grow smoothly
    setTimeout(() => {
        drawTree(0, -len, len * 0.75, angle - 20, width * 0.7);
        drawTree(0, -len, len * 0.75, angle + 20, width * 0.7);
    }, 50);

    ctx.restore();
}

function init() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    typeWriter(message, 0);
    // Position the tree at the bottom center
    drawTree(canvas.width / 2, canvas.height - 50, 120, 0, 10);
}
