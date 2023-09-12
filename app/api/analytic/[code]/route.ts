import { prisma } from "@/lib/index";
import { NextRequest, NextResponse } from "next/server";

interface pageProps {
  params: {
    code: string;
  };
}

export async function GET(req: NextRequest, { params }: pageProps) {
  const code = params.code;

  if (typeof code == "string") {
    const analytic = await prisma.urlAnalytics.findFirst({
      where: {
        url: {
          urlCode: code,
        },
      },
      include: {
        url: true,
      },
    });

    if (!analytic) {
      return NextResponse.json({
        error: {
          message: "analytic not found",
        },
        data: null,
      });
    }

    return NextResponse.json(
      {
        clicked: analytic.clicked,
        data: {
          originalUrl: analytic.url.originalUrl,
          shortUrl: analytic.url.shortUrl,
          code: analytic.url.urlCode,
        },
      },
      { status: 200 }
    );
  }
}
