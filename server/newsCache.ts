// Coalesce concurrent refreshes and limit upstream RSS requests, including failures.
export function createNewsCache<T>(load: () => Promise<T>, ttl = 15 * 60_000, cooldown = 60_000) {
  let value: T | undefined;
  let fetchedAt = 0;
  let attemptedAt = -Infinity;
  let failure: unknown;
  let pending: Promise<T> | undefined;
  return async (refresh = false): Promise<T> => {
    if (pending) return pending;
    const now = Date.now();
    if (now - attemptedAt < cooldown) {
      if (failure) throw failure;
      if (value !== undefined) return value;
    }
    if (!refresh && value !== undefined && now - fetchedAt < ttl) return value;
    attemptedAt = now;
    pending = load().then(result => {
      value = result;
      fetchedAt = Date.now();
      failure = undefined;
      return result;
    }).catch(error => {
      failure = error;
      throw error;
    }).finally(() => { pending = undefined; });
    return pending;
  };
}
