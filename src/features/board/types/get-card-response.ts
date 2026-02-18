export type GetCardResponse = {
  id: number;
  title: string;
  position: number;
  color?: string;
  description?: string;
  custom?: Record<string, string>;
  users?: number[];
  created_at?: Date;
};
