export const calculateNewPosition = <T extends { position: number }>(
  elements: T[],
) =>
  elements.length === 0
    ? 0
    : Math.max(...elements.map((card) => card.position)) + 1;
