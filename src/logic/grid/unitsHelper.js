export function clampDirectionToOne(dirX, dirY) {
  dirX = dirX > 1 ? 1 : dirX < -1 ? -1 : dirX;
  dirY = dirY > 1 ? 1 : dirY < -1 ? -1 : dirY;

  return { dirX, dirY };
}
