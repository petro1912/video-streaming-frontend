export default {
  meEndpoint: '/auth/me',
  loginEndpoint: `${process.env.NEXT_PUBLIC_BACKEND}/auth/login`,
  registerEndpoint: `${process.env.NEXT_PUBLIC_BACKEND}/auth/register`,
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
