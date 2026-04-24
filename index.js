/**
 * Parcial - Gráficos por Computador poligono regular de n lados
 * Univerasidad militar nueva granada 
 * Estudiante: Nikoll Alejandra Borja Mayorca 
 * Tarea: Implementar algoritmos de rasterización manual
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
/**
 * Algoritmo de Bresenham para líneas
 * Soporta todas las pendientes (m > 1, m < 0, etc.)
 * 
 * err: representa el error acumulado entre la línea ideal (continua)
 *      y la línea dibujada (discreta).
 * e2: permite decidir si avanzar en X, en Y o en ambos.
 */
/**
 * Dibuja una línea usando el algoritmo de Bresenham
 * @param {number} x0 - coordenada X inicial
 * @param {number} y0 - coordenada Y inicial
 * @param {number} x1 - coordenada X final
 * @param {number} y1 - coordenada Y final
 */
function bresenhamLine(x0, y0, x1, y1) { // Uso único de enteros lo que hace que sea más eficiente// 

  let dx = Math.abs(x1 - x0); //Diferencia en x//
  let dy = Math.abs(y1 - y0); //Diferencia en y//

  let sx = (x0 < x1) ? 1 : -1; //Dirección en x// 
  let sy = (y0 < y1) ? 1 : -1; //Dirección en y// 

  let err = dx - dy;//Parámetro de decisión (error acumulado)//

  while (true) {

    drawPixel(ctx, x0, y0);

    if (x0 === x1 && y0 === y1) break;

    let e2 = 2 * err;//Doble error acumulado para decidir el movimiento// 

    // Movimiento en X
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }

    // Movimiento en Y
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
}
/**
 * Algoritmo de circunferencia (Punto Medio)
 * Optimizado usando simetría en 8 octantes
 */
/**
 * Dibuja una circunferencia usando el algoritmo de punto medio
 * @param {number} cx - coordenada X del centro
 * @param {number} cy - coordenada Y del centro
 * @param {number} r - radio de la circunferencia
 */
function midpointCircle(cx, cy, r) {

  let x = 0; //Coordenada incial en x// 
  let y = r; //Coordenada incial en y// 
  let d = 3 - 2 * r; //Parámetro de decisión incial para optimizar midpoint// 

  while (x <= y) {
//Dibujar los 8 puntos simétricos de la circunferencia// 
    plotCirclePoints(cx, cy, x, y);

    if (d < 0) { 
      d = d + 4 * x + 6;
    } else {
      d = d + 4 * (x - y) + 10;
      y--;
    }

    x++;
  }
}
/**
 * Dibuja los 8 puntos simétricos de la circunferencia
 */
function plotCirclePoints(cx, cy, x, y) {

  drawPixel(ctx, cx + x, cy + y);
  drawPixel(ctx, cx - x, cy + y);
  drawPixel(ctx, cx + x, cy - y);
  drawPixel(ctx, cx - x, cy - y);

  drawPixel(ctx, cx + y, cy + x);
  drawPixel(ctx, cx - y, cy + x);
  drawPixel(ctx, cx + y, cy - x);
  drawPixel(ctx, cx - y, cy - x);
}
/**
 * Calcula los vértices de un polígono regular
 */
/**
 * Calcula los vértices de un polígono regular
 * @param {number} centerX - coordenada X del centro
 * @param {number} centerY - coordenada Y del centro
 * @param {number} sides - número de lados del polígono
 * @param {number} radius - distancia del centro a los vértices
 * @returns {Array} lista de vértices {x, y}
 */
function getPolygonVertices(centerX, centerY, sides, radius) {

  let vertices = [];

  for (let i = 0; i < sides; i++) {

    let angle = (2 * Math.PI * i) / sides;

    let x = centerX + radius * Math.cos(angle);
    let y = centerY + radius * Math.sin(angle);

    vertices.push({
      x: Math.round(x),
      y: Math.round(y)
    });
  }

  return vertices;
}
 
/**
 * Dibuja el polígono conectando vértices
 */
function drawPolygon(vertices) {

  for (let i = 0; i < vertices.length; i++) {

    let p1 = vertices[i];
    let p2 = vertices[(i + 1) % vertices.length];

    bresenhamLine(p1.x, p1.y, p2.x, p2.y);
  }
}

/**
 * Dibuja circunferencias en cada vértice (radio R/4)
 */
function drawCirclesOnVertices(vertices, radius) {

  for (let v of vertices) {
    midpointCircle(v.x, v.y, radius);
  }
}
/**
 * Genera toda la figura automáticamente
 */
function generateFigure() {

  ctx.clearRect(0, 0, W, H);

  // Número de lados entre 5 y 10
  let n = Math.floor(Math.random() * 6) + 5;

  let R = 180;

  let centerX = W / 2;
  let centerY = H / 2;

  let vertices = getPolygonVertices(centerX, centerY, n, R);

  drawPolygon(vertices);

  drawCirclesOnVertices(vertices, Math.floor(R / 4));
}
