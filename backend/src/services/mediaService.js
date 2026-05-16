async function getTutorialMedia() {
  if (!process.env.PEXELS_API_KEY && !process.env.UNSPLASH_ACCESS_KEY && !process.env.YOUTUBE_API_KEY) {
    return [
      {
        title: "Natural Glow Makeup",
        thumbnail_url: "https://placehold.co/600x400?text=Natural+Glow",
        video_url: "https://www.youtube.com/results?search_query=natural+glow+makeup+tutorial",
        source: "mock"
      },
      {
        title: "Evening Glam Tutorial",
        thumbnail_url: "https://placehold.co/600x400?text=Evening+Glam",
        video_url: "https://www.youtube.com/results?search_query=evening+glam+makeup+tutorial",
        source: "mock"
      }
    ];
  }

  return [
    {
      title: "External Makeup Media Placeholder",
      thumbnail_url: "https://placehold.co/600x400?text=External+Media",
      video_url: "https://www.youtube.com/results?search_query=makeup+tutorial",
      source: "external-ready"
    }
  ];
}

module.exports = { getTutorialMedia };
