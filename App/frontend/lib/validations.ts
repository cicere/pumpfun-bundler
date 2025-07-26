import { z } from 'zod'

// Wallet validation schemas
export const walletSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
  type: z.enum(["generated", "imported"]),
  privateKey: z.string().optional(),
})

export type WalletFormData = z.infer<typeof walletSchema>

// Token validation schemas
export const tokenSchema = z.object({
  name: z.string().min(1, "Name is required").max(32, "Name must be less than 32 characters"),
  symbol: z.string().min(1, "Symbol is required").max(10, "Symbol must be less than 10 characters"),
  description: z.string().max(200, "Description must be less than 200 characters").optional(),
  image: z.instanceof(File).optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  twitter: z.string().optional(),
  telegram: z.string().optional(),
})

export type TokenFormData = z.infer<typeof tokenSchema>

// Bundle validation schemas
export const bundleSchema = z.object({
  name: z.string().min(1, "Bundle name is required").max(50, "Name must be less than 50 characters"),
  tokenId: z.string().min(1, "Token selection is required"),
  walletIds: z.array(z.string()).min(1, "At least one wallet must be selected"),
  buyAmount: z.number().min(0.001, "Buy amount must be at least 0.001 SOL"),
  slippage: z.number().min(0.1).max(50, "Slippage must be between 0.1% and 50%"),
  priorityFee: z.number().min(0, "Priority fee must be non-negative"),
})

export type BundleFormData = z.infer<typeof bundleSchema>

// Settings validation schemas
export const settingsSchema = z.object({
  rpcEndpoint: z.string().url("Must be a valid RPC endpoint URL"),
  jitoTip: z.number().min(0, "Jito tip must be non-negative"),
  maxRetries: z.number().min(1).max(10, "Max retries must be between 1 and 10"),
  defaultSlippage: z.number().min(0.1).max(50, "Default slippage must be between 0.1% and 50%"),
  autoSell: z.boolean(),
  sellDelay: z.number().min(0, "Sell delay must be non-negative"),
})

export type SettingsFormData = z.infer<typeof settingsSchema>