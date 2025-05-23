
'use client';

// This component now uses a Sketchfab iframe embed
export function ClientAvatar3D() {
  // IMPORTANT: Replace this URL with your Sketchfab model's embed URL.
  // 1. Upload your model to Sketchfab.
  // 2. Go to your model's page, click "Embed".
  // 3. Copy the src URL from the iframe code and paste it here.
  // Example placeholder URL (replace with your actual Sketchfab model embed link):
  const sketchfabEmbedUrl = "https://sketchfab.com/models/ff78537d3c0341d6a329584ed731b698/embed";

  return (
    <div 
      style={{ 
        width: '100%', 
        height: '100%', 
        minHeight:'300px', 
        maxHeight:'400px', 
        borderRadius: '0.5rem', 
        overflow: 'hidden' 
      }} 
      className="shadow-lg border border-border bg-card"
      aria-label="Interactive 3D model from Sketchfab"
    >
      {sketchfabEmbedUrl ? (
        <iframe
          title="Mouheb Sliti 3D Avatar"
          src={sketchfabEmbedUrl}
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
          // xr-spatial-tracking is for WebXR if your model supports it
          // execution-while-out-of-viewport execution-while-not-rendered web-share
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        ></iframe>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted/50">
          <p className="text-muted-foreground">Loading 3D Model...</p>
        </div>
      )}
    </div>
  );
}

