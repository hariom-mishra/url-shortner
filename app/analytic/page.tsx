import React from "react";
import Link from "next/link";

type AnalyticPageProps = {
  searchParams: {
    code: string;
  };
};

async function getAnalytic(code: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/analytic/${code}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
}

export default async function AnalyticPage({
  searchParams,
}: AnalyticPageProps) {
  const { code } = searchParams;
  const res = await getAnalytic(code);
 


  return (
    
    <div className="flex flex-col p-4">
      <h1 className="text-slate-600 text-3xl">
        Total URL Clicks: {res.clicked}
      </h1>

      <div className="flex flex-col gap-4 mt-8">
        <div className="flex">
          <span className="mr-2">Original URL</span>
          <Link
            href={res.data.originalUrl}
            className="text-blue-300"
            target="_blank"
            prefetch={false}
          >
            {res.data.originalUrl}
          </Link>
          
        </div>

        <div className="flex">
          <span className="mr-2">Short URL</span>

          <Link
            href={res.data.shortUrl}
            className="text-blue-300"
            target="_blank"
            prefetch={false}
          >
            {res.data.shortUrl}
          </Link>
        </div>
      </div>

      <button type="button" className="p-4 mt-8 bg-slate-400 rounded-lg">
        <Link href="/" className="text-white">
          Click to shorten more links!
        </Link>
      </button>
    </div>
  );
}