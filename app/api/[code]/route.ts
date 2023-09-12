import { error } from "console";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/index";

interface pageProps {
  params: {
    code: string;
  };
}

export async function GET(req: Request, { params }: pageProps) {
  const code = params.code;
  if (typeof code == "string") {
    const result = await prisma.$transaction(async (tx) => {
      const url = await tx.url.findUnique({
        where: {
          urlCode: code,
        },
      });

      // if the code is invalid or not found
      if (!url) {
        return null;
      }

      // update our url analytics
      await tx.urlAnalytics.update({
        where: {
          url_id: url.id,
        },
        data: {
          clicked: {
            increment: 1,
          },
        },
      });

      // if code is valid and its found in the db
      return url;
    });
    if (!result) {
      return NextResponse.json({
        statusCode: 400,
        error: {
          message: "invalid short url code!",
        },
        data: null,
      });
    }

    return NextResponse.redirect(result.originalUrl);
  }
}
