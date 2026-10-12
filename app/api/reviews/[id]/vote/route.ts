import { NextRequest, NextResponse } from 'next/server';
import { Store } from '@/lib/store';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const voteType = body.type === 'UNHELPFUL' ? 'UNHELPFUL' : 'HELPFUL';

    const result = await Store.voteReview(id, voteType);
    if (!result) {
      return NextResponse.json({ success: false, error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      helpful: result.helpful,
      unhelpful: result.unhelpful,
    });
  } catch (error) {
    console.error('Error voting on review:', error);
    return NextResponse.json({ success: false, error: 'Failed to record vote' }, { status: 500 });
  }
}
