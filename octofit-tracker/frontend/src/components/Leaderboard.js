import React, { useEffect, useState } from 'react';

const endpointPath = 'leaderboard';

function getApiUrl() {
  const name = process.env.REACT_APP_CODESPACE_NAME || '';
  if (name) {
    return `https://${name}-8000.app.github.dev/api/${endpointPath}/`;
  }
  return `http://localhost:8000/api/${endpointPath}/`;
}

export default function Leaderboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const url = getApiUrl();
    console.log('Fetching Leaderboard from', url);
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        console.log('Leaderboard response:', json);
        const payload = json && json.results ? json.results : json;
        setData(payload);
      })
      .catch((err) => console.error('Leaderboard fetch error:', err));
  }, []);

  return (
    <div>
      <h2 className="h4 mb-3">Leaderboard</h2>
      <div className="card">
        <div className="card-body">
          {Array.isArray(data) ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Entry</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{typeof row === 'object' ? JSON.stringify(row) : String(row)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
