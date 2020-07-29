import React from "react";

class EffectCanvas extends React.Component {
  done = true;

  circles = [];

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

    this.effectInterval = setInterval(() => {
      ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);

      switch (effect) {
        case "swirl":
          this.swirlEffect();
          break;
        case "explode":
          this.explodeEffect();
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
          this.done = true;
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

      circle.size *= 1.03;

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
        if (circle.size > window.innerWidth) {
          this.done = true;
        }
      } else {
        if (circle.size > window.innerHeight) {
          this.done = true;
        }
      }
    } else {
      const circle = {
        size: 1,
      };

      this.circles.push(circle);
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
