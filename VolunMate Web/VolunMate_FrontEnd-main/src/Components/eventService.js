const API_URL = "http://localhost:5150/api/Event"; 

export const getEvents = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const getEventById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

export const createEvent = async (event) => {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
};

export const updateEvent = async (id, event) => {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
};

export const deleteEvent = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
