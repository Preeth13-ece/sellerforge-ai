import { useState } from "react";
import { toolsApi } from "../services/api/toolsApi.js";
import { getErrorMessage } from "../services/api/axiosClient.js";

export function useToolRunner(endpoint) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runTool = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await toolsApi.run(endpoint, payload);
      setResult(data.data.output);
      return data.data.output;
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { result, setResult, loading, error, runTool };
}
