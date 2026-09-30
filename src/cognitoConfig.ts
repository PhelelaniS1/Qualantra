export const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-west-2.amazonaws.com/us-west-2_AbrHj4cH9",
  client_id: "32729mdveb1tveghf2ft4n4lad",
  redirect_uri: window.location.origin,
  response_type: "code",
  scope: "phone openid email",
};