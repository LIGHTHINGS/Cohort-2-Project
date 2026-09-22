# Product Requirements Document: PayLab

**A collaborative learning project — mock digital wallet & peer-to-peer transfer app**

| | |
|---|---|
| **Stack** | React (frontend) · Node.js/Express (backend) · MongoDB (database) |
| **Audience** | Bootcamp students, working in teams |
| **Type** | Educational / mock fintech app (no real money movement) |

---

## 1. Purpose

PayLab is a simplified digital wallet application that lets users create an account, hold a virtual balance, and send/receive money to other users on the platform. It's designed to teach students the core patterns behind real fintech products — account management, transaction integrity, ledger design, and auth — without touching real payment rails or compliance requirements.

Students will work in teams to build the frontend, backend, and database layer collaboratively, using Git for version control and a shared API contract.

## 2. Goals

- Give students hands-on experience with a full-stack app that has real state consistency challenges (money can't be duplicated or lost).
- Practice REST API design, authentication, and relational-style data modeling in MongoDB.
- Practice team collaboration: shared repo, branching, code review, API contracts.
- Produce a demo-able project by the end of the module.

### Non-goals

- Real money movement, bank/card integration, or KYC — this is a closed-loop virtual currency ("PayLab Coins" or similar).
- Regulatory compliance (PCI-DSS, AML/KYC) — explicitly out of scope, but can be discussed conceptually.
- Production-grade security hardening — good practices are taught, but this isn't meant to be deployed to real users with real funds.

## 3. Target Users (in the fiction of the app)

- **Personal user** — signs up, funds a wallet (mock top-up), sends/receives money from other users, views history.
- **Admin** (optional stretch) — views all users and transactions, can freeze accounts, manually adjust balances for support scenarios.

## 4. Core Features (MVP)

### 4.1 Authentication
- Sign up (name, email, password, auto-generated wallet)
- Login / logout (JWT-based sessions)
- Password hashing (bcrypt)

### 4.2 Wallet
- Every user has exactly one wallet, created automatically on signup
- Wallet has a balance (stored in smallest unit, e.g. kobo/cents, to avoid floating-point errors)
- "Mock top-up" endpoint to add funds for testing (simulates funding, no real payment)

### 4.3 Transfers
- Search/select another user by email or username
- Send an amount from your wallet to theirs
- Server-side validation: sufficient balance, positive amount, not sending to self
- Transaction must be atomic (both balances update together or neither does — this is the key teaching moment around MongoDB transactions/sessions)

### 4.4 Transaction History
- List of past transactions (sent + received) per user, newest first
- Each entry: counterparty, amount, direction (debit/credit), timestamp, status
- Basic filtering (date range, sent vs received)

### 4.5 Dashboard (Frontend)
- Current balance, prominently displayed
- Recent transactions list
- "Send money" flow
- "Top up" flow

## 5. Stretch Features (if time allows)

- Admin panel (view all users/transactions, freeze account)
- Transaction categories/notes
- Request-money flow (User A requests from User B, who approves/declines)
- Simple savings "pots" or spending limits
- Email/SMS-style notifications (mocked, just logged or shown in-app)
- Two-factor auth (OTP simulation)
- Rate limiting on transfer endpoint

## 6. Data Model (MongoDB)

**User**
```
{
  _id, name, email (unique), passwordHash,
  role: "user" | "admin",
  createdAt
}
```

**Wallet**
```
{
  _id, userId (ref User, unique),
  balance: Number (integer, smallest currency unit),
  currency: "PLC", // PayLab Coin
  status: "active" | "frozen",
  createdAt
}
```

**Transaction**
```
{
  _id, fromWalletId, toWalletId,
  amount: Number,
  type: "transfer" | "topup",
  status: "completed" | "failed",
  createdAt
}
```

> Teaching note: transfers should be implemented using MongoDB multi-document transactions (`session.startTransaction()`) so students see why atomicity matters when money is involved — a failed second write must roll back the first.

## 7. API Endpoints (indicative)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Create user + wallet |
| POST | `/api/auth/login` | Authenticate, return JWT |
| GET | `/api/wallet/me` | Get own wallet/balance |
| POST | `/api/wallet/topup` | Mock top-up |
| POST | `/api/transactions/transfer` | Send money to another user |
| GET | `/api/transactions/me` | Get own transaction history |
| GET | `/api/admin/users` | (Admin) list all users |
| PATCH | `/api/admin/wallet/:id/freeze` | (Admin) freeze a wallet |

## 8. Non-Functional Requirements

- **Consistency**: no transaction should ever leave the two wallets' balances inconsistent, even under concurrent requests.
- **Security basics**: hashed passwords, JWT expiry, input validation on all endpoints, no sensitive data in logs.
- **Usability**: balance and recent activity visible within one screen of logging in.
- **Performance**: not a focus for MVP, but transaction history should be paginated once it exceeds ~20 items.

## 9. Suggested Team Split

- **Backend team**: auth, wallet, transaction APIs, MongoDB schema/transactions
- **Frontend team**: React app — auth screens, dashboard, send/top-up flows, history view
- **Shared**: API contract (agree on request/response shapes early, e.g. via a shared doc or OpenAPI/Postman collection)

## 10. Suggested Milestones

1. **Week 1**: Data models, auth (signup/login), basic React shell with routing
2. **Week 2**: Wallet + top-up, dashboard UI wired to real balance
3. **Week 3**: Transfers (with atomic transaction logic) + transaction history
4. **Week 4**: Polish, stretch features, demo prep

## 11. Success Criteria

- Two users can sign up, one can top up, and successfully send money to the other, with both balances updating correctly.
- Concurrent transfer attempts don't corrupt balances (can be demonstrated/tested).
- Transaction history accurately reflects all money movement for a user.
- Team can walk through their Git history / PRs showing collaborative workflow.
