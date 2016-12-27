module.exports = {
  auth: {
    google: {
      clientID: '716314554915-j4bc40bok937pnco7qb7g15pp815gg3e.apps.googleusercontent.com',
      clientSecret: 'S9yAyJ0bIQcqLt_9MXk0jZji',
      callbackURL: 'http://localhost:8080/auth/google/callback',
    },
    github: {
      clientID: '397e2879ad0c6fd257d2',
      clientSecret: 'b453a3c176c0d5b73b16b47a3aec9cd5090db48a',
      callbackURL: 'http://127.0.0.1:8080/auth/github/callback',
    },
  },
  secret: 'jinglebellrock',
  defaultPort: 8080,
}
