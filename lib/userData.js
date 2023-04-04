import { getToken } from "./authenticate";

export async function addToFavourites(id) {
  try {
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function removeFromFavourites(id) {
  try {
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getFavourites() {
  try {
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function addToHistory(id) {
  try {
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function removeFromHistory(id) {
  try {
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getHistory() {
  try {
    const token = getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}
