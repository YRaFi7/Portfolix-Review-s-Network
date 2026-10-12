import { NextRequest, NextResponse } from 'next/server';
import { Store, ReviewStatus } from '@/lib/store';
import { ModerationActionSchema, CompanyResponseSchema } from '@/lib/schemas/review';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brandSlug = searchParams.get('brandSlug') || undefined;
    const status = (searchParams.get('status') as ReviewStatus) || undefined;
    const search = searchParams.get('search') || undefined;

    const reviews = await Store.getAllReviewsForAdmin({
      brandSlug,
      status,
      search,
    });

    const reports = await Store.getReports();
    const auditLogs = await Store.getAuditLogs();

    return NextResponse.json({
      success: true,
      reviews,
      reports,
      auditLogs,
    });
  } catch (error) {
    console.error('Error fetching admin reviews:', error);
    return NextResponse.json({ success: false, error: 'Internal admin error' }, { status: 500 });
  }
}

// Moderation status update (Approve, Reject, Flag)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = ModerationActionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, error: 'Invalid payload', details: validation.error.format() }, { status: 422 });
    }

    const { reviewId, status, reason } = validation.data;
    const actorEmail = body.actorEmail || 'admin@portfolix.tech';

    const updated = await Store.updateReviewStatus(reviewId, status, actorEmail, reason);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      review: updated,
      message: `Review status updated to ${status}`,
    });
  } catch (error) {
    console.error('Error updating review status:', error);
    return NextResponse.json({ success: false, error: 'Internal admin error' }, { status: 500 });
  }
}

// Add Company Response
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = CompanyResponseSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, error: 'Invalid response payload', details: validation.error.format() }, { status: 422 });
    }

    const { reviewId, authorName, authorRole, content } = validation.data;
    const actorEmail = body.actorEmail || 'admin@portfolix.tech';

    const response = await Store.addCompanyResponse(
      reviewId,
      { authorName, authorRole, content },
      actorEmail
    );

    if (!response) {
      return NextResponse.json({ success: false, error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      response,
      message: 'Official company response published successfully',
    });
  } catch (error) {
    console.error('Error posting company response:', error);
    return NextResponse.json({ success: false, error: 'Internal admin error' }, { status: 500 });
  }
}
