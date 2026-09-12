import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8-second timeout

    try {
        const SMARTPLAY_API_URL =
            'https://data.smartplay.lcsd.gov.hk/rest/cms/api/v1/publ/contents/open-data/badminton/file';

        const apiRes = await fetch(SMARTPLAY_API_URL, {
            signal: controller.signal,
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                Accept: 'application/json',
            },
        });

        clearTimeout(timeout);

        if (!apiRes.ok) {
            return res
                .status(apiRes.status)
                .json({ error: `SmartPLAY API Response Error (${apiRes.status})` });
        }

        const json = await apiRes.json();
        const dataList = Array.isArray(json) ? json : json.data || json.contents || [];

        return res.status(200).json(dataList);
    } catch (error: any) {
        clearTimeout(timeout);
        if (error.name === 'AbortError') {
            return res.status(504).json({ error: 'SmartPLAY API connection timed out' });
        }
        return res
            .status(500)
            .json({ error: 'Backend data extraction failed', details: error?.message });
    }
}