const Lead = {};

Lead.save = async (lead) => {
  let response = await fetch("/lead/save", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead)
  });
  response = await response.json();

  if (API.verifyResponse(response)) { return false };

  return response;
};