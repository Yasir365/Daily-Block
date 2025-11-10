import mongoose from "mongoose";

const SentimentSchema = new mongoose.Schema({
  coin: String,
  bullish: Number,
  bearish: Number,
  marketCap: String,
  fdv: String,
  volume24h: String,
  volToMarketCapRatio: String,
  holders: String,
  tvl: String,
  totalSupply: String,
  maxSupply: String,
  circulatingSupply: String,
  analyzedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Sentiment ||
  mongoose.model("Sentiment", SentimentSchema);
