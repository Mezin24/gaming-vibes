import { useEffect, useState } from 'react';
import styles from '../styles/Guides.module.css';
import useAuthCtx from '../stores/authContext';

export default function Guides() {
  const { user, authReady } = useAuthCtx();
  const [guides, setGuides] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authReady) return;
    fetch(
      '/.netlify/functions/guides',
      user && {
        headers: {
          Authorization: 'Bearer ' + user.token.access_token,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error('You must be logged in to view this content');
        }
        return res.json();
      })
      .then((data) => {
        setGuides(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setGuides(null);
      });
  }, [user, authReady]);

  return (
    <div className={styles.guides}>
      {!authReady && <div>Loading...</div>}
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}
      {guides &&
        guides.map((guide) => (
          <div key={guide.title} className={styles.card}>
            <h3>{guide.title}</h3>
            <h4>Written by {guide.author}</h4>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam,
              sed! A ex explicabo asperiores magnam repellendus nihil dolorem
              sequi ratione eligendi. Recusandae molestiae odit inventore velit
              quisquam consequuntur error incidunt.
            </p>
          </div>
        ))}
    </div>
  );
}
