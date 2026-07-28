import { buildPrompt as titlePrompt } from "./etsy/titleGenerator.prompt.js";
import { buildPrompt as tagPrompt } from "./etsy/tagGenerator.prompt.js";
import { buildPrompt as descriptionPrompt } from "./etsy/descriptionGenerator.prompt.js";
import { buildPrompt as keywordPrompt } from "./etsy/keywordGenerator.prompt.js";
import { buildPrompt as listingAnalyzerPrompt } from "./etsy/listingAnalyzer.prompt.js";
import { buildPrompt as shopNamePrompt } from "./etsy/shopNameGenerator.prompt.js";
import { buildPrompt as productIdeaPrompt } from "./etsy/productIdeaGenerator.prompt.js";
import { buildPrompt as holidayKeywordPrompt } from "./etsy/holidayKeywordFinder.prompt.js";
import { buildPrompt as trendExplorerPrompt } from "./etsy/trendExplorer.prompt.js";

/**
 * Single source of truth for every tool: id, marketplace, kind (ai | logic),
 * credit cost, and how to build its prompt. Adding tool #12 means adding one
 * entry here (+ a prompt file) — no route/controller changes needed.
 */
export const toolRegistry = {
  "etsy-title-generator": {
    id: "etsy-title-generator",
    marketplace: "etsy",
    name: "Etsy SEO Title Generator",
    kind: "ai",
    creditCost: 1,
    buildPrompt: titlePrompt,
  },
  "etsy-tag-generator": {
    id: "etsy-tag-generator",
    marketplace: "etsy",
    name: "Etsy Tag Generator",
    kind: "ai",
    creditCost: 1,
    buildPrompt: tagPrompt,
  },
  "etsy-description-generator": {
    id: "etsy-description-generator",
    marketplace: "etsy",
    name: "Etsy Description Generator",
    kind: "ai",
    creditCost: 1,
    buildPrompt: descriptionPrompt,
  },
  "etsy-keyword-generator": {
    id: "etsy-keyword-generator",
    marketplace: "etsy",
    name: "Etsy Keyword Generator",
    kind: "ai",
    creditCost: 1,
    buildPrompt: keywordPrompt,
  },
  "etsy-listing-analyzer": {
    id: "etsy-listing-analyzer",
    marketplace: "etsy",
    name: "Etsy Listing Analyzer",
    kind: "ai",
    creditCost: 2,
    buildPrompt: listingAnalyzerPrompt,
  },
  "etsy-pricing-calculator": {
    id: "etsy-pricing-calculator",
    marketplace: "etsy",
    name: "Etsy Pricing Calculator",
    kind: "logic",
    creditCost: 0,
  },
  "etsy-fee-calculator": {
    id: "etsy-fee-calculator",
    marketplace: "etsy",
    name: "Etsy Fee Calculator",
    kind: "logic",
    creditCost: 0,
  },
  "etsy-shop-name-generator": {
    id: "etsy-shop-name-generator",
    marketplace: "etsy",
    name: "Etsy Shop Name Generator",
    kind: "ai",
    creditCost: 1,
    buildPrompt: shopNamePrompt,
  },
  "etsy-product-idea-generator": {
    id: "etsy-product-idea-generator",
    marketplace: "etsy",
    name: "Etsy Product Idea Generator",
    kind: "ai",
    creditCost: 2,
    buildPrompt: productIdeaPrompt,
  },
  "holiday-keyword-finder": {
    id: "holiday-keyword-finder",
    marketplace: "etsy",
    name: "Holiday Keyword Finder",
    kind: "ai",
    creditCost: 1,
    buildPrompt: holidayKeywordPrompt,
  },
  "etsy-trend-explorer": {
    id: "etsy-trend-explorer",
    marketplace: "etsy",
    name: "Etsy Trend Explorer",
    kind: "ai",
    creditCost: 2,
    buildPrompt: trendExplorerPrompt,
  },
};

export function listToolsMetadata() {
  return Object.values(toolRegistry).map(({ id, marketplace, name, kind, creditCost }) => ({
    id,
    marketplace,
    name,
    kind,
    creditCost,
  }));
}
