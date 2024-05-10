import { useState, useEffect } from 'react';
import { Alert } from 'react-native'; // Assuming you are using React Native

/**
 * Custom hook to handle fetching data from Appwrite
 * @template T The type of the data being fetched
 * @param {() => Promise<T>} fn The function to fetch data from Appwrite
 * @param {new() => T} type The constructor of the data type
 * @returns {{ refetch: () => Promise<void>, data: T | [], isLoading?: boolean }} The data, a function to refetch data, and a loading state
 */
function useAppwrite<T>(fn: () => Promise<T>, type: { new(): T }): { refetch: () => Promise<void>, data: T | [], isLoading?: boolean } {
    const [data, setData] = useState<T | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * Fetch data from Appwrite
     */
    const fetchData = async () => {
        setIsLoading(true);

        try {
          const response = await fn();
          setData(response);
        } catch (error: any) {
          Alert.alert("Error", error.message || 'An error occurred');
        } finally {
          setIsLoading(false);
        }
      };

    /**
     * Call the function to fetch data from Appwrite when the component mounts
     */
    useEffect(() => {
        fetchData();
      }, []); // Only run this useEffect on mount

      /**
       * Refetch data from Appwrite
       */
      const refetch = async () => {
        await fetchData();
      }
    
      return { data, isLoading, refetch };
}


export default useAppwrite;
