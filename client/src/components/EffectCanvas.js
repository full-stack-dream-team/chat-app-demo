import React from "react";

class EffectCanvas extends React.Component {
  done = true;

  circles = [];
  lines = [];
  timer = 0;

  handleResize = () => {
    this.Canvas.width = window.innerWidth;
    this.Canvas.height = window.innerHeight;
  };

  startEffect = (effect) => {
    const { ctx } = this;

    if (this.effectInterval) {
      clearInterval(this.effectInterval);
    }

    this.done = false;
    this.circles = [];
    this.lines = [];
    this.timer = 0;

    ctx.globalAlpha = 1;

    this.effectInterval = setInterval(() => {
      ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);

      switch (effect) {
        case "swirl":
          this.swirlEffect();
          break;
        case "explode":
          this.explodeEffect();
          break;
        case "rain":
          this.rainEffect();
          break;
        case "refresh":
          this.refreshEffect();
          break;
        default:
      }

      if (this.done && this.effectInterval) {
        ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);

        clearInterval(this.effectInterval);
      }
    }, 1000 / 60);
  };

  swirlEffect = () => {
    const { ctx } = this;

    if (this.circles.length) {
      this.circles.forEach((circle, i) => {
        circle.y += circle.speed;

        circle.spiral += circle.speed / 20;
        if (circle.spiral > Math.PI * 2) {
          circle.spiral -= Math.PI * 2;
        }

        if (Math.floor(Math.random() * 2) === 0) {
          const particle = {
            x: circle.x + Math.sin(circle.spiral) * 80,
            y: circle.y,
            vx: Math.random() * 2 - 1,
            vy: -Math.random() - 1,
          };
          circle.particles.push(particle);
        }
        if (circle.particles.length > 20) {
          circle.particles.shift();
        }

        ctx.fillStyle = `#${circle.color}`;

        circle.particles.forEach((particle, i) => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 4, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.beginPath();
        ctx.arc(
          circle.x + Math.sin(circle.spiral) * 80,
          circle.y,
          8,
          0,
          Math.PI * 2
        );
        ctx.fill();

        if (circle.y > window.innerHeight) {
          if (ctx.globalAlpha - 0.01 > 0) {
            ctx.globalAlpha -= 0.01;
          } else {
            this.done = true;
          }
        }
      });
    } else {
      for (let i = 0; i < 20; i++) {
        const circle = {
          x: Math.random() * window.innerWidth,
          y: 0,
          spiral: Math.random() * (Math.PI * 2),
          speed: Math.random() * 3 + 2,
          particles: [],
          color: Math.floor(Math.random() * 16777215).toString(16),
        };

        this.circles.push(circle);
      }
    }
  };

  explodeEffect = () => {
    const { ctx } = this;

    if (this.circles.length) {
      const [circle] = this.circles;

      circle.size *= 1.15;

      ctx.fillStyle = "yellow";

      ctx.beginPath();
      ctx.arc(
        window.innerWidth / 2,
        window.innerHeight / 2,
        circle.size * 2,
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.fillStyle = "orange";

      ctx.beginPath();
      ctx.arc(
        window.innerWidth / 2,
        window.innerHeight / 2,
        circle.size * 1.25,
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.fillStyle = "red";

      ctx.beginPath();
      ctx.arc(
        window.innerWidth / 2,
        window.innerHeight / 2,
        circle.size,
        0,
        Math.PI * 2
      );
      ctx.fill();

      if (window.innerWidth > window.innerHeight) {
        if (circle.size > window.innerWidth / 6) {
          if (ctx.globalAlpha - 0.05 > 0) {
            ctx.globalAlpha -= 0.05;
          } else {
            this.done = true;
          }
        }
      } else {
        if (circle.size > window.innerHeight / 6) {
          if (ctx.globalAlpha - 0.05 > 0) {
            ctx.globalAlpha -= 0.05;
          } else {
            this.done = true;
          }
        }
      }
    } else {
      const circle = {
        size: 1,
      };

      this.circles.push(circle);
    }
  };

  rainEffect = () => {
    const { ctx } = this;

    if (this.lines.length) {
      ctx.strokeStyle = "grey";

      this.lines.forEach((line, i) => {
        line.x += 10;
        line.y += 50;

        if (line.y > window.innerHeight) {
          line.x = Math.random() * window.innerWidth;
          line.y = -50;
        }

        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + 10, line.y + 50);
        ctx.stroke();
      });

      this.timer += 1;
      if (this.timer > 200) {
        if (ctx.globalAlpha - 0.01 > 0) {
          ctx.globalAlpha -= 0.01;
        } else {
          this.done = true;
        }
      }
    } else {
      for (let i = 0; i < 200; i++) {
        const line = {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        };

        this.lines.push(line);
      }
    }
  };

  refreshEffect = () => {
    const { ctx } = this;

    if (this.lines.length) {
      const [line] = this.lines;

      if (line.x < window.innerWidth) {
        line.x += 20;
      } else if (this.timer < 30) {
        this.timer += 1;
      } else if (line.y < window.innerHeight) {
        line.y += 20;
      } else {
        this.done = true;
      }

      ctx.fillStyle = "white";

      ctx.fillRect(0, line.y, line.x, window.innerHeight);
    } else {
      this.lines.push({
        x: 0,
        y: 0,
      });
    }
  };

  componentDidMount() {
    this.ctx = this.Canvas.getContext("2d");

    window.addEventListener("resize", this.handleResize);
  }

  componentDidUpdate(prevProps) {
    if (this.props.effect && prevProps.effect !== this.props.effect) {
      this.startEffect(this.props.effect);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);

    if (this.effectInterval) {
      clearInterval(this.effectInterval);
    }
  }

  render() {
    return (
      <canvas
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: 1000,
          pointerEvents: "none",
        }}
        width={window.innerWidth}
        height={window.innerHeight}
        ref={(Canvas) => {
          this.Canvas = Canvas;
        }}
      ></canvas>
    );
  }
}

export default EffectCanvas;
