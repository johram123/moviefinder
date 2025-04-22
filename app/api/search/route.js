export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  const apiKey = process.env.NEXT_PUBLIC_WATCHMODE_API_KEY;
  const url = `https://api.watchmode.com/v1/search/?apiKey=${apiKey}&search_field=name&search_value=${query}`;

  const res = await fetch(url);
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
