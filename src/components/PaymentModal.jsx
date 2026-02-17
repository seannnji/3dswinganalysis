import { useState } from 'react';
import { X, CreditCard, Check, Smartphone } from 'lucide-react';
import { formatCurrency } from '../utils/helpers.js';

export default function PaymentModal({ amount, roundTitle, onClose, onPaid }) {
  const [method, setMethod] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);

  function handlePay() {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setComplete(true);
      setTimeout(() => {
        onPaid();
        onClose();
      }, 1500);
    }, 2000);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        {complete ? (
          <div className="payment-complete">
            <div className="payment-complete-icon">
              <Check size={48} />
            </div>
            <h2>You're all set!</h2>
            <p>Payment confirmed for {roundTitle}</p>
          </div>
        ) : (
          <>
            <div className="payment-header">
              <h2>Settle Up</h2>
              <p className="payment-amount">{formatCurrency(amount)}</p>
              <p className="payment-desc">for {roundTitle}</p>
            </div>

            <div className="payment-methods">
              <button
                className={`payment-method ${method === 'card' ? 'selected' : ''}`}
                onClick={() => setMethod('card')}
              >
                <CreditCard size={24} />
                <span>Credit Card</span>
              </button>
              <button
                className={`payment-method ${method === 'venmo' ? 'selected' : ''}`}
                onClick={() => setMethod('venmo')}
              >
                <Smartphone size={24} />
                <span>Venmo</span>
              </button>
              <button
                className={`payment-method ${method === 'cash' ? 'selected' : ''}`}
                onClick={() => setMethod('cash')}
              >
                <span className="payment-method-emoji">&#128181;</span>
                <span>Cash (I'll pay at the course)</span>
              </button>
            </div>

            {method === 'card' && (
              <div className="payment-card-form">
                <input type="text" placeholder="Card number" className="payment-input" />
                <div className="payment-card-row">
                  <input type="text" placeholder="MM/YY" className="payment-input" />
                  <input type="text" placeholder="CVC" className="payment-input" />
                </div>
              </div>
            )}

            {method === 'venmo' && (
              <div className="payment-venmo-info">
                <p>You'll be redirected to Venmo to complete payment.</p>
              </div>
            )}

            {method === 'cash' && (
              <div className="payment-cash-info">
                <p>We'll let the organizer know you'll pay in person. Don't forget!</p>
              </div>
            )}

            {method && (
              <button
                className="payment-submit-btn"
                onClick={handlePay}
                disabled={processing}
              >
                {processing ? (
                  <span className="payment-processing">
                    <span className="spinner" />
                    Processing...
                  </span>
                ) : (
                  `Pay ${formatCurrency(amount)}`
                )}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
