import { auth } from 'twitter-api-sdk';

export const oauth2Client = new auth.OAuth2User({
    client_id: process.env.TWITTER_CLIENT_ID!,
    client_secret: process.env.TWITTER_CLIENT_SECRET!,
    callback: process.env.ORIGIN + '/twitter/oauth/v2/callback',
    scopes: ['tweet.read', 'users.read']
});
