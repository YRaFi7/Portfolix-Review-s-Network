import { NextRequest, NextResponse } from 'next/server';
import { Store } from '@/lib/store';
import { ReviewSubmissionSchema } from '@/lib/schemas/review';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brandSlug = searchParams.get('brandSlug') || request.headers.get('x-brand-slug') || 'portfolio-builders';
    const ratingParam = searchParams.get('rating');
    const verifiedOnly = searchParams.get('verifiedOnly') === 'true';
    const source = searchParams.get('source') || undefined;
    const search = searchParams.get('search') || undefined;
    const sortBy = (searchParams.get('sortBy') as 'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful') || 'newest';

    const reviews = await Store.getReviews({
      brandSlug,
      rating: ratingParam ? parseInt(ratingParam, 10) : undefined,
      verifiedOnly,
      source,
      search,
      sortBy,
      status: 'APPROVED',
    });

    const stats = await Store.getBrandRatingStats(brandSlug);

    return NextResponse.json({
      success: true,
      reviews,
      stats,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve reviews' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot spam check: if website_honeypot contains any value, reject quietly
    if (body.website_honeypot && body.website_honeypot.trim().length > 0) {
      return NextResponse.json({ success: false, error: 'Spam submission rejected' }, { status: 400 });
    }

    // Validate with Zod
    const validation = ReviewSubmissionSchema.safeParse(body);
    if (!validation.success) {
      const firstErrorMessage = validation.error.issues[0]?.message || 'Validation failed. Please check your inputs.';
      return NextResponse.json(
        {
          success: false,
          error: firstErrorMessage,
          details: validation.error.format(),
        },
        { status: 422 }
      );
    }

    const data = validation.data;

    const newReview = await Store.createReview({
      brandSlug: data.brandSlug,
      authorName: data.authorName,
      authorEmail: data.authorEmail,
      authorTitle: data.authorTitle || undefined,
      authorCompany: data.authorCompany || undefined,
      authorLocation: data.authorLocation || undefined,
      reviewerType: data.reviewerType,
      rating: data.rating,
      title: data.title,
      content: data.content,
      pros: data.pros || undefined,
      cons: data.cons || undefined,
      serviceUsed: data.serviceUsed || undefined,
      source: data.source,
      sourceUrl: data.sourceUrl || undefined,
      isVerifiedBuyer: data.isVerifiedBuyer,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Review submitted successfully. It is now pending admin moderation.',
        review: newReview,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ success: false, error: 'Internal server error while saving review' }, { status: 500 });
  }
}
