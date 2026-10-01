import axios from "axios";

export const REQUEST_TIMEOUT_MS = 10_000;
export const MAX_RETRY_COUNT = 3;

export const requestWithRetry = async (url, payload) => {
  let lastError;

  for (let attempt = 0; attempt <= MAX_RETRY_COUNT; attempt += 1) {
    try {
      return await axios.post(url, payload, {
        timeout: REQUEST_TIMEOUT_MS,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      lastError = error;

      const isRetryable =
        error?.code === "ECONNABORTED" ||
        error?.message?.toLowerCase().includes("timeout") ||
        (!error?.response && !error?.status);

      if (!isRetryable || attempt >= MAX_RETRY_COUNT) {
        throw error;
      }
    }
  }

  throw lastError;
};
