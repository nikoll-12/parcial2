/**
 * Parcial - Gráficos por Computador poligono regular de n lados
 *
 */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;
/**
 * Dibuja un píxel individual (base de todo)
 */
function drawPixel(ctx, x, y, color = "#000") {
  ctx.fillStyle = color;
  ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}
