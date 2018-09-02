import * as functions from 'firebase-functions';

export const manageUserGroup = functions.firestore
  .document('/groups/{groupId}/users/{userId}')
  .onWrite((change, context) => {
    const {groupId, userId} = context.params;

    if (!change.after.exists) {
      return change.before.ref.parent.parent.parent.parent
        .collection('users')
        .doc(userId)
        .collection('groups')
        .doc(groupId)
        .delete()
        .catch(err => {
          console.log('err', err);
        });
    }

    return change.after.ref.parent.parent.parent.parent
      .collection('users')
      .doc(userId)
      .collection('groups')
      .doc(groupId)
      .set(change.after.data())
      .catch(err => {
        console.log('err', err);
      });
  });
