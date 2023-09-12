import { generateShortLink, prisma } from "@/lib/index";
import { NextRequest, NextResponse } from "next/server";
import { isWebUri } from "valid-url";

type RequestData = {
  url: string;
};

export async function POST(req: NextRequest, res: NextResponse) {

  const { url }: RequestData = await req.json();
  const headers = await req.headers;
  const host = headers.get('Host');
  const { shortCode, shortUrl } = generateShortLink(host!);
   
  if (!isWebUri(url)) {
    return NextResponse.json(
      {
        error: {
          message: "invalid url",

        },
        data: null,
      },
      { status: 400 }
    );
  }

  /*
   *if there is an original url -> query that
   * else we will create a new one
   */
  const result = await prisma.$transaction(async (tx) => {
    const originalUrl = await tx.url.findFirst({
      where: {
        originalUrl: url,
      },
    });

    if (originalUrl) return originalUrl;

    const newUrl = tx.url.create({
      data: {
        originalUrl: url,
        shortUrl,
        urlCode: shortCode,
      },
    });

    await tx.urlAnalytics.create({
      data: {
        clicked: 0,
        url: {
          connect: {
            id: (await newUrl).id,
          },
        },
      },
    });
    return newUrl;
  });

  return NextResponse.json(
    {
      statuscode: 200,
      error: null,
      data: {
        originalUrl: result.originalUrl,
        shortUrl: result.shortUrl,
        code: result.urlCode,
      },
    },
    { status: 200 }
  );
}
