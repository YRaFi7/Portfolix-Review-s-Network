import { z } from 'zod';

export const ReviewSubmissionSchema = z.object({
  brandSlug: z.string().min(1, "Brand slug is required"),
  authorName: z.string().min(1, "Full name is required").max(100, "Name too long"),
  authorEmail: z.string().email("Please provide a valid email address"),
  authorPhone: z.string().max(30).optional().or(z.literal('')),
  reviewerType: z.enum([
    'Student',
    'Alumni',
    'Client',
    'Business Client',
    'Intern',
    'Parent',
    'Partner',
    'Other'
  ]).default('Student'),
  authorTitle: z.string().max(100).optional().or(z.literal('')),
  authorCompany: z.string().max(100).optional().or(z.literal('')),
  authorLocation: z.string().max(100).optional().or(z.literal('')),
  serviceUsed: z.string().min(1, "Please select the service/course/product"),
  rating: z.coerce.number().int().min(1, "Rating must be at least 1 star").max(5, "Rating cannot exceed 5 stars"),
  title: z.string().min(2, "Review title must be at least 2 characters").max(200, "Title too long"),
  content: z.string().min(10, "Please provide detailed experience (minimum 10 characters)").max(5000, "Content too long"),
  pros: z.string().max(1000).optional().or(z.literal('')),
  cons: z.string().max(1000).optional().or(z.literal('')),
  experienceDate: z.string().optional().or(z.literal('')),
  permissionToPublish: z.boolean().default(true),
  verificationEvidence: z.string().max(500).optional().or(z.literal('')),
  source: z.enum(['DIRECT', 'TRUSTPILOT', 'GOOGLE', 'CLUTCH', 'G2', 'VERIFIED_IMPORT']).default('DIRECT'),
  sourceUrl: z.string().url("Invalid source URL").optional().or(z.literal('')),
  isVerifiedBuyer: z.boolean().default(true),
  // Anti-spam honeypot (must remain empty for genuine submissions)
  website_honeypot: z.string().max(0, "Spam detected").optional().or(z.literal('')),
});

export type ReviewSubmissionInput = z.infer<typeof ReviewSubmissionSchema>;

export const ModerationActionSchema = z.object({
  reviewId: z.string().min(1),
  status: z.enum(['APPROVED', 'REJECTED', 'FLAGGED', 'PENDING']),
  reason: z.string().optional(),
});

export const CompanyResponseSchema = z.object({
  reviewId: z.string().min(1),
  authorName: z.string().min(1, "Name required"),
  authorRole: z.string().min(1, "Role required"),
  content: z.string().min(2, "Response must be at least 2 characters").max(3000),
});

export const ReportSubmissionSchema = z.object({
  reviewId: z.string().min(1),
  reason: z.enum(['SPAM', 'OFFENSIVE', 'FAKE', 'CONFLICT_OF_INTEREST', 'OTHER']),
  details: z.string().max(1000).optional().or(z.literal('')),
  reporterEmail: z.string().email("Invalid email").optional().or(z.literal('')),
});
