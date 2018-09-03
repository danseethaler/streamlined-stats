import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

export const addNewUserData = functions.auth.user().onCreate(user => {
  const {uid, email, displayName = ''} = user;
  console.log('{uid, email, displayName = }', {uid, email, displayName});

  return admin
    .database()
    .ref(`/users/${uid}`)
    .update({
      uid,
      email,
      displayName,
    });
});

export const removeDeletedUserData = functions.auth.user().onDelete(({uid}) =>
  admin
    .database()
    .ref(`/users/${uid}`)
    .remove()
);

export const addGroupOwner = functions.database
  .ref(`/groups/{groupId}`)
  .onCreate(
    (
      change: functions.database.DataSnapshot,
      context: functions.EventContext
    ) => {
      const {groupId} = context.params;
      const {uid} = context.auth;
      console.log('uid', uid);

      const userGroupData = {
        status: 'active',
        role: 'owner',
      };

      return change
        .child(`users/${uid}`)
        .ref.set(userGroupData)
        .then(() =>
          admin
            .database()
            .ref(`/users/${uid}/groups/${groupId}`)
            .update(userGroupData)
        )
        .catch(err => {
          console.log('err', err);
        });
    }
  );
