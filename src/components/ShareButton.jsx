import { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { getRoundShareUrl, copyToClipboard } from '../utils/helpers.js';

export default function ShareButton({ roundId }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = getRoundShareUrl(roundId);

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join my golf round!',
          text: "You're invited to tee it up!",
          url,
        });
        return;
      } catch {
        // Fall through to copy
      }
    }

    try {
      await copyToClipboard(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback: select text
      window.prompt('Copy this link:', url);
    }
  }

  return (
    <button className="share-btn" onClick={handleShare}>
      {copied ? (
        <>
          <Check size={18} />
          Link Copied!
        </>
      ) : (
        <>
          <Share2 size={18} />
          Share Invite Link
        </>
      )}
    </button>
  );
}
