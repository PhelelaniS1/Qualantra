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
) {
  const command = new SignUpCommand({
    ClientId: '32729mdveb1tveghf2ft4n4lad',
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
      {
        Name: 'name',
        Value: name,
      },
    ],
  });

  return client.send(command);
}