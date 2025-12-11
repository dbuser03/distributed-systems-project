# WhistleBlower

> A decentralized, censorship-resistant platform for journalists to share information anonymously with the public by publishing articles on the blockchain.

[![Internet Computer](https://img.shields.io/badge/Built%20on-Internet%20Computer-blue)](https://internetcomputer.org/)
[![Motoko](https://img.shields.io/badge/Backend-Motoko-orange)](https://internetcomputer.org/docs/current/motoko/main/motoko)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-blue)](https://react.dev/)

## 📖 Overview

WhistleBlower is a blockchain-based platform inspired by WikiLeaks, designed to empower journalists and whistleblowers to share sensitive information with the public anonymously and without the risk of government censorship. By leveraging the immutable nature of blockchain technology, articles published on WhistleBlower cannot be altered or removed, ensuring transparency and preserving the integrity of investigative journalism.

### Key Features

- 🔒 **Anonymous Publishing**: Journalists can publish articles without revealing their identity
- 🛡️ **Censorship Resistance**: Content is stored on the blockchain, making it immutable and tamper-proof
- 📝 **Rich Content Support**: Publish articles with text, images, PDFs, and other attachments
- 💬 **Community Engagement**: Comment threads and voting system for community discussion (W.I.P)
- 🏷️ **Tagging & Filtering**: Organize content with tags, filters, and search capabilities
- ✅ **Verification System**: Role-based system with verifiers and admins to ensure content quality (W.I.P)
- 📊 **Credibility Scoring**: User reputation system based on contributions and verification (W.I.P)
- 🌐 **Decentralized**: Built on Internet Computer Protocol for true decentralization

### Missing Features

- 🗑️ **Deleting Own Data**: Allow users to delete their personal data and published stories
- 🕵️ **Verification Page**: Dedicated page for reviewers to verify and approve submitted content
- 🔎 **Additional Filtering**: Enhanced filtering options, including sorting and showing only verified stories
- 👍 **Comment Rating System**: Vote (like/dislike) on comments to surface helpful discussion

## 🏗️ Architecture

### Tech Stack

**Backend:**

- [Motoko](https://internetcomputer.org/docs/current/motoko/main/motoko) - Smart contract language for Internet Computer
- [Internet Computer Protocol](https://internetcomputer.org/) - Decentralized blockchain platform
- [Candid](https://internetcomputer.org/docs/current/developer-docs/backend/candid/) - Interface description language

**Frontend:**

- [React](https://react.dev/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [TailwindCSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) - Styling framework
- [React Router](https://reactrouter.com/) - Client-side routing

**Authentication:**

- [Internet Identity](https://internetcomputer.org/docs/current/developer-docs/integrations/internet-identity/overview) - Decentralized identity solution

### Project Structure

```
distributed-systems-project/
├── src/
│   ├── project_backend/          # Motoko backend canister
│   │   ├── Controller/           # Main forum controller
│   │   ├── Model/                # Data types and models
│   │   ├── Services/             # Document store and indexing services
│   │   └── Utils/                # Utility functions and demo data
│   └── project_frontend/         # React frontend application
│       └── src/
│           ├── components/       # React components
│           ├── pages/            # Page components
│           ├── hooks/            # Custom React hooks
│           ├── context/         # React context providers
│           └── types/           # TypeScript type definitions
├── dfx.json                      # DFX configuration
├── mops.toml                     # Motoko package manager config
└── package.json                  # Node.js dependencies
```

## 📋 Requirements

- **Node.js**: 20 LTS or above
- **npm**: 7.0.0 or above
- **DFX**: Internet Computer SDK (will be installed in setup)
- **ic-mops**: Motoko package manager

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have Node.js 20 LTS or above installed on your system.

### Installation

1. **Install Internet Computer SDK (DFX)**

   ```bash
   sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
   ```

   For more details, see the [DFX Quick Start Guide](https://internetcomputer.org/docs/building-apps/getting-started/quickstart).

2. **Install Motoko Package Manager**

   ```bash
   npm install -g ic-mops
   ```

3. **Install Node.js Dependencies**

   ```bash
   npm install
   ```

4. **Install Motoko Dependencies**

   ```bash
   mops install
   ```

## 🏃 Running the Project Locally

### Start the Local Replica

Start the Internet Computer replica in the background:

```bash
dfx start --background
```

### Deploy Canisters

Deploy all canisters (backend and frontend) to the local replica:

```bash
dfx deploy
```

This command will:

- Compile the Motoko backend canister
- Build the React frontend
- Deploy both canisters to the local replica
- Generate Candid interface files

Once deployment completes, your application will be available at:

```
http://localhost:4943?canisterId={asset_canister_id}
```

> **Note**: Replace `{asset_canister_id}` with the actual canister ID displayed after deployment.

### Load Demo Data 

To load some demo threads, click in the terminal the link for the backend canister "forum" via Candid Interface, it will be availabe at

```
 forum: http://127.0.0.1:4943/?canisterId={backend_canister_id}
```
Once opened, search for the `createDemo` method and click the button "Call", wait until it returns a status code 200 and reload the frontend page.
### Development Workflow

**Backend Changes:**

If you modify the backend canister, regenerate the Candid interface:

```bash
npm run build
```

This is automatically run when you execute `dfx deploy`, but you can run it manually if needed.

**Frontend Development:**

For frontend development with hot-reload, start the Vite dev server:

```bash
npm start
```

This starts a development server at `http://localhost:3000` that proxies API requests to the replica at port 4943.

## 📚 Additional Resources

To learn more about the technologies used in this project:

- [Internet Computer Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [DFX SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [Motoko Programming Language Guide](https://internetcomputer.org/docs/current/motoko/main/motoko)
- [Motoko Language Quick Reference](https://internetcomputer.org/docs/current/motoko/main/language-manual)
- [Internet Identity Documentation](https://internetcomputer.org/docs/current/developer-docs/integrations/internet-identity/overview)

## 🔧 Configuration

### Frontend Environment Variables

If you're hosting the frontend code without using DFX, you may need to configure environment variables to ensure your project doesn't fetch the root key in production:

**Option 1:** Set `DFX_NETWORK` to `ic` if using Webpack

**Option 2:** Configure `dfx.json` to override environment variables:

```json
{
  "canisters": {
    "{asset_canister_id}": {
      "declarations": {
        "env_override": "ic"
      }
    }
  }
}
```

**Option 3:** Write your own `createActor` constructor that doesn't fetch the root key

## 🔐 Security Considerations

- **Anonymous Publishing**: Users authenticate via Internet Identity, which provides privacy-preserving authentication
- **Immutable Storage**: Once published, content cannot be altered or deleted due to blockchain immutability
- **Role-Based Access**: The platform implements a role system (User, Verifier, Admin) for content moderation
- **Credibility System**: User reputation scores help maintain content quality

## 🤝 Contributing

Contributions are welcome! When working with this project in your development environment, your changes will not affect any production deployment or identity tokens.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License

## 🙏 Acknowledgments

- Built on [Internet Computer Protocol](https://internetcomputer.org/)
- Inspired by platforms like WikiLeaks and other whistleblowing initiatives
