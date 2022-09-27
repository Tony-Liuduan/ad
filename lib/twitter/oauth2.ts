import { auth } from 'twitter-api-sdk';

export const oauth2Client = new auth.OAuth2User({
    client_id: process.env.TWITTER_CLIENT_ID!,
    client_secret: process.env.TWITTER_CLIENT_SECRET!,
    callback: process.env.TWITTER_OAUTH2_CALLBACK!,
    scopes: ['tweet.read', 'users.read']
});
