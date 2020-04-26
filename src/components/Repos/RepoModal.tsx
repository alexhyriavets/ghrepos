import React, { useEffect } from 'react';

type PropTypes = {
  url: string
  onClose: () => void
};

export const RepoModal: React.FC<PropTypes> = ({ url, onClose }) => {
  useEffect(() => {
    document.body.style.setProperty('overflow', 'hidden');

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, []);

  return (
    <div className='repoModal'>
      <div className="repoModal__wrapper">
        <button 
          type="button"
          className="repoModal__close"
          onClick={onClose}
        >
          close
        </button>

        <iframe 
          src={url}
          title='repo'
          frameBorder="1"
          className="repoModal__iframe"
        />
      </div>

      <div className="repoModal__overlay" />
    </div>
  );
};