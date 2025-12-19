type CollisionAxis = "X" | "Y";

interface CollisionResult {
  hit: boolean;
  axis?: CollisionAxis;
}

interface Circle {
  x: number;
  y: number;
  rad: number;
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function BrickCollision(
  circle: Circle,
  rect: Rect
): CollisionResult {
  const distX = Math.abs(circle.x - rect.x - rect.width / 2);
  const distY = Math.abs(circle.y - rect.y - rect.height / 2);

  if (distX > rect.width / 2 + circle.rad) {
    return { hit: false };
  }

  if (distY > rect.height / 2 + circle.rad) {
    return { hit: false };
  }

  if (distX <= rect.width / 2) {
    return {
      hit: true,
      axis: "Y",
    };
  }

  if (distY <= rect.height / 2) {
    return {
      hit: true,
      axis: "X",
    };
  }

  // Corner collision
  const dx = distX - rect.width / 2;
  const dy = distY - rect.height / 2;

  return {
    hit: dx * dx + dy * dy <= circle.rad * circle.rad,
    axis: "X",
  };
}
