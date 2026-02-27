# Deployment Guide for ScoreSensei Website

Your website is ready to deploy! Here are three easy, free options with custom domain support:

## Option 1: Vercel (Recommended - Easiest Custom Domains)

### Method A: Web Interface (No CLI needed)

1. Go to [vercel.com](https://vercel.com) and sign up/login with GitHub
2. Click "Add New..." → "Project"
3. Import your Git repository or drag & drop the `score-sensei-web` folder
4. Vercel will auto-detect the settings
5. Click "Deploy"
6. Your site will be live at `https://your-project.vercel.app`

**To add a custom domain:**
1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Enter your domain name
4. Follow the DNS instructions (add A record or CNAME)
5. Domain changes can be made anytime - no redeployment needed!

### Method B: CLI Deployment

```bash
cd /Users/joevanderveen/Development/score-sensei/score-sensei-web

# Login to Vercel (opens browser for authentication)
vercel login

# Deploy
vercel

# Or deploy to production directly
vercel --prod
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? Select your account
- Link to existing project? **No**
- Project name? **score-sensei** (or your choice)
- In which directory is your code located? **./** (press Enter)

## Option 2: Netlify (Great Alternative)

### Method A: Drag & Drop

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `score-sensei-web` folder onto the page
3. Your site is instantly live!

**To add a custom domain:**
1. Go to Site Settings → Domain Management
2. Click "Add custom domain"
3. Follow DNS configuration steps

### Method B: CLI Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to your site
cd /Users/joevanderveen/Development/score-sensei/score-sensei-web

# Login (opens browser)
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

## Option 3: GitHub Pages (Free with GitHub)

1. Create a new GitHub repository
2. Push the `score-sensei-web` folder to the repository:

```bash
cd /Users/joevanderveen/Development/score-sensei/score-sensei-web
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/score-sensei-web.git
git push -u origin main
```

3. Go to repository Settings → Pages
4. Source: Deploy from branch `main`
5. Folder: `/ (root)`
6. Save

Your site will be live at: `https://YOUR-USERNAME.github.io/score-sensei-web/`

**Custom domain:**
1. Add a `CNAME` file with your domain name
2. Configure DNS settings (see GitHub Pages docs)

## Option 4: Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

cd /Users/joevanderveen/Development/score-sensei/score-sensei-web

# Login
firebase login

# Initialize
firebase init hosting

# Select:
# - Use existing project or create new
# - Public directory: . (current directory)
# - Single-page app: No
# - Set up automatic builds: No
# - Overwrite index.html: No

# Deploy
firebase deploy --only hosting
```

## Comparison

| Feature | Vercel | Netlify | GitHub Pages | Firebase |
|---------|--------|---------|--------------|----------|
| Ease of Setup | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Custom Domain | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Free SSL | ✅ | ✅ | ✅ | ✅ |
| Auto Deploy | ✅ | ✅ | ✅ | ✅ |
| Performance | Excellent | Excellent | Good | Excellent |
| Free Tier | Generous | Generous | Unlimited | Good |

## Recommendation

**For easiest custom domain setup: Use Vercel**

Vercel makes it incredibly simple to:
- Add/change custom domains
- Get automatic SSL certificates
- Update DNS settings
- No redeployment needed when changing domains

## Next Steps After Deployment

1. **Update Store Links**: Once your iOS/Android apps are published, update the App Store and Google Play links in `index.html`

2. **Add Analytics**:
   - Add Google Analytics in `index.html` before `</head>`:
     ```html
     <!-- Google Analytics -->
     <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
     <script>
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'GA_MEASUREMENT_ID');
     </script>
     ```

3. **SEO Optimization**:
   - Add `robots.txt`
   - Add `sitemap.xml`
   - Consider adding Open Graph meta tags for social sharing

4. **Domain Setup**:
   - Purchase domain from Namecheap, GoDaddy, or Google Domains
   - Point DNS to your hosting provider
   - SSL certificate will be automatically provisioned

## Support

If you need help:
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Netlify: [docs.netlify.com](https://docs.netlify.com)
- GitHub Pages: [docs.github.com/pages](https://docs.github.com/pages)

Your website is production-ready and optimized for performance! 🚀
