export const signUpKeys = {
  all: ["sign-up"] as const,
  detail: (id: string) => [...signUpKeys.all, id] as const,
  upcoming: (filters: { patientId?: string; page: number }) =>
    [...signUpKeys.all, "upcoming", filters] as const,
};
