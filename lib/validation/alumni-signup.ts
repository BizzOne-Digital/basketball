import { z } from "zod";

const optionalText = (max: number) => z.string().trim().max(max);

export const alumniSignupSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  address: optionalText(200),
  city: optionalText(120),
  state: optionalText(80),
  zip: optionalText(20),
  cellPhone: optionalText(40),
  email: z.string().trim().email("Valid email is required").max(254),
  graduationYear: optionalText(10),
  sportsPlayed: z
    .string()
    .trim()
    .min(1, "Sports played is required")
    .max(200),
  gender: optionalText(40),
  teammatesInContact: optionalText(1000),
  degreeEarned: optionalText(200),
  occupation: optionalText(200),
  company: optionalText(200),
  favoriteMemory: optionalText(5000),
  consent: z.boolean().refine((value) => value === true, {
    message: "Consent is required",
  }),
  honeypot: z.string().trim().max(0).optional(),
});

export type AlumniSignupInput = z.infer<typeof alumniSignupSchema>;
