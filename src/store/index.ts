//---amplify setup
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";

// --- Amplify ---
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/data-schema";

// Configure Amplify client
Amplify.configure(outputs);
export const client = generateClient<Schema>();

