async function searchYouTubeTutorials(req, res, next) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        message: "YouTube API key is not configured"
      });
    }

    const query = req.query.q || "makeup tutorial";
    const eventType = req.query.eventType || "";
    const maxResults = req.query.maxResults || 8;

    const params = new URLSearchParams({
      part: "snippet",
      q: query,
      type: "video",
      maxResults: String(maxResults),
      key: apiKey
    });

    if (eventType) {
      params.append("eventType", eventType);
    }

    const url = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      return res.status(response.status).json({
        message: "YouTube API request failed",
        details: errorData
      });
    }

    const data = await response.json();

    const videos = (data.items || []).map(item => ({
      video_id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      channel_title: item.snippet.channelTitle,
      published_at: item.snippet.publishedAt,
      thumbnail_url:
        item.snippet.thumbnails?.high?.url ||
        item.snippet.thumbnails?.medium?.url ||
        item.snippet.thumbnails?.default?.url,
      video_url: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));

    res.json(videos);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  searchYouTubeTutorials
};