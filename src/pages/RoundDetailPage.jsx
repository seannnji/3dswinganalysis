import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin, Calendar, Clock, Users, DollarSign, Trophy,
  ArrowLeft, Info, Trash2,
} from 'lucide-react';
import { getRound, addGuest, addComment, deleteRound, updateRound } from '../utils/storage.js';
import { formatDate, formatTime, formatCurrency, getStatusCounts } from '../utils/helpers.js';
import { THEMES, GOLF_FORMATS } from '../data/courses.js';
import RSVPButtons from '../components/RSVPButtons.jsx';
import GuestList from '../components/GuestList.jsx';
import CommentSection from '../components/CommentSection.jsx';
import PaymentModal from '../components/PaymentModal.jsx';
import ShareButton from '../components/ShareButton.jsx';

export default function RoundDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [round, setRound] = useState(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpHandicap, setRsvpHandicap] = useState('');
  const [myStatus, setMyStatus] = useState(null);
  const [myGuestId, setMyGuestId] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const data = getRound(id);
    if (!data) return;
    setRound(data);

    // Check if returning visitor
    const savedId = localStorage.getItem(`gowf_guest_${id}`);
    if (savedId && data.guests) {
      const existing = data.guests.find(g => g.id === savedId);
      if (existing) {
        setMyGuestId(savedId);
        setMyStatus(existing.status);
        setRsvpName(existing.name);
        setRsvpHandicap(existing.handicap || '');
      }
    }
  }, [id]);

  if (!round) {
    return (
      <div className="not-found">
        <span className="not-found-emoji">&#9971;</span>
        <h2>Round not found</h2>
        <p>This round may have been removed or the link is incorrect.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Go Home
        </button>
      </div>
    );
  }

  const theme = THEMES.find(t => t.value === round.theme) || THEMES[0];
  const counts = getStatusCounts(round.guests);
  const spotsLeft = round.maxPlayers - counts.going;
  const formatInfo = GOLF_FORMATS.find(f => f.value === round.format);
  const isFull = spotsLeft <= 0;

  function handleRSVP(status) {
    if (!rsvpName.trim()) return;

    const guestData = {
      name: rsvpName.trim(),
      handicap: rsvpHandicap.trim(),
      status,
      paid: false,
    };

    if (myGuestId) {
      guestData.id = myGuestId;
    }

    const updated = addGuest(id, guestData);
    if (updated) {
      setRound(updated);
      setMyStatus(status);
      // Find the guest we just added/updated
      const guest = updated.guests.find(g => g.name === rsvpName.trim());
      if (guest) {
        setMyGuestId(guest.id);
        localStorage.setItem(`gowf_guest_${id}`, guest.id);
      }
    }
  }

  function handleAddComment(comment) {
    const updated = addComment(id, comment);
    if (updated) setRound(updated);
  }

  function handlePaymentComplete() {
    if (!myGuestId) return;
    const guest = round.guests.find(g => g.id === myGuestId);
    if (guest) {
      guest.paid = true;
      const updated = updateRound(id, { guests: round.guests });
      if (updated) setRound(updated);
    }
  }

  function handleDelete() {
    deleteRound(id);
    navigate('/my-rounds');
  }

  const myGuest = round.guests.find(g => g.id === myGuestId);
  const showPaymentPrompt =
    round.costPerPerson > 0 && myStatus === 'going' && myGuest && !myGuest.paid;

  return (
    <div className="round-detail-page">
      {/* Banner */}
      <div className="round-banner" style={{ background: theme.gradient }}>
        <button className="back-btn back-btn-light" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
        <div className="round-banner-content">
          <span className="round-banner-emoji">&#9971;</span>
          <h1 className="round-banner-title">{round.title}</h1>
          <p className="round-banner-host">Hosted by {round.hostName}</p>
        </div>
        <div className="round-banner-wave">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path
              d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120 Z"
              fill="var(--color-bg)"
            />
          </svg>
        </div>
      </div>

      <div className="round-detail-content">
        {/* Info Card */}
        <div className="round-info-card">
          <div className="round-info-grid">
            <div className="round-info-item">
              <MapPin size={18} />
              <div>
                <strong>{round.courseName}</strong>
                {round.courseLocation && <span>{round.courseLocation}</span>}
              </div>
            </div>
            <div className="round-info-item">
              <Calendar size={18} />
              <div>
                <strong>{formatDate(round.date)}</strong>
              </div>
            </div>
            <div className="round-info-item">
              <Clock size={18} />
              <div>
                <strong>{formatTime(round.teeTime)}</strong>
                <span>Tee Time</span>
              </div>
            </div>
            <div className="round-info-item">
              <Users size={18} />
              <div>
                <strong>{counts.going} / {round.maxPlayers}</strong>
                <span>{spotsLeft > 0 ? `${spotsLeft} spots left` : 'Full!'}</span>
              </div>
            </div>
            {round.costPerPerson > 0 && (
              <div className="round-info-item">
                <DollarSign size={18} />
                <div>
                  <strong>{formatCurrency(round.costPerPerson)}</strong>
                  <span>per player</span>
                </div>
              </div>
            )}
            {formatInfo && (
              <div className="round-info-item">
                <Trophy size={18} />
                <div>
                  <strong>{formatInfo.label}</strong>
                  <span>{formatInfo.description}</span>
                </div>
              </div>
            )}
          </div>

          {round.description && (
            <div className="round-description">
              <Info size={16} />
              <p>{round.description}</p>
            </div>
          )}
        </div>

        {/* Share */}
        <div className="round-share-section">
          <ShareButton roundId={round.id} />
        </div>

        {/* RSVP Section */}
        <div className="round-rsvp-section">
          <h2>Are you in?</h2>
          {!myStatus && (
            <div className="rsvp-form">
              <div className="rsvp-form-inputs">
                <input
                  type="text"
                  placeholder="Your name"
                  value={rsvpName}
                  onChange={e => setRsvpName(e.target.value)}
                  className="rsvp-name-input"
                />
                <input
                  type="text"
                  placeholder="Handicap (optional)"
                  value={rsvpHandicap}
                  onChange={e => setRsvpHandicap(e.target.value)}
                  className="rsvp-handicap-input"
                />
              </div>
            </div>
          )}
          <RSVPButtons
            currentStatus={myStatus}
            onSelect={handleRSVP}
            disabled={!rsvpName.trim() || (isFull && !myStatus)}
          />
          {myStatus && (
            <p className="rsvp-status-msg">
              {myStatus === 'going'
                ? "You're in! See you on the course."
                : myStatus === 'maybe'
                ? "We'll save you a cart just in case."
                : "No worries, catch the next one."}
            </p>
          )}

          {/* Payment Prompt */}
          {showPaymentPrompt && (
            <div className="payment-prompt">
              <p>
                <DollarSign size={16} />
                Settle up: {formatCurrency(round.costPerPerson)} for your spot
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setShowPayment(true)}
              >
                Pay Now
              </button>
            </div>
          )}

          {isFull && !myStatus && (
            <p className="round-full-msg">
              This round is full!{' '}
              {round.allowWaitlist
                ? 'RSVP as "Maybe" to join the waitlist.'
                : ''}
            </p>
          )}
        </div>

        {/* Guest List */}
        <div className="round-guests-section">
          <h2>
            <Users size={20} />
            Who's Playing
          </h2>
          <GuestList guests={round.guests} showPayment={round.costPerPerson > 0} />
        </div>

        {/* Comments */}
        <CommentSection
          comments={round.comments}
          onAddComment={handleAddComment}
        />

        {/* Delete */}
        <div className="round-danger-zone">
          {!showDeleteConfirm ? (
            <button
              className="btn btn-danger-ghost"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 size={16} />
              Delete Round
            </button>
          ) : (
            <div className="delete-confirm">
              <p>Are you sure? This can't be undone.</p>
              <div className="delete-confirm-actions">
                <button className="btn btn-danger" onClick={handleDelete}>
                  Yes, Delete
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal
          amount={round.costPerPerson}
          roundTitle={round.title}
          onClose={() => setShowPayment(false)}
          onPaid={handlePaymentComplete}
        />
      )}
    </div>
  );
}
