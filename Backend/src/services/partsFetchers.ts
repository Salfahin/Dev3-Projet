// Here are the functions used by the pages to buy parts.
// They use the fetchParts.ts query by injecting parameters into it.

import { FetchParts } from "../queries/fetchParts";
import { Part } from "../types/part";

// The function used to fetch the processors.
export async function FetchProcessors(): Promise<Part[]> {
  return FetchParts(0, ['Core Count', 'Thread Count', 'Series', 'Socket']);
}

// The function used to fetch the CPU coolers.
export async function FetchCPUCoolers(): Promise<Part[]> {
  return FetchParts(1, ['CPU Socket']);
}

// The function used to fetch the motherboards.
export async function FetchMotherboards(): Promise<Part[]> {
  return FetchParts(4, ['Form Factor', 'Socket / CPU']);
}

// The function used to fetch the memory.
export async function FetchMemory(): Promise<Part[]> {
  return FetchParts(5, ['Form Factor', 'Socket / CPU']);
}

// The function used to fetch the disks.
export async function FetchDisks(): Promise<Part[]> {
  return FetchParts(6, ['Form Factor', 'Socket / CPU']);
}

// The function used to fetch the video cards.
export async function FetchVideoCards(): Promise<Part[]> {
  return FetchParts(2, ['Form Factor', 'Socket / CPU']);
}

// The function used to fetch the cases.
export async function FetchCases(): Promise<Part[]> {
  return FetchParts(7, ['Form Factor', 'Socket / CPU']);
}

// The function used to fetch the case fans.
export async function FetchCaseFans(): Promise<Part[]> {
  return FetchParts(8, ['Form Factor', 'Socket / CPU']);
}

// The function used to fetch the power supplies.
export async function FetchPowerSupplies(): Promise<Part[]> {
  return FetchParts(3, ['Form Factor', 'Socket / CPU']);
}

// The function used to fetch the others.
export async function FetchOthers(): Promise<Part[]> {
  return FetchParts(9, ['Form Factor', 'Socket / CPU']);
}
