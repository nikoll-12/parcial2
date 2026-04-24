/**
 * Parcial - Gráficos por Computador poligono regular de n lados
 *
 */
/**
 * Dibuja un píxel en el canvas
 * @param {CanvasRenderingContext2D} ctx - contexto de dibujo del canvas
 * @param {number} x - coordenada horizontal del píxel
 * @param {number} y - coordenada vertical del píxel
 * @param {string} color - color del píxel
 */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const W = canvas.width;
const H = canvas.height;
/**
 * Dibuja un píxel individual (base de todo)
 */
/**
 * Dibuja un píxel individual en el canvas
 * @param {CanvasRenderingContext2D} ctx - contexto 2D del canvas
 * @param {number} x - posición horizontal del píxel
 * @param {number} y - posición vertical del píxel
 * @param {string} color - color del píxel (por defecto negro)
 */
function drawPixel(ctx, x, y, color = "#000") {
  ctx.fillStyle = color;
  ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

