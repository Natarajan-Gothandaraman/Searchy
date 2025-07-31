const API_KEY = "AIzaSyCCIRT2MgjguaIZotK4VR7PFDKTPj_hBtQ"; // Replace with your own API key
let nextPageToken = "";
let currentQuery = "";

function searchVideos(isLoadMore = false) {
  const query = document.getElementById("searchInput").value;

  if (!isLoadMore) {
    currentQuery = query;
    nextPageToken = "";
    document.getElementById("videoResults").innerHTML = "";
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(currentQuery)}&key=${API_KEY}&maxResults=10&pageToken=${nextPageToken}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      nextPageToken = data.nextPageToken || "";
      const resultsDiv = document.getElementById("videoResults");

      data.items.forEach(item => {
        const videoId = item.id.videoId;
        const title = item.snippet.title;

        const videoWrapper = document.createElement("div");
        videoWrapper.className = "video-wrapper";

        const iframe = document.createElement("iframe");
        iframe.width = "300";
        iframe.height = "200";
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.allowFullscreen = true;

        const caption = document.createElement("p");
        caption.textContent = title;
        caption.className = "caption";

        videoWrapper.appendChild(iframe);
        videoWrapper.appendChild(caption);
        resultsDiv.appendChild(videoWrapper);
      });

      document.getElementById("loadMoreBtn").style.display = nextPageToken ? "block" : "none";
    })
    .catch(err => console.error(err));
}

fetch(url)
  .then(res => {
    if (!res.ok) throw new Error("API error: " + res.status);
    return res.json();
  })
  .then(data => {
    if (!data.items) {
      document.getElementById("videoResults").innerHTML = "No videos found or API error.";
      return;
    }
    data.items.forEach(item => {
      console.log(item.snippet.title);
      // Your display logic here
    });
  })
  .catch(err => {
    console.error(err);
    document.getElementById("videoResults").innerHTML = "Failed to fetch videos.";
  });
