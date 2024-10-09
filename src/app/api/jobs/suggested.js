// pages/api/jobs/suggested.js

import axios from 'axios';

export default async function handler(req, res) {
  const { keyword } = req.query;
  
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword parameter is required.' });
  }

  try {
    console.log(res.query);
    
    // Make the request to LinkedIn's API
    const response = await axios.get(
      'https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search',
      {
        params: { keywords: keyword },
        headers: {
          // Mimic necessary headers to make the request appear as a legitimate browser request
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' +
            'AppleWebKit/537.36 (KHTML, like Gecko) ' +
            'Chrome/129.0.0.0 Safari/537.36',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'max-age=0',
          Connection: 'keep-alive',
          DNT: '1',
          'Upgrade-Insecure-Requests': '1',
          // Include cookies if necessary
          // 'Cookie': 'your-cookies-here',
        },
      }
    );

    // Forward the HTML response back to the frontend
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error('Error fetching jobs from LinkedIn:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch jobs from LinkedIn.',
    });
  }
}
