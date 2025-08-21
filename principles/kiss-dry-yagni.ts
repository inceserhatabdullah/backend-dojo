/**
 * * kiss: keep it simple, stupid!
 * * dry: do not repeat your self
 * * yagni: you are not gonna need it
 */

/* bad */
// problem is overcomplicated api error handling

function handleApiError(error: any) {
  if (error && error.response && error.response.status === 404) {
    throw new Error('Not found.');
  }

  if (error && error.response && error.response.status === 500) {
    throw new Error('Internal Server Error.');
  }

  throw new Error('Unknown Error.');
}

/* good */

function _handleApiError(error: any) {
  const status = error?.response?.status;

  switch (status) {
    case 400:
      throw new Error('Not found.');
    case 500:
      throw new Error('Internal Server Error.');
    default:
      throw new Error('Unknown Error.');
  }
}

/* problem duplicate logging behaviour */
function logLogin(userId: string) {
  console.log(`User ${userId} logged in.`)
}

function logLogout(userId: string) {
  console.log(`User ${userId} logged out.`);
}

/* solution */
function logAction(userId: string, action: 'logged in' | 'logged out') {
  console.log(`User ${userId} ${action}`);
}

/* Always implement things when you actually need them, never when you just foresee that you need them.
problem over engineered http client 
*/

// class HttpClient {
//   get<T>(url: string): Promise<T> { /* ... */ }
//   post<T>(url: string, body: any): Promise<T> { /* ... */ }
//   put<T>(url: string, body: any): Promise<T> { /* ... */ }
//   patch<T>(url: string, body: any): Promise<T> { /* ... */ }
//   delete<T>(url: string): Promise<T> { /* ... */ }
// }

/* solution is start lean with what's needed 
Add put, patch, and delete when your application actually needs them.
*/

//   get<T>(url: string): Promise<T> { /* ... */ }
//   post<T>(url: string, body: any): Promise<T> { /* ... */ }
// }