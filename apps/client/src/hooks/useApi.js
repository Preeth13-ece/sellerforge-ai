import { useCallback, useState } from "react";
import { getErrorMessage } from "../services/api/axiosClient.js";

/**
 * Small helper for imperative API calls with loading/error state.
 * Usage: const { run, loading, error } = useApi(); await run(() => toolsApi.run(...))
 */
export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = useCallback(async (fn) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fn();
      return result;
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { run, loading, error, setError };
}
