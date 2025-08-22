# CoinRaft - Cryptocurrency Markets Dashboard

A modern, responsive cryptocurrency markets dashboard built with React, TypeScript, and Tailwind CSS. Track live prices, manage your watchlist, monitor your portfolio, and stay updated with real-time market data.

## ✨ Features

### 📊 **Live Market Data**
- Real-time price updates with WebSocket simulation
- Live trading indicators and price alerts
- Comprehensive market statistics (24h high/low, market cap, volume)
- Beautiful 7-day sparkline charts

### 🎯 **Trading Interface**
- Professional order book display with depth visualization
- Live trades feed with buy/sell indicators
- Interactive price charts with multiple timeframes (1m, 5m, 15m, 1h, 4h, 1d)
- Currency conversion (USD, INR, USDT) with live exchange rates

### ⭐ **Watchlist Management**
- Add/remove coins from your personal watchlist
- Persistent storage across browser sessions
- Quick access to favorite cryptocurrencies
- Bulk watchlist management

### 💼 **Portfolio Tracking**
- Track your crypto investments and trades
- Real-time P&L calculations and performance metrics
- Position management with average cost basis
- Comprehensive trade history

### 🔔 **Price Alerts**
- Set custom price alerts for any cryptocurrency
- Browser notifications when price targets are hit
- Manage multiple alerts simultaneously
- Persistent alert storage

### 🎨 **Modern Design**
- Dark-first design optimized for traders
- Fully responsive layout (mobile-first approach)
- Professional color scheme with success/danger indicators
- Smooth animations and transitions

## 🚀 Technology Stack

- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand with persistence
- **Data Fetching**: TanStack Query for caching and synchronization
- **Routing**: React Router DOM
- **UI Components**: Custom components built with Radix UI primitives
- **Charts**: Lightweight charts ready integration
- **Virtualization**: TanStack Virtual for large data sets
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── Layout.tsx      # Main app layout with navigation
│   ├── MarketTable.tsx # Virtualized markets table
│   ├── PriceChip.tsx   # Price display component
│   ├── PercentBadge.tsx # Percentage change indicator
│   └── ...
├── pages/              # Route components
│   ├── Markets.tsx     # Main markets overview
│   ├── CoinDetail.tsx  # Individual coin analysis
│   ├── Watchlist.tsx   # User's watchlist
│   ├── Portfolio.tsx   # Portfolio management
│   └── Settings.tsx    # App configuration
├── store/              # Zustand state management
│   ├── settings.ts     # App settings (currency, theme)
│   ├── watchlist.ts    # Watchlist management
│   ├── portfolio.ts    # Portfolio & trades
│   └── alerts.ts       # Price alerts
├── lib/                # Utility functions and data
│   ├── mockData.ts     # Realistic crypto market data
│   ├── format.ts       # Number and currency formatting
│   ├── wsClient.ts     # WebSocket client simulation
│   └── utils.ts        # General utilities
└── hooks/              # Custom React hooks
    └── use-mobile.tsx  # Mobile detection hook
```

## 🎯 Key Features Explained

### Real-time Data Simulation
The app uses a sophisticated WebSocket simulation that provides:
- Live price updates every 2 seconds
- Realistic market fluctuations (±0.1% price changes)
- Order book updates with bid/ask spreads
- Trade feed with randomized buy/sell orders

### Currency Conversion
Supports multiple currencies with live conversion:
- **USD**: US Dollar (default)
- **INR**: Indian Rupee (₹83.25 per USD)
- **USDT**: Tether stablecoin (~$1.001)

### Professional Trading Interface
- **Order Book**: Shows top 20 bids and asks with cumulative depth
- **Trade Feed**: Real-time trade prints with size and side indicators
- **Price Charts**: Ready for lightweight-charts integration
- **Market Statistics**: Comprehensive data including supply metrics

### Portfolio Management
- **Trade Tracking**: Add buy/sell trades with timestamp
- **Position Calculation**: Automatic average cost and P&L computation
- **Performance Metrics**: Total portfolio value and return percentage
- **Data Export**: Download portfolio data as JSON

## 🛠️ Development

### Prerequisites
- Node.js 16+ and npm
- Modern browser with ES2020 support

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd coinraft

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
npm run build
```

### Linting and Formatting
```bash
npm run lint
npm run format
```

## 📱 Responsive Design

The app is built with a mobile-first approach:
- **Mobile** (320px+): Single-column layout with essential data
- **Tablet** (768px+): Two-column layout with expanded information
- **Desktop** (1024px+): Full layout with all columns and charts
- **Large Desktop** (1280px+): Optimized spacing and larger charts

## 🎨 Design System

### Color Palette
- **Primary**: Professional blue (#4F46E5) for brand elements
- **Success**: Green (#10B981) for positive values and gains
- **Danger**: Red (#EF4444) for negative values and losses
- **Warning**: Amber (#F59E0B) for alerts and notifications
- **Muted**: Neutral grays for secondary information

### Typography
- **Headings**: Bold weights with proper hierarchy
- **Body**: Regular weight for readability
- **Monospace**: For prices, percentages, and numeric data
- **Small Text**: For metadata and secondary information

### Components
All components follow a consistent design pattern:
- Semantic color usage (success/danger for financial data)
- Consistent spacing and border radius
- Hover states and smooth transitions
- Loading states and error handling

## 🔧 Customization

### Adding New Cryptocurrencies
Edit `src/lib/mockData.ts` to add more coins to the `mockCoins` array.

### Changing Color Scheme
Modify the CSS custom properties in `src/index.css` to adjust the color palette.

### Adding Real Data Sources
Replace the mock WebSocket client in `src/lib/wsClient.ts` with real API connections:
- **REST APIs**: CoinGecko, CoinMarketCap
- **WebSocket**: Binance, Coinbase Pro
- **Exchange Rates**: Fixer.io, CurrencyAPI

## 📄 License

This project is built as a demonstration of modern React development practices. Feel free to use it as a starting point for your own cryptocurrency tracking applications.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component primitives
- **Lucide** for the comprehensive icon library
- **Tailwind CSS** for the utility-first styling approach
- **Radix UI** for accessible component foundations
- **TanStack** for powerful data management tools
