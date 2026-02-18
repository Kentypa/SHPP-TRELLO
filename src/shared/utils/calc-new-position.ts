export const calculateNewPosition = <T extends { position: number }>(
  elements: T[],
) => Math.max(...elements.map((card) => card.position)) + 1;
