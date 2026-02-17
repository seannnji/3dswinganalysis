import { useState } from 'react';
import { Send } from 'lucide-react';
import Avatar from './Avatar.jsx';

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function CommentSection({ comments, onAddComment }) {
  const [text, setText] = useState('');
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim() || !name.trim()) return;
    onAddComment({ name: name.trim(), text: text.trim() });
    setText('');
  }

  return (
    <div className="comment-section">
      <h3 className="comment-section-title">Trash Talk & Banter</h3>

      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <Avatar name={comment.name} size={32} />
            <div className="comment-body">
              <div className="comment-header">
                <span className="comment-name">{comment.name}</span>
                <span className="comment-time">{timeAgo(comment.createdAt)}</span>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="comments-empty">No messages yet. Break the ice!</p>
        )}
      </div>

      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="comment-name-input"
        />
        <div className="comment-input-row">
          <input
            type="text"
            placeholder="Talk smack..."
            value={text}
            onChange={e => setText(e.target.value)}
            className="comment-text-input"
          />
          <button type="submit" className="comment-send-btn" disabled={!text.trim() || !name.trim()}>
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
