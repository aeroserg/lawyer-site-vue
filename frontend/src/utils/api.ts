import axios from 'axios';
import { environment } from '../environment/environment';

const apiClient = axios.create({
  baseURL: environment.strapiUrl || 'http://localhost:1337',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * A universal fetch function that retrieves data from the Strapi API.
 * @param endpoint The API endpoint (e.g., "price-list", "cases", "services")
 * @param params   An object containing query parameters like populate, filters, pagination, etc.
 * 
 * Example usage:
 * 
 * // Simple fetch with full population
 * const data = await fetchData('price-list', { populate: '*' });
 * 
 * // Nested population
 * const data = await fetchData('price-list', {
 *   populate: {
 *     price_list_card: {
 *       populate: {
 *         service_price_card: '*'
 *       }
 *     }
 *   }
 * });
 * 
 * // With pagination and filters
 * const data = await fetchData('cases', {
 *   filters: { category: 'legal' },
 *   pagination: { page: 1, pageSize: 10 },
 *   sort: 'createdAt:desc'
 * });
 */
export async function fetchData(
  endpoint: string,
  params: Record<string, any> = {}
) {
  // Convert nested objects in `params` into Strapi query parameters.
  // For example:
  // params = {
  //   populate: {
  //     price_list_card: {
  //       populate: {
  //         service_price_card: '*'
  //       }
  //     }
  //   }
  // }
  // should become:
  // populate[price_list_card][populate][service_price_card]=*

  const convertedParams = flattenParams(params);
  try {
    console.log(`convertedParams ${JSON.stringify(convertedParams)}`);
    const response = await apiClient.get(`/api/${endpoint}`, { params: convertedParams });
    console.log('Fetched response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // rethrow if you need to handle it upstream
  }
}  

/**
 * Convert a nested object of parameters into a flat object suitable for Strapi queries.
 * For example, this function turns:
 * { populate: { price_list_card: { populate: { service_price_card: '*' } } } }
 * into:
 * { 'populate[price_list_card][populate][service_price_card]': '*' }
 */
function flattenParams(obj: Record<string, any>, prefix = ''): Record<string, any> {
  let result: Record<string, any> = {};

  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}[${key}]` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Recursively flatten the nested object
      const nested = flattenParams(value, newKey);
      result = { ...result, ...nested };
    } else {
      // Assign primitive or array value directly
      result[newKey] = value;
    }
  }

  return result;
}
