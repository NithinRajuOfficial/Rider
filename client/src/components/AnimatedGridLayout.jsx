import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const AnimatedGridPattern = ({
  columns = 30,
  rows = 30,
  cellSize = 25,
  gap = 1,
  backgroundColor = "#1a1a1a",
  lineColor = "#ffffff",
  highlightColor = "#3b82f6",
  animationDuration = 30,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to fit its container
    const resizeCanvas = () => {
      const { width, height } = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create animated cells
    const createAnimatedCells = () => {
      const activeCellCount = Math.floor(columns * rows * 0.02); // 2% of cells active at a time
      return new Array(activeCellCount).fill().map(() => ({
        x: Math.floor(Math.random() * columns),
        y: Math.floor(Math.random() * rows),
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
        maxSize: 1 + Math.random() * 1.5,
        color: Math.random() > 0.7 ? highlightColor : backgroundColor,
        lifespan: 3 + Math.random() * 5,
        born: Date.now() / 1000,
      }));
    };

    let animatedCells = createAnimatedCells();
    let animationFrameId;

    // Draw the base grid
    const drawGrid = () => {
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;

      // Draw vertical lines
      for (let i = 0; i <= columns; i++) {
        const x = i * (cellSize + gap);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let i = 0; i <= rows; i++) {
        const y = i * (cellSize + gap);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Draw animated cells
    const drawAnimatedCells = () => {
      const now = Date.now() / 1000;

      animatedCells.forEach((cell, index) => {
        const age = now - cell.born;

        // Respawn cell if its lifespan is over
        if (age > cell.lifespan) {
          animatedCells[index] = {
            x: Math.floor(Math.random() * columns),
            y: Math.floor(Math.random() * rows),
            phase: Math.random() * Math.PI * 2,
            speed: 0.5 + Math.random() * 1.5,
            maxSize: 1 + Math.random() * 1.5,
            color: Math.random() > 0.7 ? highlightColor : backgroundColor,
            lifespan: 3 + Math.random() * 5,
            born: now,
          };
          return;
        }

        // Calculate animation properties
        const lifeProgress = age / cell.lifespan;
        const alpha =
          lifeProgress < 0.2
            ? lifeProgress / 0.2
            : lifeProgress > 0.8
            ? 1 - (lifeProgress - 0.8) / 0.2
            : 1;
        const pulse = Math.sin((age * cell.speed) % Math.PI) * 0.5 + 0.5;
        const sizeMultiplier = 1 + (cell.maxSize - 1) * pulse;
        const currentCellSize = cellSize * sizeMultiplier;
        const x = cell.x * (cellSize + gap) + (cellSize - currentCellSize) / 2;
        const y = cell.y * (cellSize + gap) + (cellSize - currentCellSize) / 2;

        // Draw cell
        ctx.fillStyle =
          cell.color === backgroundColor
            ? `rgba(26, 26, 26, ${alpha})`
            : `rgba(59, 130, 246, ${alpha * 0.8})`;
        ctx.fillRect(x, y, currentCellSize, currentCellSize);

        // Draw cell border
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, currentCellSize, currentCellSize);
      });
    };

    // Render loop
    const render = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid();
      drawAnimatedCells();

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    // Periodic cell refresh
    const refreshInterval = setInterval(() => {
      const newCellCount = Math.floor(animatedCells.length * 0.2);
      for (let i = 0; i < newCellCount; i++) {
        const indexToReplace = Math.floor(Math.random() * animatedCells.length);
        animatedCells[indexToReplace] = {
          x: Math.floor(Math.random() * columns),
          y: Math.floor(Math.random() * rows),
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 1.5,
          maxSize: 1 + Math.random() * 1.5,
          color: Math.random() > 0.7 ? highlightColor : backgroundColor,
          lifespan: 3 + Math.random() * 5,
          born: Date.now() / 1000,
        };
      }
    }, 2000);

    // Cleanup
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      clearInterval(refreshInterval);
    };
  }, [
    columns,
    rows,
    cellSize,
    gap,
    backgroundColor,
    lineColor,
    highlightColor,
    animationDuration,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-full"
      role="img"
      aria-label="Animated grid pattern"
    />
  );
};

// PropTypes for type checking
AnimatedGridPattern.propTypes = {
  columns: PropTypes.number,
  rows: PropTypes.number,
  cellSize: PropTypes.number,
  gap: PropTypes.number,
  backgroundColor: PropTypes.string,
  lineColor: PropTypes.string,
  highlightColor: PropTypes.string,
  animationDuration: PropTypes.number,
};

export default AnimatedGridPattern;
