export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const apiKey = process.env.NEXT_PUBLIC_WATCHMODE_API_KEY;
  const url = `https://api.watchmode.com/v1/title/${id}/details/?apiKey=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
