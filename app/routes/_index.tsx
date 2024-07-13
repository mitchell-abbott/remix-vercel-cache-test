import {json, MetaFunction} from "@remix-run/node";
import {HeadersFunction} from "@vercel/remix";
import {useLoaderData} from "@remix-run/react";
import {fetch} from "@remix-run/web-fetch";

export const meta: MetaFunction = () => {
  return [
    { title: " Remix Cache Test" },
    { name: "description", content: "Remix Cache Test!" },
  ];
};

export const headers: HeadersFunction = () => ({
  'Cache-Control': 's-maxage=1, stale-while-revalidate=299',
});

function getCurrentTime() {
  return fetch('http://worldtimeapi.org/api/timezone/America/Chicago')
      .then( (response) => response.json() as Promise<{datetime: string}>);
}

export async function loader() {
  const {datetime} = await getCurrentTime();
  return json({
    title: 'Remix Cache Test',
    datetime
  });
}

export default function Index() {
  const { title, datetime } = useLoaderData<typeof loader>();
  const currentTime = new Date(datetime);
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">{title}</h1>
      <h1 className="text-2xl">Current Time: {currentTime.toUTCString()}</h1>
    </div>
  );
}
