'use client';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-layout grid-pattern">
      {/* Background decoration */}
      <div className="auth-bg-glow glow-1" />
      <div className="auth-bg-glow glow-2" />
      
      <div className="auth-container animate-scale-in">
        {children}
      </div>

      <style jsx>{`
        .auth-layout {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 1rem;
        }

        .auth-bg-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
          z-index: 0;
          pointer-events: none;
        }

        .glow-1 {
          background: var(--accent-purple);
          top: -200px;
          left: -200px;
        }

        .glow-2 {
          background: var(--accent-blue);
          bottom: -200px;
          right: -200px;
        }

        .auth-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 420px;
        }
      `}</style>
    </div>
  );
}
