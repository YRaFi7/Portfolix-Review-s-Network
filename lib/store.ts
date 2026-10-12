import { prisma } from './prisma';
import { BRANDS } from './brands';

export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'FLAGGED';
export type ReviewSource = 'DIRECT' | 'TRUSTPILOT' | 'GOOGLE' | 'CLUTCH' | 'G2' | 'VERIFIED_IMPORT';
export type Sentiment = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
export type ReportReason = 'SPAM' | 'OFFENSIVE' | 'FAKE' | 'CONFLICT_OF_INTEREST' | 'OTHER';

export interface CompanyResponseData {
  id: string;
  reviewId: string;
  authorName: string;
  authorRole: string;
  content: string;
  createdAt: string;
}

export interface ReviewData {
  id: string;
  brandSlug: string;
  authorName: string;
  authorEmail: string;
  authorTitle?: string;
  authorCompany?: string;
  authorLocation?: string;
  reviewerType?: string;
  rating: number;
  title: string;
  content: string;
  pros?: string;
  cons?: string;
  status: ReviewStatus;
  source: ReviewSource;
  sourceUrl?: string;
  isVerifiedBuyer: boolean;
  verificationStatus?: string;
  verificationMethod?: string;
  verifiedAt?: string;
  helpfulCount: number;
  unhelpfulCount: number;
  sentiment: Sentiment;
  serviceUsed?: string;
  rejectionReason?: string;
  language?: string;
  translation?: string;
  createdAt: string;
  updatedAt: string;
  responses: CompanyResponseData[];
}

export interface ImprovementData {
  id: string;
  brandId: string;
  youSaid: string;
  weDid: string;
  category?: string | null;
  implementedDate: string;
  createdAt: string;
}

export interface ExperienceReportData {
  id: string;
  brandId: string;
  year: number;
  title: string;
  slug: string;
  summary: string;
  totalRespondents: number;
  averageRating: number;
  keyFindings: Record<string, any>;
  methodology: string;
  createdAt: string;
}

export interface ReviewReportData {
  id: string;
  reviewId: string;
  reason: ReportReason;
  details?: string;
  reporterEmail?: string;
  status: 'PENDING' | 'RESOLVED' | 'DISMISSED';
  createdAt: string;
}

export interface AuditLogData {
  id: string;
  reviewId?: string;
  actorEmail: string;
  action: string;
  metadata?: string;
  createdAt: string;
}

export interface RatingStats {
  averageRating: number;
  totalReviews: number;
  verifiedCount: number;
  recommendationPercentage: number;
  breakdown: {
    5: { count: number; percentage: number };
    4: { count: number; percentage: number };
    3: { count: number; percentage: number };
    2: { count: number; percentage: number };
    1: { count: number; percentage: number };
  };
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  sourceBreakdown: Record<string, number>;
}

