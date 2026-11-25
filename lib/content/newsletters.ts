export type NewsletterIssue = {
  issue: number;
  title: string;
  filename: string;
};

/** PDF/Word files live in `public/newsletter/` and are served at `/newsletter/<filename>`. */
export const PO_BASKETBALL_NEWSLETTERS: NewsletterIssue[] = [
  {
    issue: 11,
    title: "P-O Dribble Drive Coaches Newsletter — November 25, 2026",
    filename: "PO_Dribble_Drive_Newsletter_Nov_25_2026.docx",
  },
  {
    issue: 10,
    title: "P-O Dribble Drive Coaches Newsletter — November 18, 2026",
    filename: "PO_Dribble_Drive_Newsletter_Nov_18_2026.docx",
  },
  {
    issue: 9,
    title: "P-O Dribble Drive Coaches Newsletter — Issue 9",
    filename: "PO_Dribble_Drive_Coaches_Newsletter-9.pdf",
  },
  {
    issue: 8,
    title: "P-O Dribble Drive Coaches Newsletter — Issue 8",
    filename: "PO_Dribble_Drive_Coaches_Newsletter-8.pdf",
  },
  {
    issue: 6,
    title: "P-O Dribble Drive Coaches Newsletter — Issue 6",
    filename: "PO_Dribble_Drive_Coaches_Newsletter-6.pdf",
  },
  {
    issue: 5,
    title: "P-O Dribble Drive Coaches Newsletter — Issue 5",
    filename: "PO_Dribble_Drive_Coaches_Newsletter-5.pdf",
  },
  {
    issue: 4,
    title: "P-O Dribble Drive Coaches Newsletter — Issue 4",
    filename: "PO_Dribble_Drive_Coaches_Newsletter-4.pdf",
  },
  {
    issue: 3,
    title: "P-O Dribble Drive Coaches Newsletter — Issue 3",
    filename: "PO_Dribble_Drive_Coaches_Newsletter-3.pdf",
  },
  {
    issue: 2,
    title: "P-O Dribble Drive Coaches Newsletter — Issue 2",
    filename: "PO_Dribble_Drive_Coaches_Newsletter-2.pdf",
  },
  {
    issue: 1,
    title: "P-O Dribble Drive Coaches Newsletter — Issue 1",
    filename: "PO_Dribble_Drive_Coaches_Newsletter.pdf",
  },
];

export function newsletterPdfHref(filename: string): string {
  return `/newsletter/${encodeURIComponent(filename)}`;
}
