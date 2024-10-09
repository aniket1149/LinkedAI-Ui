// // app/api/jobs/suggested/route.js

// import axios from 'axios';

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const keywords = searchParams.get('keywords');

//   if (!keywords) {
//     return new Response(JSON.stringify({ error: 'Keywords parameter is required.' }), {
//       status: 400,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }

//   try {
//     const response = await axios.get(
//       'https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search',
//       {
//         params: { keywords },
//         headers: {
//           'User-Agent':
//             'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' +
//             'AppleWebKit/537.36 (KHTML, like Gecko) ' +
//             'Chrome/129.0.0.0 Safari/537.36',
//           Accept:
//             'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
//           'Accept-Language': 'en-US,en;q=0.9',
//           'Cache-Control': 'max-age=0',
//           Connection: 'keep-alive',
//           DNT: '1',
//           'Upgrade-Insecure-Requests': '1',
//           // Include cookies if necessary
//           // 'Cookie': 'your-cookies-here',
//         },
//       }
//     );
//     return new Response(response.data, {
//       status: response.status,
//       headers: { 'Content-Type': 'text/html' },
//     });
//   } catch (error) {
//     console.error('Error fetching jobs from LinkedIn:', error.message);
//     return new Response(
//       JSON.stringify({ error: 'Failed to fetch jobs from LinkedIn.' }),
//       {
//         status: error.response?.status || 500,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }
// }
// app/api/jobs/suggested/route.js
// app/api/jobs/suggested/route.js

// app/api/jobs/suggested/route.js

import axios from 'axios';
import NodeCache from 'node-cache';

// Initialize cache with a TTL of 10 minutes (600 seconds) and check period of 2 minutes (120 seconds)
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

// In-memory store to track requests per IP
const rateLimitStore = {};
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:115.0) Gecko/20100101 Firefox/115.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:115.0) Gecko/20100101 Firefox/115.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.0.0',
  'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 OPR/80.0.4170.72',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64; rv:115.0) Gecko/20100101 Firefox/115.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.0.0',
  'Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/15.0 Chrome/115.0.0.0 Mobile Safari/537.36',
  'Mozilla/5.0 (Linux; U; Android 11; en-US; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 UCBrowser/13.4.0.1306 Mobile Safari/537.36',
  'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Vivaldi/4.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Brave/1.30.87',
  'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Android 11; Mobile; rv:115.0) Gecko/115.0 Firefox/115.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 OPR/80.0.4170.72',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 YaBrowser/21.9.0 Yowser/2.5 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) QQBrowser/10.8.4569.400 Safari/537.36',
  'Mozilla/5.0 (Linux; U; Android 9; en-US; KFMAWI) AppleWebKit/537.36 (KHTML, like Gecko) Silk/90.4.10 like Chrome/90.0.4430.210 Mobile Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X; en-US) AppleWebKit/537.51.2 (KHTML, like Gecko) Mobile/15E148 UCBrowser/11.4.8.1012 Mobile',
];
const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];


// Configuration for rate limiting
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60; // Max 60 requests per IP per window

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const keywords = searchParams.get('keywords');

  if (!keywords) {
    return new Response(JSON.stringify({ error: 'Keywords parameter is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Normalize keywords: split by comma, trim whitespace, filter out empty strings, sort alphabetically
  const keywordsArray = keywords
    .split(',')
    .map((kw) => kw.trim())
    .filter((kw) => kw.length > 0)
    .sort();

  // Rejoin to create a normalized, consistent cache key
  const normalizedKeywords = keywordsArray.join(',');

  // Extract client IP address
  let ip = 'unknown';
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    ip = forwardedFor.split(',')[0].trim();
  } else {
    ip = request.headers.get('x-real-ip') || 'unknown';
  }

  // Implement Rate Limiting
  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = {
      requestCount: 1,
      firstRequestTimestamp: Date.now(),
    };
  } else {
    const currentTime = Date.now();
    const elapsedTime = currentTime - rateLimitStore[ip].firstRequestTimestamp;

    if (elapsedTime < RATE_LIMIT_WINDOW_MS) {
      // Within the rate limit window
      rateLimitStore[ip].requestCount += 1;

      if (rateLimitStore[ip].requestCount > MAX_REQUESTS_PER_WINDOW) {
        // Exceeded the rate limit
        return new Response(
          JSON.stringify({ error: 'Too many requests. Please try again later.' }),
          {
            status: 429,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    } else {
      // Reset the rate limit window
      rateLimitStore[ip].requestCount = 1;
      rateLimitStore[ip].firstRequestTimestamp = currentTime;
    }
  }

  try {
    // Check if the response is cached
    const cachedHTML = cache.get(normalizedKeywords);
    if (cachedHTML) {
      console.log(`Serving cached data for keywords: ${normalizedKeywords}`);
      return new Response(cachedHTML, {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    const baseUri = 'https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords='+normalizedKeywords;
    const encodedUri = encodeURI(baseUri);
    console.log(`Encoded URI: ${encodedUri}`);

    // Make API request to LinkedIn's API
    const response = await axios.get(encodedUri);

    // Cache the HTML response using the normalized keywords as the key
    cache.set(normalizedKeywords, response.data);

    return new Response(response.data, {
      status: response.status,
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('Error fetching jobs from LinkedIn:', error.message);

    // Handle specific status codes
    if (error.response) {
      if (error.response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'LinkedIn API rate limit exceeded. Please try again later.' }),
          {
            status: 429,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
      return new Response(
        JSON.stringify({ error: 'Failed to fetch jobs from LinkedIn.' }),
        {
          status: error.response.status,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Handle network or other errors
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