export const Store = {
  // Fetch reviews filtered by brand and status from PostgreSQL
  async getReviews(filter?: {
    brandSlug?: string;
    status?: ReviewStatus;
    rating?: number;
    source?: string;
    service?: string;
    verifiedOnly?: boolean;
    search?: string;
    sortBy?: 'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful';
  }): Promise<ReviewData[]> {
    try {
      const whereClause: any = {};
      
      if (filter?.brandSlug) {
        whereClause.brand = { slug: filter.brandSlug };
      }
      if (filter?.status) {
        whereClause.status = filter.status;
      }
      if (filter?.rating) {
        whereClause.rating = filter.rating;
      }
      if (filter?.verifiedOnly) {
        whereClause.isVerifiedBuyer = true;
      }
      if (filter?.source && filter.source !== 'ALL') {
        whereClause.source = filter.source;
      }
      if (filter?.service && filter.service !== 'ALL') {
        whereClause.serviceUsed = filter.service;
      }
      if (filter?.search) {
        whereClause.OR = [
          { authorName: { contains: filter.search, mode: 'insensitive' } },
          { title: { contains: filter.search, mode: 'insensitive' } },
          { content: { contains: filter.search, mode: 'insensitive' } },
        ];
      }

      let orderBy: any = { createdAt: 'desc' };
      if (filter?.sortBy === 'oldest') {
        orderBy = { createdAt: 'asc' };
      } else if (filter?.sortBy === 'highest') {
        orderBy = { rating: 'desc' };
      } else if (filter?.sortBy === 'lowest') {
        orderBy = { rating: 'asc' };
      } else if (filter?.sortBy === 'helpful') {
        orderBy = { helpfulCount: 'desc' };
      }

      const reviews = await prisma.review.findMany({
        where: whereClause,
        include: {
          brand: true,
          responses: true,
        },
        orderBy,
      });

      return reviews.map((r) => ({
        id: r.id,
        brandSlug: r.brand.slug,
        authorName: r.authorName,
        authorEmail: r.authorEmail,
        authorTitle: r.authorTitle || undefined,
        authorCompany: r.authorCompany || undefined,
        authorLocation: r.authorLocation || undefined,
        reviewerType: r.reviewerType || undefined,
        rating: r.rating,
        title: r.title,
        content: r.content,
        pros: r.pros || undefined,
        cons: r.cons || undefined,
        status: r.status as ReviewStatus,
        source: r.source as ReviewSource,
        sourceUrl: r.sourceUrl || undefined,
        isVerifiedBuyer: r.isVerifiedBuyer,
        verificationStatus: r.verificationStatus || undefined,
        verificationMethod: r.verificationMethod || undefined,
        verifiedAt: r.verifiedAt ? r.verifiedAt.toISOString() : undefined,
        helpfulCount: r.helpfulCount,
        unhelpfulCount: r.unhelpfulCount,
        sentiment: r.sentiment as Sentiment,
        serviceUsed: r.serviceUsed || undefined,
        rejectionReason: r.rejectionReason || undefined,
        language: r.language,
        translation: r.translation || undefined,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
        responses: r.responses.map((resp) => ({
          id: resp.id,
          reviewId: resp.reviewId,
          authorName: resp.authorName,
          authorRole: resp.authorRole,
          content: resp.content,
          createdAt: resp.createdAt.toISOString(),
        })),
      }));
    } catch (e) {
      console.error('Prisma getReviews error:', e);
      return [];
    }
  },

  // Get a single review by ID
  async getReviewById(id: string): Promise<ReviewData | null> {
    try {
      const r = await prisma.review.findUnique({
        where: { id },
        include: {
          brand: true,
          responses: true,
        },
      });

      if (!r) return null;

      return {
        id: r.id,
        brandSlug: r.brand.slug,
        authorName: r.authorName,
        authorEmail: r.authorEmail,
        authorTitle: r.authorTitle || undefined,
        authorCompany: r.authorCompany || undefined,
        authorLocation: r.authorLocation || undefined,
        reviewerType: r.reviewerType || undefined,
        rating: r.rating,
        title: r.title,
        content: r.content,
        pros: r.pros || undefined,
        cons: r.cons || undefined,
        status: r.status as ReviewStatus,
        source: r.source as ReviewSource,
        sourceUrl: r.sourceUrl || undefined,
        isVerifiedBuyer: r.isVerifiedBuyer,
        verificationStatus: r.verificationStatus || undefined,
        verificationMethod: r.verificationMethod || undefined,
        verifiedAt: r.verifiedAt ? r.verifiedAt.toISOString() : undefined,
        helpfulCount: r.helpfulCount,
        unhelpfulCount: r.unhelpfulCount,
        sentiment: r.sentiment as Sentiment,
        serviceUsed: r.serviceUsed || undefined,
        rejectionReason: r.rejectionReason || undefined,
        language: r.language,
        translation: r.translation || undefined,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
        responses: r.responses.map((resp) => ({
          id: resp.id,
          reviewId: resp.reviewId,
          authorName: resp.authorName,
          authorRole: resp.authorRole,
          content: resp.content,
          createdAt: resp.createdAt.toISOString(),
        })),
      };
    } catch (e) {
      console.error('Prisma getReviewById error:', e);
      return null;
    }
  },

  // Create a new submitted review
  async createReview(data: {
    brandSlug: string;
    authorName: string;
    authorEmail: string;
    authorTitle?: string;
    authorCompany?: string;
    authorLocation?: string;
    reviewerType?: string;
    rating: number;
    title: string;
    content: string;
    pros?: string;
    cons?: string;
    serviceUsed?: string;
    source?: ReviewSource;
    sourceUrl?: string;
    isVerifiedBuyer?: boolean;
    verificationMethod?: string;
    language?: string;
  }): Promise<ReviewData | null> {
    try {
      const brand = await prisma.brand.findUnique({
        where: { slug: data.brandSlug },
      });

      if (!brand) throw new Error(`Brand ${data.brandSlug} not found`);

      const sentiment: Sentiment =
        data.rating >= 4 ? 'POSITIVE' : data.rating === 3 ? 'NEUTRAL' : 'NEGATIVE';

      const newReview = await prisma.review.create({
        data: {
          brandId: brand.id,
          authorName: data.authorName,
          authorEmail: data.authorEmail,
          authorTitle: data.authorTitle,
          authorCompany: data.authorCompany,
          authorLocation: data.authorLocation,
          reviewerType: data.reviewerType || 'Customer',
          rating: data.rating,
          title: data.title,
          content: data.content,
          pros: data.pros,
          cons: data.cons,
          serviceUsed: data.serviceUsed,
          source: (data.source as any) || 'DIRECT',
          sourceUrl: data.sourceUrl,
          isVerifiedBuyer: data.isVerifiedBuyer ?? true,
          verificationStatus: data.isVerifiedBuyer ? 'PENDING_VERIFICATION' : 'UNVERIFIED',
          verificationMethod: data.verificationMethod || 'EMAIL_OTP',
          status: 'PENDING',
          sentiment: sentiment as any,
          language: data.language || 'en',
        },
        include: {
          brand: true,
          responses: true,
        },
      });

      await prisma.auditLog.create({
        data: {
          reviewId: newReview.id,
          actorEmail: data.authorEmail,
          action: 'CREATED_SUBMISSION',
          metadata: `Review created with rating ${data.rating} stars for brand ${data.brandSlug}`,
        },
      });

      return {
        id: newReview.id,
        brandSlug: newReview.brand.slug,
        authorName: newReview.authorName,
        authorEmail: newReview.authorEmail,
        authorTitle: newReview.authorTitle || undefined,
        authorCompany: newReview.authorCompany || undefined,
        authorLocation: newReview.authorLocation || undefined,
        reviewerType: newReview.reviewerType || undefined,
        rating: newReview.rating,
        title: newReview.title,
        content: newReview.content,
        pros: newReview.pros || undefined,
        cons: newReview.cons || undefined,
        status: newReview.status as ReviewStatus,
        source: newReview.source as ReviewSource,
        sourceUrl: newReview.sourceUrl || undefined,
        isVerifiedBuyer: newReview.isVerifiedBuyer,
        helpfulCount: newReview.helpfulCount,
        unhelpfulCount: newReview.unhelpfulCount,
        sentiment: newReview.sentiment as Sentiment,
        serviceUsed: newReview.serviceUsed || undefined,
        createdAt: newReview.createdAt.toISOString(),
        updatedAt: newReview.updatedAt.toISOString(),
        responses: [],
      };
    } catch (e) {
      console.error('Prisma createReview error:', e);
      return null;
    }
  },

  // Admin: Get all reviews across all statuses
  async getAllReviewsForAdmin(filter?: {
    brandSlug?: string;
    status?: ReviewStatus;
    search?: string;
  }): Promise<ReviewData[]> {
    try {
      const whereClause: any = {};
      if (filter?.brandSlug) {
        whereClause.brand = { slug: filter.brandSlug };
      }
      if (filter?.status && filter.status !== ('ALL' as any)) {
        whereClause.status = filter.status;
      }
      if (filter?.search) {
        whereClause.OR = [
          { authorName: { contains: filter.search, mode: 'insensitive' } },
          { title: { contains: filter.search, mode: 'insensitive' } },
          { content: { contains: filter.search, mode: 'insensitive' } },
        ];
      }

      const reviews = await prisma.review.findMany({
        where: whereClause,
        include: {
          brand: true,
          responses: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return reviews.map((r) => ({
        id: r.id,
        brandSlug: r.brand.slug,
        authorName: r.authorName,
        authorEmail: r.authorEmail,
        authorTitle: r.authorTitle || undefined,
        authorCompany: r.authorCompany || undefined,
        authorLocation: r.authorLocation || undefined,
        reviewerType: r.reviewerType || undefined,
        rating: r.rating,
        title: r.title,
        content: r.content,
        pros: r.pros || undefined,
        cons: r.cons || undefined,
        status: r.status as ReviewStatus,
        source: r.source as ReviewSource,
        sourceUrl: r.sourceUrl || undefined,
        isVerifiedBuyer: r.isVerifiedBuyer,
        verificationStatus: r.verificationStatus || undefined,
        verificationMethod: r.verificationMethod || undefined,
        verifiedAt: r.verifiedAt ? r.verifiedAt.toISOString() : undefined,
        helpfulCount: r.helpfulCount,
        unhelpfulCount: r.unhelpfulCount,
        sentiment: r.sentiment as Sentiment,
        serviceUsed: r.serviceUsed || undefined,
        rejectionReason: r.rejectionReason || undefined,
        language: r.language,
        translation: r.translation || undefined,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
        responses: r.responses.map((resp) => ({
          id: resp.id,
          reviewId: resp.reviewId,
          authorName: resp.authorName,
          authorRole: resp.authorRole,
          content: resp.content,
          createdAt: resp.createdAt.toISOString(),
        })),
      }));
    } catch (e) {
      console.error('getAllReviewsForAdmin error:', e);
      return [];
    }
  },

  // Update Review Status (Admin Moderation)
  async updateReviewStatus(
    id: string,
    status: ReviewStatus,
    arg3?: string,
    arg4?: string
  ): Promise<ReviewData | null> {
    try {
      // Determine actorEmail and reason depending on whether 3 or 4 arguments passed
      let actorEmail = 'admin@portfolix.tech';
      let reason: string | undefined = undefined;

      if (arg4 !== undefined) {
        actorEmail = arg3 || 'admin@portfolix.tech';
        reason = arg4;
      } else {
        reason = arg3;
      }

      const updated = await prisma.review.update({
        where: { id },
        data: {
          status: status as any,
          rejectionReason: reason || null,
          verificationStatus: status === 'APPROVED' ? 'VERIFIED_CUSTOMER' : undefined,
          verifiedAt: status === 'APPROVED' ? new Date() : undefined,
        },
        include: {
          brand: true,
          responses: true,
        },
      });

      await prisma.auditLog.create({
        data: {
          reviewId: id,
          actorEmail: actorEmail,
          action: `STATUS_CHANGE_TO_${status}`,
          metadata: reason ? `Reason: ${reason}` : undefined,
        },
      });

      return {
        id: updated.id,
        brandSlug: updated.brand.slug,
        authorName: updated.authorName,
        authorEmail: updated.authorEmail,
        rating: updated.rating,
        title: updated.title,
        content: updated.content,
        status: updated.status as ReviewStatus,
        source: updated.source as ReviewSource,
        isVerifiedBuyer: updated.isVerifiedBuyer,
        helpfulCount: updated.helpfulCount,
        unhelpfulCount: updated.unhelpfulCount,
        sentiment: updated.sentiment as Sentiment,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
        responses: [],
      };
    } catch (e) {
      console.error('Prisma updateReviewStatus error:', e);
      return null;
    }
  },

  // Add Company Response
  async addCompanyResponse(
    reviewId: string,
    arg2: any,
    arg3?: any,
    arg4?: any
  ): Promise<CompanyResponseData | null> {
    try {
      let authorName = 'Company Representative';
      let authorRole = 'Official Support';
      let content = '';
      let actorEmail = 'admin@portfolix.tech';

      if (typeof arg2 === 'object' && arg2 !== null) {
        authorName = arg2.authorName || authorName;
        authorRole = arg2.authorRole || authorRole;
        content = arg2.content || '';
        actorEmail = arg3 || actorEmail;
      } else {
        authorName = arg2 || authorName;
        authorRole = arg3 || authorRole;
        content = arg4 || '';
      }

      const resp = await prisma.companyResponse.create({
        data: {
          reviewId,
          authorName,
          authorRole,
          content,
        },
      });

      await prisma.auditLog.create({
        data: {
          reviewId,
          actorEmail,
          action: 'COMPANY_RESPONSE_ADDED',
          metadata: `Response by ${authorName} (${authorRole})`,
        },
      });

      return {
        id: resp.id,
        reviewId: resp.reviewId,
        authorName: resp.authorName,
        authorRole: resp.authorRole,
        content: resp.content,
        createdAt: resp.createdAt.toISOString(),
      };
    } catch (e) {
      console.error('Prisma addCompanyResponse error:', e);
      return null;
    }
  },

  // Vote on a review
  async voteReview(
    reviewId: string,
    arg2: 'HELPFUL' | 'UNHELPFUL' | string,
    arg3?: 'HELPFUL' | 'UNHELPFUL'
  ): Promise<{ helpful: number; unhelpful: number }> {
    try {
      let ipHash = 'anon-ip';
      let type: 'HELPFUL' | 'UNHELPFUL' = 'HELPFUL';

      if (arg3 !== undefined) {
        ipHash = arg2;
        type = arg3;
      } else {
        type = (arg2 as any) || 'HELPFUL';
        ipHash = `anon-${Math.random().toString(36).substring(2, 8)}`;
      }

      // Upsert vote
      await prisma.reviewVote.upsert({
        where: {
          reviewId_ipHash: {
            reviewId,
            ipHash,
          },
        },
        update: {
          voteType: type as any,
        },
        create: {
          reviewId,
          ipHash,
          voteType: type as any,
        },
      });

      const helpfulCount = await prisma.reviewVote.count({
        where: { reviewId, voteType: 'HELPFUL' },
      });

      const unhelpfulCount = await prisma.reviewVote.count({
        where: { reviewId, voteType: 'UNHELPFUL' },
      });

      await prisma.review.update({
        where: { id: reviewId },
        data: {
          helpfulCount,
          unhelpfulCount,
        },
      });

      return { helpful: helpfulCount, unhelpful: unhelpfulCount };
    } catch (e) {
      console.error('Prisma voteReview error:', e);
      return { helpful: 0, unhelpful: 0 };
    }
  },

  // Report a review
  async reportReview(data: {
    reviewId: string;
    reason: ReportReason;
    details?: string;
    reporterEmail?: string;
  }): Promise<ReviewReportData | null> {
    try {
      const report = await prisma.reviewReport.create({
        data: {
          reviewId: data.reviewId,
          reason: data.reason as any,
          details: data.details,
          reporterEmail: data.reporterEmail,
        },
      });

      await prisma.review.update({
        where: { id: data.reviewId },
        data: {
          status: 'FLAGGED',
        },
      });

      return {
        id: report.id,
        reviewId: report.reviewId,
        reason: report.reason as ReportReason,
        details: report.details || undefined,
        reporterEmail: report.reporterEmail || undefined,
        status: report.status as any,
        createdAt: report.createdAt.toISOString(),
      };
    } catch (e) {
      console.error('Prisma reportReview error:', e);
      return null;
    }
  },

  // Fetch Reports for admin
  async getReports(): Promise<ReviewReportData[]> {
    try {
      const reports = await prisma.reviewReport.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return reports.map((r) => ({
        id: r.id,
        reviewId: r.reviewId,
        reason: r.reason as ReportReason,
        details: r.details || undefined,
        reporterEmail: r.reporterEmail || undefined,
        status: r.status as any,
        createdAt: r.createdAt.toISOString(),
      }));
    } catch (e) {
      return [];
    }
  },

  // Fetch Audit Logs for admin
  async getAuditLogs(): Promise<AuditLogData[]> {
    try {
      const logs = await prisma.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
      });
      return logs.map((l) => ({
        id: l.id,
        reviewId: l.reviewId || undefined,
        actorEmail: l.actorEmail,
        action: l.action,
        metadata: l.metadata || undefined,
        createdAt: l.createdAt.toISOString(),
      }));
    } catch (e) {
      return [];
    }
  },

  // Fetch Improvements ("You Said — We Did")
  async getImprovements(brandSlug: string): Promise<ImprovementData[]> {
    try {
      const items = await prisma.improvement.findMany({
        where: { brand: { slug: brandSlug } },
        orderBy: { implementedDate: 'desc' },
      });
      return items.map((i) => ({
        id: i.id,
        brandId: i.brandId,
        youSaid: i.youSaid,
        weDid: i.weDid,
        category: i.category,
        implementedDate: i.implementedDate.toISOString(),
        createdAt: i.createdAt.toISOString(),
      }));
    } catch (e) {
      return [];
    }
  },

  // Fetch Annual Experience Reports
  async getExperienceReports(brandSlug: string): Promise<ExperienceReportData[]> {
    try {
      const reports = await prisma.experienceReport.findMany({
        where: { brand: { slug: brandSlug } },
        orderBy: { year: 'desc' },
      });
      return reports.map((r) => {
        let findings = {};
        try {
          findings = JSON.parse(r.keyFindings);
        } catch (_) {}
        return {
          id: r.id,
          brandId: r.brandId,
          year: r.year,
          title: r.title,
          slug: r.slug,
          summary: r.summary,
          totalRespondents: r.totalRespondents,
          averageRating: r.averageRating,
          keyFindings: findings,
          methodology: r.methodology,
          createdAt: r.createdAt.toISOString(),
        };
      });
    } catch (e) {
      return [];
    }
  },

  // Calculate dynamic rating stats
  async getBrandRatingStats(brandSlug: string): Promise<RatingStats> {
    try {
      const reviews = await prisma.review.findMany({
        where: {
          brand: { slug: brandSlug },
          status: 'APPROVED',
        },
      });

      const total = reviews.length;
      if (total === 0) {
        return {
          averageRating: 5.0,
          totalReviews: 0,
          verifiedCount: 0,
          recommendationPercentage: 100,
          breakdown: {
            5: { count: 0, percentage: 0 },
            4: { count: 0, percentage: 0 },
            3: { count: 0, percentage: 0 },
            2: { count: 0, percentage: 0 },
            1: { count: 0, percentage: 0 },
          },
          sentimentBreakdown: { positive: 0, neutral: 0, negative: 0 },
          sourceBreakdown: {},
        };
      }

      const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      let sum = 0;
      let verified = 0;
      const sentimentCounts = { positive: 0, neutral: 0, negative: 0 };
      const sourceCounts: Record<string, number> = {};

      reviews.forEach((r) => {
        sum += r.rating;
        counts[r.rating] = (counts[r.rating] || 0) + 1;
        if (r.isVerifiedBuyer) verified++;

        if (r.sentiment === 'POSITIVE') sentimentCounts.positive++;
        else if (r.sentiment === 'NEUTRAL') sentimentCounts.neutral++;
        else if (r.sentiment === 'NEGATIVE') sentimentCounts.negative++;

        sourceCounts[r.source] = (sourceCounts[r.source] || 0) + 1;
      });

      const average = parseFloat((sum / total).toFixed(1));
      const recommend = Math.round(((counts[5] + counts[4]) / total) * 100);

      return {
        averageRating: average,
        totalReviews: total,
        verifiedCount: verified,
        recommendationPercentage: recommend,
        breakdown: {
          5: { count: counts[5], percentage: Math.round((counts[5] / total) * 100) },
          4: { count: counts[4], percentage: Math.round((counts[4] / total) * 100) },
          3: { count: counts[3], percentage: Math.round((counts[3] / total) * 100) },
          2: { count: counts[2], percentage: Math.round((counts[2] / total) * 100) },
          1: { count: counts[1], percentage: Math.round((counts[1] / total) * 100) },
        },
        sentimentBreakdown: sentimentCounts,
        sourceBreakdown: sourceCounts,
      };
    } catch (e) {
      console.error('getBrandRatingStats error:', e);
      return {
        averageRating: 5.0,
        totalReviews: 0,
        verifiedCount: 0,
        recommendationPercentage: 100,
        breakdown: {
          5: { count: 0, percentage: 0 },
          4: { count: 0, percentage: 0 },
          3: { count: 0, percentage: 0 },
          2: { count: 0, percentage: 0 },
          1: { count: 0, percentage: 0 },
        },
        sentimentBreakdown: { positive: 0, neutral: 0, negative: 0 },
        sourceBreakdown: {},
      };
    }
  },
};
