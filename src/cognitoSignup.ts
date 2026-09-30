import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient({
  region: 'us-west-2',
});

export async function registerUser(
  email: string,
  password: string,
  name: string,
  phoneNumber: string,
) {
  const nameParts = name.trim().split(/\s+/);
  const givenName = nameParts[0] || '';
  const familyName = nameParts.slice(1).join(' ') || givenName;

  const command = new SignUpCommand({
    ClientId: '32729mdveb1tveghf2ft4n4lad',
    Username: email.split('@')[0],
    Password: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
      {
        Name: 'phone_number',
        Value: phoneNumber,
      },
      {
        Name: 'given_name',
        Value: givenName,
      },
      {
        Name: 'family_name',
        Value: familyName,
      },
      {
        Name: 'name',
        Value: name,
      },
    ],
  });

  return client.send(command);
}