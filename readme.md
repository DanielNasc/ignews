run:

```bash

git clone https://github.com/DanielNasc/ignews.git
cd ignews
yarn

# prismic CMS
# run this and configure your Type
npx @slicemachine/init --repository YOUR_REPO
yarn slicemachine

# Stripe
stripe listen --forward-to localhost:3000/api/webhooks

yarn dev
```
