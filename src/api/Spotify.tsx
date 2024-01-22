export async function redirectToAuthCodeFlow(clientId: string) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem('verifier', verifier);

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('response_type', 'code');
  params.append('redirect_uri', 'http://localhost:3000');
  params.append(
    'scope',
    'user-read-private user-read-email user-read-recently-played user-library-read user-read-playback-position'
  );
  params.append('code_challenge_method', 'S256');
  params.append('code_challenge', challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function getAccessToken(
  clientId: string,
  code: string
): Promise<string> {
  const verifier = localStorage.getItem('verifier');

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', 'http://localhost:3000');
  params.append('code_verifier', verifier!);

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  const { access_token } = await result.json();
  return access_token;
}

export async function fetchProfile(token: string): Promise<any> {
  const result = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

export async function fetchPlaylists(token: string): Promise<any> {
  const result = await fetch('https://api.spotify.com/v1/me/playlists', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

export async function fetchRecents(token: string): Promise<any> {
  const result = await fetch(
    'https://api.spotify.com/v1/me/player/recently-played?limit=50',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return await result.json();
}

export async function fetchEpisodes(token: string): Promise<any> {
  const result = await fetch(
    'https://api.spotify.com/v1/me/episodes?limit=50',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return await result.json();
}

export async function fetchAlbums(token: string): Promise<any> {
  const result = await fetch('https://api.spotify.com/v1/me/albums', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

export async function fetchSingleAlbum(
  token: string,
  id: string
): Promise<any> {
  const result = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

export async function fetchArtists(token: string): Promise<any> {
  const result = await fetch('https://api.spotify.com/v1/me/top/artists', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

export async function fetchAlbumByArtist(
  token: string,
  id: string
): Promise<any> {
  const result = await fetch(
    `https://api.spotify.com/v1/artists/${id}/albums?limit=5`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return await result.json();
}

export async function fetchSearch(token: string, id: string): Promise<any> {
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${id}&type=track&limit=7`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return await result.json();
}
