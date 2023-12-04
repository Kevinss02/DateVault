import React from 'react';

import { useAuthStore } from '../store/authStore';
import { formatDate } from '../utils/functions';

function VaultPage(): React.JSX.Element {
  const { user } = useAuthStore();

  return (
    <section className='flex items-center justify-center bg-custom-purple'>
      {user === undefined ? (
        <p>No info</p>
      ) : (
        <div>
          {Object.entries(user).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong>{' '}
              {key === 'registrationDate'
                ? formatDate(value as string)
                : (value as string)}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}

export default VaultPage;
