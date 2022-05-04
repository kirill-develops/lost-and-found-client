// check to see if the user has previously logged in by confirming they have
// the mandatory form fields filled out
const isProfileComplete = (user) => (
  !(
    (!user.city || !user.phone || !user.province || user.volunteer === undefined)
  )
);

export default isProfileComplete;
