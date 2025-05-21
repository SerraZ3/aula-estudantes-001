/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { currentUser?: any } | undefined) {
  const { currentUser } = initialState ?? {};
  console.log( {
    canAdmin: currentUser && currentUser.role && currentUser.role === 'admin',
    canUser: currentUser && currentUser.role && currentUser.role ==='user',
  })
  return {
    canAdmin: currentUser && currentUser.role && currentUser.role === 'admin',
    canUser: currentUser && currentUser.role && currentUser.role ==='user',
  };
}
