export async function validateResponse(response: Response): Promise<Response> {
  if(response.status >= 400) {
    throw new Error( await response.text());
  }
  return response;
}