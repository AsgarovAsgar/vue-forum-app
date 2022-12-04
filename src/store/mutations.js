import { docToResource, findById, upsert } from "@/helpers";

export default {
  setItem(state, { resource, item }) {
    upsert(state[resource], docToResource(item));
    // const userIndex = state.users.findIndex(user => user.id === userId)
    // state.users[userIndex] = user
  },
  appendUnsubscribe(state, { unsubscribe }) {
    state.unsubscribes.push(unsubscribe);
  },
  clearAllUnsubscribes(state) {
    state.unsubscribes = []
  },
  appendPostToThread: makeAppendChildToParentMutation({ parent: "threads", child: "posts" }),
  appendThreadToForum: makeAppendChildToParentMutation({ parent: "forums", child: "threads" }),
  appendThreadToUser: makeAppendChildToParentMutation({ parent: "users", child: "threads" }),
  appendContributorsToThread: makeAppendChildToParentMutation({ parent: "threads", child: "contributors" })
};

function makeAppendChildToParentMutation({ parent, child }) {
  return (state, { childId, parentId }) => {
    const resource = findById(state[parent], parentId);
    if (!resource) {
      console.warn(`Appending ${child} ${childId} to ${parent} ${parentId} failed because the parent did not exist`);
      return;
    }
    resource[child] = resource[child] || [];
    if (!resource[child].includes(childId)) {
      resource[child].push(childId);
    }
  };
}
