import { useState, useEffect, useRef } from 'react';

const useChromeStorage = (key, defaultValue) => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(defaultValue);
  const isInitialized = useRef(false);
  useEffect(() => {
    try {
      chrome.storage.local.get([key], (res) => {
        console.log(`res`, res);
        if (key in res) {
          console.log(`1`);
          setState(res[key]);
        } else {
          console.log(`2`);
          setState(defaultValue);
        }
        setLoading(false);
      });
    } catch (error) {
      console.warn(`useChromeStorage get error: ${key}`, error);
      setState(defaultValue);
    } finally {
      isInitialized.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isInitialized.current) return;
    try {
      chrome?.storage?.local?.set({ [key]: state }, () => {
        if (chrome.runtime.lastError) {
          console.warn(
            `useChromeStorage set error: ${key}`,
            chrome.runtime.lastError
          );
        }
      });
    } catch (error) {
      console.warn(`useChromeStorage set error: ${key}`, error);
    }
  }, [key, state]);

  return [state, setState, { loading }];
};

export default useChromeStorage;
