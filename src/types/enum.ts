export enum API_METHODS {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

export enum API_ENDPOINT {
  authentication = '/oauth/token',
}

export enum CONTENT_TYPE {
  urlencoded = 'application/x-www-form-urlencoded',
  json = 'application/json',
}
