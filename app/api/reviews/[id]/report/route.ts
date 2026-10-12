import { NextRequest, NextResponse } from 'next/server';
import { Store } from '@/lib/store';
import { ReportSubmissionSchema } from '@/lib/schemas/review';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const validation = ReportSubmissionSchema.safeParse({
      ...body,
      reviewId: id,
    });

    if (!validation.success) {
      return NextResponse.json({ success: false, error: 'Invalid report data', details: validation.error.format() }, { status: 422 });
    }

    const report = await Store.reportReview(validation.data);

    return NextResponse.json({
      success: true,
      message: 'Review reported for moderation review.',
      report,
    });
  } catch (error) {
    console.error('Error reporting review:', error);
    return NextResponse.json({ success: false, error: 'Failed to report review' }, { status: 500 });
  }
}
