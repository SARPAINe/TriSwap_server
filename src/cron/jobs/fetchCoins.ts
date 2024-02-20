import axios from 'axios'
import RealToken from '../../models/real_token.models' // Adjust the import path based on your actual models location
import { io } from '../../socket'

interface TokenData {
  usd: number
}

interface ApiResponse {
  [key: string]: TokenData
}

const updates = [
  {
    name: 'aave',
    tokenName: 'Aave Token',
    symbol: 'AAVE',
    icon: 'https://res.cloudinary.com/dxtahvyx2/image/upload/v1705295105/token-icons/aave_pwh3uj.png',
    price: [
      104.58, 100.3, 99.06, 101.1, 100.01, 101.46, 100.13, 99.41, 99.85, 103.19,
      102.65, 112.45, 118.88, 112.36, 111.46, 108.97, 115.75, 110.43, 102.57,
      104.03, 102.6, 99.42, 94.91, 98.91, 96.52, 106.94, 109.58, 102.98, 106.18,
      99.39, 101.36,
    ],
    currentPrice: 101.91,
  },
  {
    name: 'bitcoin',
    tokenName: 'Bitcoin',
    symbol: 'BTC',
    icon: 'https://res.cloudinary.com/dxtahvyx2/image/upload/v1705295304/token-icons/bitcoin_zj1nnf.png',
    price: [
      42247.07, 41410.82, 42684.18, 42250.21, 43634.12, 43849.7, 44003.7,
      43752.03, 43034.97, 43638.24, 42516.43, 43418.47, 42600.65, 42074.71,
      42220.61, 42208.2, 44168.68, 44994.67, 42821.56, 44195.58, 44113.7,
      43956.12, 43883.74, 46936.19, 46105.95, 46632.31, 46314.36, 42893.93,
      42848.47, 41800.93, 42605.69,
    ],
    currentPrice: 42645.38,
  },
  {
    name: 'chainlink',
    tokenName: 'ChainLink Token',
    symbol: 'LINK',
    icon: 'https://res.cloudinary.com/dxtahvyx2/image/upload/v1705295305/token-icons/chainlink_tb8sh7.png',
    price: [
      14.31, 14.03, 14.65, 14.07, 14.21, 15.28, 15.5, 15.68, 15.29, 15.61,
      15.07, 16.64, 16.05, 15.53, 15.2, 14.92, 15.53, 15.2, 14.14, 14.54, 14.07,
      13.42, 13.11, 14.15, 13.71, 15.03, 15, 14.12, 14.37, 14.8, 15.64,
    ],
    currentPrice: 15.54,
  },
  {
    name: 'dai',
    tokenName: 'Dai Stablecoin',
    symbol: 'Dai',
    icon: 'https://res.cloudinary.com/dxtahvyx2/image/upload/v1705295305/token-icons/dai_iuqn0p.png',
    price: [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.99, 1,
    ],
    currentPrice: 1,
  },
  {
    name: 'dogecoin',
    tokenName: 'Dogecoin',
    symbol: 'Doge',
    icon: 'https://res.cloudinary.com/dxtahvyx2/image/upload/v1705295306/token-icons/dogecoin_fd2jux.png',
    price: [
      0.1, 0.09, 0.09, 0.09, 0.09, 0.09, 0.1, 0.09, 0.09, 0.09, 0.09, 0.09,
      0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08,
      0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08,
    ],
    currentPrice: 0.08,
  },
  {
    name: 'ethereum',
    tokenName: 'Ether',
    symbol: 'ETH',
    icon: 'https://res.cloudinary.com/dxtahvyx2/image/upload/v1705295244/token-icons/ether_iukdzo.png',
    price: [
      2227.94, 2199.54, 2216.93, 2176.84, 2198.42, 2236.19, 2327.05, 2310.96,
      2264.91, 2273.63, 2230.88, 2376.77, 2345.26, 2299.53, 2294.34, 2279.94,
      2350.03, 2360.78, 2211.17, 2270.98, 2267.09, 2241.51, 2220.15, 2331.66,
      2341.16, 2588.77, 2618.33, 2524.5, 2575.92, 2477.94, 2508.32,
    ],
    currentPrice: 2524.33,
  },
  {
    name: 'maker',
    tokenName: 'Maker',
    symbol: 'MKR',
    icon: 'https://res.cloudinary.com/dxtahvyx2/image/upload/v1705295306/token-icons/maker_yl141u.png',
    price: [
      1327.57, 1316.03, 1287.62, 1289.37, 1285.63, 1322.1, 1390.92, 1383.1,
      1396.74, 1406.25, 1410.04, 1529.16, 1557.07, 1543.7, 1598.66, 1694.64,
      1655.95, 1833.44, 1816.05, 1777.66, 1737.27, 1700.14, 1740.7, 1809.02,
      1837.79, 2024.43, 2144.26, 2026.16, 2069.2, 2032.52, 2021.45,
    ],
    currentPrice: 2051.91,
  },
  {
    name: 'matic-network',
    tokenName: 'Matic Token',
    symbol: 'MATIC',
    icon: 'https://res.cloudinary.com/dxtahvyx2/image/upload/v1705295307/token-icons/matic-network_jgk3go.png',
    price: [
      0.85, 0.82, 0.8, 0.76, 0.77, 0.82, 0.88, 0.86, 0.85, 0.91, 1.01, 1.04, 1,
      0.97, 0.95, 0.97, 1.02, 0.97, 0.85, 0.88, 0.85, 0.83, 0.8, 0.84, 0.81,
      0.9, 0.93, 0.86, 0.88, 0.84, 0.86,
    ],
    currentPrice: 0.86,
  },
  {
    name: 'solana',
    tokenName: 'Solana',
    symbol: 'SOL',
    icon: 'https://res.cloudinary.com/dxtahvyx2/image/upload/v1705295307/token-icons/solana_qpt2wm.png',
    price: [
      73.39, 71.09, 74.34, 72.61, 82.1, 93.94, 98.08, 107.64, 112.45, 121.45,
      112.33, 106.98, 102.25, 106.25, 101.99, 101.33, 109.44, 106.66, 98.62,
      104.84, 99.8, 93.68, 88.92, 97.66, 98.75, 102.41, 99.99, 91.5, 95.63,
      94.12, 95.79,
    ],
    currentPrice: 94.79,
  },
  {
    name: 'tether',
    tokenName: 'Tether USD',
    symbol: 'USDT',
    icon: 'https://res.cloudinary.com/dxtahvyx2/image/upload/v1705295308/token-icons/tether_t32vib.png',
    price: [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1,
    ],
    currentPrice: 1,
  },
]
const fetchCoins = async () => {
  try {
    // const response = await axios.get<ApiResponse>(
    //   'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,aave,chainlink,dai,dogecoin,ethereum,matic-network,solana,tether,maker&vs_currencies=usd&precision=2&include_last_updated_at=true',
    // )

    // const data = response.data

    // for (const [tokenName, { usd: currentPrice }] of Object.entries(data)) {
    //   // Find the RealToken by tokenName
    //   const realToken = await RealToken.findOne({ where: { name: tokenName } })

    //   if (realToken) {
    //     // Update the 'price' array with the new 'currentPrice'
    //     // const updatedPrices = [...realToken.price, currentPrice]

    //     // Update the RealToken record
    //     // await realToken.update({ price: updatedPrices })

    //     // Prepare data for emitting
    //     updates.push({
    //       name: tokenName,
    //       tokenName: realToken.tokenName,
    //       symbol: realToken.symbol, // Adjust according to your model structure
    //       icon: realToken.icon, // Adjust according to your model structure
    //       price: realToken.price,
    //       currentPrice,
    //     })
    //   }
    // }

    // console.log(updates)
    // Emit the updates
    io.emit('updateAnalytics', updates)
  } catch (error: any) {
    console.error('Error fetching and updating prices:', error.message)
  }
}

export { fetchCoins }
