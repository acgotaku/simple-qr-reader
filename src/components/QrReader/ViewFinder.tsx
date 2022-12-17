export const ViewFinder = () => (
  <>
    <svg
      viewBox="0 0 100 100"
      style={{
        top: 0,
        left: 0,
        zIndex: 1,
        color: 'var(--color-primary)',
        boxSizing: 'border-box',
        border: '40px solid var(--color-mask-bg)',
        position: 'absolute',
        width: '100%',
        height: '100%'
      }}
    >
      <path
        fill="none"
        d="M13,0 L0,0 L0,13"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        fill="none"
        d="M0,87 L0,100 L13,100"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        fill="none"
        d="M87,100 L100,100 L100,87"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        fill="none"
        d="M100,13 L100,0 87,0"
        stroke="currentColor"
        strokeWidth="4"
      />
    </svg>
  </>
);
