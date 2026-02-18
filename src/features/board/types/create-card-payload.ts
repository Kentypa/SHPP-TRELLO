export type CreateCardPayload = {
  title: string;
  list_id: number;
  position: number;
  description: string;
  custom?: Record<string, string>;
};
