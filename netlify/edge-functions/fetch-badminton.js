// netlify/edge-functions/fetch-badminton.js

export default async (request, context) => {
    const targetUrl = "https://data.smartplay.lcsd.gov.hk/rest/cms/api/v1/publ/contents/open-data/badminton/file";

    try {
        const response = await fetch(targetUrl, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            return new Response(
                JSON.stringify({ error: `Government server responded with status ${response.status}` }),
                { status: response.status, headers: { "content-type": "application/json" } }
            );
        }

        // Edge environments automatically handle stream compression/decompression under the hood!
        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        });

    } catch (error) {
        return new Response(
            JSON.stringify({ error: `Edge Proxy failed: ${error.message}` }),
            { status: 500, headers: { "content-type": "application/json" } }
        );
    }
};

export const config = {
    path: "/api/badminton"
};
