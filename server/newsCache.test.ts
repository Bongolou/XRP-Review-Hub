import { afterEach, expect, it, vi } from "vitest";
import { createNewsCache } from "./newsCache";

afterEach(() => vi.useRealTimers());

it("uses the normal cache but allows manual refresh after the cooldown", async () => {
  vi.useFakeTimers();
  const load = vi.fn().mockResolvedValueOnce(["old"]).mockResolvedValue(["new"]);
  const get = createNewsCache(load);
  expect(await get()).toEqual(["old"]);
  expect(await get(true)).toEqual(["old"]);
  vi.advanceTimersByTime(60_001);
  expect(await get()).toEqual(["old"]);
  expect(await get(true)).toEqual(["new"]);
  expect(load).toHaveBeenCalledTimes(2);
});

it("coalesces simultaneous requests", async () => {
  let finish!: (items: string[]) => void;
  const load = vi.fn(() => new Promise<string[]>(resolve => { finish = resolve; }));
  const get = createNewsCache(load);
  const first = get();
  const second = get(true);
  finish(["news"]);
  expect(await Promise.all([first, second])).toEqual([["news"], ["news"]]);
  expect(load).toHaveBeenCalledTimes(1);
});

it("reports refresh failures and throttles repeated failures without losing cached data", async () => {
  vi.useFakeTimers();
  const load = vi.fn().mockResolvedValueOnce(["old"]).mockRejectedValueOnce(new Error("offline")).mockResolvedValue(["recovered"]);
  const get = createNewsCache(load);
  await get();
  vi.advanceTimersByTime(60_001);
  await expect(get(true)).rejects.toThrow("offline");
  await expect(get(true)).rejects.toThrow("offline");
  expect(load).toHaveBeenCalledTimes(2);
  vi.advanceTimersByTime(60_001);
  expect(await get()).toEqual(["old"]);
  expect(await get(true)).toEqual(["recovered"]);
});
