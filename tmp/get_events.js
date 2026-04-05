async function fetchEvents() {
  try {
    const response = await fetch('https://admin.phoenixnsec.in/api/events/all');
    const result = await response.json();
    if (result.success && result.data) {
      result.data.forEach(event => {
        console.log(`${event.eventId}: ${event.name}`);
      });
    }
  } catch (err) {
    console.error(err);
  }
}
fetchEvents();
