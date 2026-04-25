import React, { useEffect, useState } from 'react';

const endpointPath = 'activities';

function getApiUrl() {
  const name = process.env.REACT_APP_CODESPACE_NAME || '';
  if (name) {
    const url = `https://${name}-8000.app.github.dev/api/${endpointPath}/`;
    return url;
  }
  return `http://localhost:8000/api/${endpointPath}/`;
}

export default function Activities() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const url = getApiUrl();
    console.log('Fetching Activities from', url);
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        console.log('Activities response:', json);
        const payload = json && json.results ? json.results : json;
        setData(payload);
      })
      .catch((err) => console.error('Activities fetch error:', err));
  }, []);

  return (
    <div>
      <h2 className="h4 mb-3">Activities</h2>
      <div className="card">
        <div className="card-body">
          {Array.isArray(data) ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
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
