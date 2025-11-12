import mongoose, { Schema, Document, models } from "mongoose";

export interface IFaq {
  question: string;
  answer: string;
}

export interface IIcoProject extends Document {
  userId?: mongoose.Types.ObjectId;
  cryptoCoinName: string;
  coinAbbreviation: string;
  icoIcon?: string;
  icoImages?: string[];
  icoTokenPrice?: string;
  additionalDetails?: string;
  kyc?: string;
  kycDetails?: string;
  cantParticipate?: string;
  participationWith?: string;
  competitionCoins?: string;
  tokenRole1?: string;
  tokenType?: string;
  interest?: string;
  tokenRole2?: string;
  received?: string;
  icoStartDate?: string;
  icoEndDate?: string;
  websiteLink?: string;
  whitepaperLink?: string;
  prototypeLink?: string;
  coinPurchaseLink?: string;

  // Social Media
  facebookLink?: string;
  linkedinLink?: string;
  twitterLink?: string;
  githubLink?: string;
  telegramLink?: string;
  mediumLink?: string;
  bitcoinLink?: string;
  youtubeLink?: string;

  // Token Supply
  fundraisingGoal?: string;
  soldOnPreSale?: string;
  totalSupply?: string;
  circulatingSupply?: string;
  teamTokens?: string;
  otherTokens?: string;

  // FAQs
  faqs?: IFaq[];

  // Video
  videoTour?: string;

  stepCompleted: number;
  status: "draft" | "pending" | "approved" | "rejected";
  createdAt?: Date;
  updatedAt?: Date;
}

const FaqSchema = new Schema<IFaq>({
  question: { type: String },
  answer: { type: String },
});

const IcoProjectSchema = new Schema<IIcoProject>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      autopopulate: false, // you can set true if you want auto populate
      set: (v: any) =>
        mongoose.Types.ObjectId.isValid(v)
          ? new mongoose.Types.ObjectId(v)
          : undefined,
    },
    cryptoCoinName: { type: String, required: true },
    coinAbbreviation: { type: String, required: true },
    icoIcon: { type: String },
    icoImages: [{ type: String }],
    icoTokenPrice: { type: String },
    additionalDetails: { type: String },
    kyc: { type: String },
    kycDetails: { type: String },
    cantParticipate: { type: String },
    participationWith: { type: String },
    competitionCoins: { type: String },
    tokenRole1: { type: String },
    tokenType: { type: String },
    interest: { type: String },
    tokenRole2: { type: String },
    received: { type: String },
    icoStartDate: { type: String },
    icoEndDate: { type: String },
    websiteLink: { type: String },
    whitepaperLink: { type: String },
    prototypeLink: { type: String },
    coinPurchaseLink: { type: String },

    // Social Media
    facebookLink: { type: String },
    linkedinLink: { type: String },
    twitterLink: { type: String },
    githubLink: { type: String },
    telegramLink: { type: String },
    mediumLink: { type: String },
    bitcoinLink: { type: String },
    youtubeLink: { type: String },

    // Token Supply
    fundraisingGoal: { type: String },
    soldOnPreSale: { type: String },
    totalSupply: { type: String },
    circulatingSupply: { type: String },
    teamTokens: { type: String },
    otherTokens: { type: String },

    // FAQs
    faqs: [FaqSchema],

    // Video
    videoTour: { type: String },

    stepCompleted: { type: Number, default: 1 },
    status: {
      type: String,
      enum: ["draft", "pending", "approved", "rejected"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export default models.IcoProject ||
  mongoose.model<IIcoProject>("IcoProject", IcoProjectSchema);
