import { useState, useEffect } from 'react';

export default function MotivationCard({ isRunning }) {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/motivation');
      const data = await res.json();
      setQuote(data);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote({ text: 'Could not load quote.', author: '' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch on mount
    fetchQuote();
  }, []);

  useEffect(() => {
    if (isRunning) {
      fetchQuote(); // New quote immediately when timer starts
      const interval = setInterval(fetchQuote, 15000); // Every 15s
      return () => clearInterval(interval); // Stop when timer stops
    }
  }, [isRunning]);

  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid #ccc',
        marginTop: '1rem',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
        minHeight: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      {loading ? (
        <p style={{ fontStyle: 'italic', color: '#666' }}>
          Finding an awesome quote...
        </p>
      ) : (
        quote && (
          <>
            <p style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>
              "{quote.text}"
            </p>
            <small
              style={{
                display: 'block',
                marginTop: '0.5rem',
                fontWeight: 'bold'
              }}
            >
              — {quote.author}
            </small>
          </>
        )
      )}
    </div>
  );
}
